import { Knex } from "knex";

export default class DeveloperDbService {
  constructor(private knex: Knex) { }




  async application(id: number, app: number, pageSize: number = 5) {
    try {
      const company = await this.knex("company")
        .select("id", "user_id")
        .where("user_id", id)
        .first();

      if (company) {
        const offset = (app - 1) * pageSize;

        const jobs = await this.knex("jobs")
          .select("*")
          .where("company_id", company.id)

        if (jobs && jobs.length > 0) {
          const jobIds = jobs.map((job) => job.id);
          const applications = await this.knex("job_applications")
            .select("*")
            .whereIn("job_id", jobIds)
            .where("status", "Pending")
            .limit(pageSize)
            .offset(offset);

          return applications;
        }

        return

      } else {
        throw new Error("Company not found for the given user");
      }
    } catch (error) {
      throw error;
    }
  }






}
