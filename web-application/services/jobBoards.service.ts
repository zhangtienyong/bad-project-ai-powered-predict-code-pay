import { Knex } from "knex";

export default class JobBoardsService {
  constructor(private knex: Knex) { }

  async initJobBoard(ID: number, page: number, pageSize: number = 8) {
    try {
      const offset = (page - 1) * pageSize;

      // Fetch jobs with pagination
      const jobs = await this.knex("jobs")
        .select("*")
        .limit(pageSize)
        .offset(offset);

      if (jobs.length > 0) {
        return jobs; 
      } else {
        throw new Error("No jobs found for the given page");
      }
    } catch (error) {
      throw error;
    }
  }
}
