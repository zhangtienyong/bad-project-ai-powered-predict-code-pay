from sanic import Sanic
from sanic.response import json
import numpy as np
import pandas as pd
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
