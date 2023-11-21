import { Knex } from "knex";

export default class JobPostingService {
  constructor(private knex: Knex) {}

  async getSkills() {
    try {
      const programming_language_skills = await this.knex
        .select("name")
        .from("skills")
        .where("types", "language");

      const database_skills = await this.knex
        .select("name")
        .from("skills")
        .where("types", "database");

      const web_framework_skills = await this.knex
        .select("name")
        .from("skills")
        .where("types", "webframework");

      const cloud_platform_skills = await this.knex
        .select("name")
        .from("skills")
        .where("types", "platform");

      return {
        programming_language_skills,
        database_skills,
        web_framework_skills,
        cloud_platform_skills,
      };
    } catch (err) {
      throw err;
    }
  }

  async jobPosting(
    loginUserId: number,
    job_title: string,
    work_place: string,
    employment_type: string,
    job_description: string,
    experience_level: string,
    responsibilities: string,
    qualifications: string,
    programming_language_skills: string,
    database_skills: string,
    cloud_platform_skills: string,
    web_framework_skills: string,
  ) {
    try {
      const company_id_Info = await this.knex
        .select("id")
        .from("company")
        .where("user_id", "=", loginUserId);
      const company_id = company_id_Info[0].id;
      console.log(company_id);
      console.log(programming_language_skills);

      const job = await this.knex
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

      const job_id = job[0].id;
      console.log(job_id);

      for (const programming_language_skill of programming_language_skills) {
        const skills_id_Info = await this.knex
          .select("id")
          .from("skills")
          .where("name", "=", programming_language_skill);
        const skills_id = skills_id_Info[0].id;

        await this.knex
          .insert({
            job_id: job_id,
            skills_id: skills_id,
          })
          .into("job_skills")
          .returning("id");
      }

      for (const database_skill of database_skills) {
        const skills_id_Info = await this.knex
          .select("id")
          .from("skills")
          .where("name", "=", database_skill);
        const skills_id = skills_id_Info[0].id;

        await this.knex
          .insert({
            job_id: job_id,
            skills_id: skills_id,
          })
          .into("job_skills")
          .returning("id");
      }

      for (const cloud_platform_skill of cloud_platform_skills) {
        const skills_id_Info = await this.knex
          .select("id")
          .from("skills")
          .where("name", "=", cloud_platform_skill);
        const skills_id = skills_id_Info[0].id;

        await this.knex
          .insert({
            job_id: job_id,
            skills_id: skills_id,
          })
          .into("job_skills")
          .returning("id");
      }

      for (const web_framework_skill of web_framework_skills) {
        const skills_id_Info = await this.knex
          .select("id")
          .from("skills")
          .where("name", "=", web_framework_skill);
        const skills_id = skills_id_Info[0].id;

        await this.knex
          .insert({
            job_id: job_id,
            skills_id: skills_id,
          })
          .into("job_skills")
          .returning("id");
      }
    } catch (error) {
      throw error;
    }
  }
}
