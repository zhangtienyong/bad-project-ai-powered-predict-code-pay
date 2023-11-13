import { Knex } from "knex";


export default class JobPostingService {
    constructor(private knex: Knex) { }

    async getSkills() {
        try {
            const programming_language_skills = await this.knex
            .select("name")
            .from("skills")
            .where("types", "programming_language")

            const database_skills = await this.knex
            .select("name")
            .from("skills")
            .where("types", "database")

            const web_framework_skills = await this.knex
            .select("name")
            .from("skills")
            .where("types", "web_framework")

            const cloud_platform_skills = await this.knex
            .select("name")
            .from("skills")
            .where("types", "cloud_platform")

            return {programming_language_skills, database_skills, web_framework_skills, cloud_platform_skills};

        } catch (err) {
            throw err;
        }
    }

    async jobPosting(loginUserId: number, job_title: string, work_place: string, employment_type: string, job_description: string, experience_level: string, responsibilities: string, qualifications: string, programming_language_skills: string, database_skills: string, cloud_platform_skills: string, web_framework_skills: string) {
        try {

            const company_id = await this.knex
            .select("id")
            .from("company")
            .where("user_id", "=", loginUserId)   
            
        await this.knex
            .insert({
                company_id: company_id,
                job_title: job_title,
                work_place: work_place,
                employment_type: employment_type,
                job_description: job_description,
                experience_level: experience_level,
                responsibilities: responsibilities,
                qualifications: qualifications,               
            })
            .into("jobs")
            .returning("id");

        await this.knex
           .insert({
                job_id: this.knex.raw("last_insert_id()"),
                programming_language_skills: programming_language_skills,
                database_skills: database_skills,
                web_framework_skills: web_framework_skills,
                cloud_platform_skills: cloud_platform_skills,
            })
           .into("job_skills")
           .returning("id");

        } catch (error) {
            throw error;
        }
    }








}