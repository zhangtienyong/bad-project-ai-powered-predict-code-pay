import { Knex } from "knex";
// import fetch from 'node-fetch';

export default class PredictionService {
    constructor(private knex: Knex) { }

    async devDataPosting(
        loginUserId: number,
        education_level: string,
        country: string,
        years_of_coding: number,
        years_of_employment: number,
        learning_source: string,
        developer_type: string,
        age: number,
        language: string,
        database: string,
        webframework: string,
        platform: string
    ) {
        try {
            // Insert Developer Data 
            const insert_developer_data = await this.knex
                .insert({
                    user_id: loginUserId,
                    education_level: education_level,
                    country: country,
                    years_of_coding: years_of_coding,
                    years_of_employment: years_of_employment,
                    learning_source: learning_source,
                    developer_type: developer_type,
                    age: age
                })
                .into("developer_data")
                .returning("id")
            
            const developer_data_id = insert_developer_data[0].id;
            console.log(developer_data_id);
            
            // Insert Developer Skill Language
            const developer_skill_language = await this.knex
                .select("id")
                .from("skills")
                .where("name", "=", language)

            const skill_language = developer_skill_language[0].id;
            await this.knex.insert({
                data_id: developer_data_id,
                skills_id: skill_language
            })
            .into("developer_skills")
            .returning("id");

            // Insert Developer Skill Database
            const developer_skill_database = await this.knex
                .select("id")
                .from("skills")
                .where("name", "=", database)
            
            const skill_database = developer_skill_database[0].id;
            await this.knex.insert({
                data_id: developer_data_id,
                skills_id: skill_database
            })
            .into("developer_skills")
            .returning("id");

            // Insert Developer Skill Web Framework
            const developer_skill_webframework = await this.knex
            .select("id")
            .from("skills")
            .where("name", "=", webframework)
        
            const skill_webframework = developer_skill_webframework[0].id;
            await this.knex.insert({
                data_id: developer_data_id,
                skills_id: skill_webframework
            })
            .into("developer_skills")
            .returning("id");

            // Insert Developer Skill Cloud Platform
            const developer_skill_platform = await this.knex
            .select("id")
            .from("skills")
            .where("name", "=", platform)

            const skill_platform = developer_skill_platform[0].id;
            await this.knex.insert({
                data_id: developer_data_id,
                skills_id: skill_platform
            })
            .into("developer_skills")
            .returning("id")

             const apiParams = {
                Country: country,
                EdLevel: education_level,
                YearsCodePro: years_of_employment
            }

            const apiResponse = await fetch("http://127.0.0.1:8000/api/salary", {
                method: 'POST',
                body: JSON.stringify(apiParams),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            interface ApiResponse {
                PredictedSalary: number;
            }

            const apiData = await apiResponse.json() as ApiResponse;
            console.log('API Response:', apiData);

            const insertSalaryPrediction = await this.knex
                .insert({
                    data_id: developer_data_id,
                    predicted_salary: apiData.PredictedSalary.toFixed(2)
                })
                .into("salary_predictions")
                .returning("id");

            const salary_prediction_id = insertSalaryPrediction[0].id;
            console.log('Salary Prediction ID:', salary_prediction_id);


        } catch (error) {
            throw error;
        }
    }


    async getSalary(userId: number) {
        try {


            const developerId = await this.knex
            .select("id")
            .from("developer_data")
            .where("user_id", userId)

            const salary = await this.knex
                .select("*")
                .from("salary_predictions")
                .where("data_id", developerId[0].id)

            return salary
        } catch (error) {
            throw error;
        }


    }
}

