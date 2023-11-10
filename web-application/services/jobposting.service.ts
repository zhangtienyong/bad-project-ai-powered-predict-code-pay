import { Knex } from "knex";


export default class JobPostingService {
    constructor(private knex: Knex) { }

    async jobPosting(loginUserId: number, job_title: string, work_place: string, employment_type: string, job_description: string, experience_level: string, responsibilities: string, qualifications: string, skills: string) {
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
                skills: skills
            })
            .into("jobs")
            .returning("id");
        } catch (error) {
            throw error;
        }
    }








}