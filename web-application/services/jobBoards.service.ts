import { Knex } from "knex";

export default class JobBoardsService {
  constructor(private knex: Knex) { }

async initJobBoard(ID: number, page: number, pageSize: number = 8) {
  try {
    const offset = (page - 1) * pageSize;
    const jobs = await this.knex("jobs")
      .select("*")
      .limit(pageSize)
      .offset(offset);

    if (jobs.length > 0) {
      for (const job of jobs) {
        const company = await this.knex("company")
          .select("company_name","logo")
          .where("id", job.company_id)
          .first()

        job.company_name = company ? company.company_name : null
        job.logo = company ? company.logo : null
      }
    }
    return jobs;
  } catch (error) {
    throw error;
  }
}

}
