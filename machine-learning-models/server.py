from sanic import Sanic
from sanic.response import json
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pickle

app = Sanic(name="predict_code_pay")

# Load the model and encoders
with open('saved_steps.pkl', 'rb') as file:
    data = pickle.load(file)

regressor_loaded = data["model"]
label_country = data["label_country"]
label_education = data["label_education"]
country_map = data.get("country_map", {})

# Function to transform JSON input into the format expected by the model
def transform_json_input(json_input):
    country = json_input['Country']
    ed_level = json_input['EdLevel']
    years_code_pro = json_input['YearsCodePro']
    country = country_map.get(country, 'Other')
    country = label_country.transform([country])[0]
    ed_level = label_education.transform([ed_level])[0]

    # Return a dictionary with feature names and values
    return {
        'Country': country,
        'EdLevel': ed_level,
        'YearsCodePro': years_code_pro
    }
# Prediction Model
@app.route('/api/salary', methods=['POST'])
async def predict_salary(request):
    try:
        json_input_from_client = request.json
        input_data = transform_json_input(json_input_from_client)
        
        # Create a DataFrame with feature names and values
        input_df = pd.DataFrame([input_data])

        # Make predictions on the new data point
        y_pred_new = regressor_loaded.predict(input_df)
        predicted_salary = y_pred_new[0]
        return json({"PredictedSalary": predicted_salary})
    except Exception as e:
        return json({"error": str(e)})

# Load the recommendation model and related data
with open('tfidf_vectorizer.pkl', 'rb') as file:
    loaded_tfidf_vectorizer = pickle.load(file)

with open('cosine_sim.pkl', 'rb') as file:
    loaded_cosine_sim = pickle.load(file)

with open('user_combined_df.pkl', 'rb') as file:
    loaded_user_combined_df = pickle.load(file)

# Function to transform JSON input into the format expected by the recommendation model
def transform_recommendation_input(json_input):
    user_skills = json_input.get('UserSkills', {})
    
    # Create a DataFrame for the user
    user_df = pd.DataFrame(user_skills, index=[0])
    user_combined_df = pd.concat([loaded_user_combined_df, user_df]).reset_index(drop=True)
    user_combined_df['AggregatedSkills'] = user_combined_df['AggregatedSkills'].fillna('')

    # Fit and transform the skills column
    tfidf_matrix_user = loaded_tfidf_vectorizer.transform(user_combined_df['AggregatedSkills'])

    # Calculate the cosine similarity between skills
    cosine_sim_user = linear_kernel(tfidf_matrix_user, tfidf_matrix_user)

    # Get the index of the user in the DataFrame
    user_index = user_combined_df.shape[0] - 1

    # Get the similarity scores for the user
    user_similarity_scores = cosine_sim_user[user_index]

    # Get the indices of the top N similar users
    top_similar_users = user_similarity_scores.argsort()[:-6:-1]

    # Define categories
    categories = [
        'LanguageWantToWorkWith',
        'DatabaseWantToWorkWith',
        'PlatformWantToWorkWith',
        'WebframeWantToWorkWith',
    ]

    # Create a dictionary to store recommended skills for each category
    recommended_skills_dict = {category: set() for category in categories}

    # Loop through the top similar users and update the recommended skills dictionary
    for index in top_similar_users:
        for category in categories:
            skills = str(user_combined_df.loc[index, category]).lower()
            recommended_skills_dict[category].update(skills.split())

    # Remove the skills the user already has for each category
    user_skills_dict = {category: set(str(user_combined_df.loc[user_index, category]).lower().split()) for category in categories}
    for category in categories:
        recommended_skills_dict[category] -= user_skills_dict[category]

    # Return the top 3 recommended skills for each category
    top_recommended_skills = {category: list(recommended_skills_dict[category])[:3] for category in categories}
    return top_recommended_skills

# Recommendation Model
@app.route('/api/skills', methods=['POST'])
async def recommend_skills(request):
    try:
        json_input_from_client = request.json
        recommended_skills = transform_recommendation_input(json_input_from_client)
        return json({"RecommendedSkills": recommended_skills})
    except Exception as e:
        return json({"error": str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)