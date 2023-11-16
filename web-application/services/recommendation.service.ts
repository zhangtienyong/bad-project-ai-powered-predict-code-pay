import { Knex } from "knex";

export default class RecommendationService {
    constructor(private knex: Knex) { }

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


    async recommendation(userId: number) {
        const developer = await this.knex
            .select("*")
            .from("developer_data")
            .where("user_id", userId)

        const developer_type = developer[0].developer_type

        //   const recommendations = await this.knex
        //     .select("*")
        //     .from("skill_recommendations")
        //     .where("data_id", developer[0].id)

        type Skill = { id: number; name: string; types: string }
        const skillMapping = (await this.knex<Skill>("skills")).reduce((mapping, row) => mapping.set(row.id, { name: row.name, types: row.types }), new Map<number, Omit<Skill, "id">>);

        console.log("test", skillMapping)

        const developer_skills = (await this.knex
            .select("*")
            .from("developer_skills")
            .where("data_id", developer[0].id)
            .returning("skills_id")).map(row => ({
                ...row,
                skill_name: skillMapping.get(row.skills_id)?.name,
                skill_type: skillMapping.get(row.skills_id)?.types,
            }))

        const language = developer_skills[0].skill_name
        const database = developer_skills[1].skill_name
        const platform = developer_skills[2].skill_name
        const webframe = developer_skills[3].skill_name


        const apiParams = {
            "UserSkills": {
                "LanguageHaveWorkedWith": language,
                "DatabaseHaveWorkedWith": database,
                "PlatformHaveWorkedWith": platform,
                "WebframeHaveWorkedWith": webframe,
                "DevType": developer_type
            }
        }

        const apiResponse = await fetch("http://127.0.0.1:8000/api/skills", {
            method: 'POST',
            body: JSON.stringify(apiParams),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        interface ApiResponse {
            "Language": string;
            "Database": string;
            "Platform": string;
            "Webframe": string;
        }
        const apiData = await apiResponse.json() as ApiResponse;
        console.log('API Response:', apiData);
        
        return { language, database, platform, webframe }
    }
}