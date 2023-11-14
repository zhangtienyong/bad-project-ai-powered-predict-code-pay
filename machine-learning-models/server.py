from sanic import Sanic
from sanic.response import json
from pydantic import BaseModel

app = Sanic(__name__)

# Define salary prediction input schema using Pydantic Base Model
class SalaryPredictionInput(BaseModel):
    YearsCode: int
    YearsCodePro: int
    EdLevel: str
    LearnCode: str
    Country: str
    DevType: str
    Age: float
    LanguageHaveWorkedWith: str
    DatabaseHaveWorkedWith: str
    WebframeHaveWorkedWith: str
    PlatformHaveWorkedWith: str

# Define skill recommendation input schema using Pydantic Base Model
class SkillRecommendationInput(BaseModel):
    LanguageHaveWorkedWith: str
    DatabaseHaveWorkedWith: str
    WebframeHaveWorkedWith: str
    PlatformHaveWorkedWith: str

# API endpoint for testing purposes json response
@app.route('/api/endpoint', methods=['GET'])
async def api_endpoint(request):
    return json({'message': 'Hi, Predict Code Pay!'})

# API endpoint for salary prediction
@app.route('/api/salary', methods=['POST'])
async def api_salary(request):
    data = SalaryPredictionInput(**request.json)
    prediction = 50000
    
    # Convert SalaryPredictionInput object to dictionary
    data_dict = data.dict()
    return json({'predicted_salary': prediction, 'input_data': data_dict})

# API endpoint for skill recommendation
@app.route('/api/skill', methods=['POST'])
async def api_skill(request):
    data = SkillRecommendationInput(**request.json)

    skill_1 = ['Elixir', 'PostgreSQL', 'Phoenix', 'Heroku']
    skill_2 = ['Python', 'Django', 'AWS', 'RESTful APIs']
    skill_3 = ['JavaScript', 'React', 'Node.js', 'MongoDB']

    # Convert SkillRecommendationInput object to dictionary
    data_dict = data.dict()

    return json({'recommended_skills_1': skill_1, 'recommended_skills_2': skill_2, 'recommended_skills_3': skill_3, 'input_data': data_dict})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
