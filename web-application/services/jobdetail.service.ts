import { Knex } from "knex";
export default class JobDetailService {
    constructor(private knex: Knex) { }

    async getJobDetail(jobId: number) {
        try {
            const job_id = jobId



            const jobs = await this.knex
                .select("*")
                .from("jobs")
                .where("id", job_id)
            console.log(jobs[0].company_id)

            const company = await this.knex
                .select("*")
                .from("company")
                .where("id", jobs[0].company_id)

            const job_skills = await this.knex
                .select("skills_id")
                .from("job_skills")
                .where("job_id", job_id)

            let skills: any[] = [];
            for (const job_skill of job_skills) {
                const skill = await this.knex
                    .select("name", "types")
                    .from("skills")
                    .where("id", job_skill.skills_id)
                skills.push(skill)

            }

            return { company, jobs, skills }

        } catch (error) {
            throw error;
        }
    }

    async applyJob(filename: string, jobId: number, userId: number) {
        try {
            await this.knex("job_applications")
                .insert({
                    job_id: jobId,
                    user_id: userId,
                    cv_pdf: filename,
                    status: "Pending"
                })
            return { result: true };
        } catch (error) {
            throw error;
        }
    }
}