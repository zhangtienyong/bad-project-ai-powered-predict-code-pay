import { Knex } from "knex";

export default class DeveloperDbService {
  constructor(private knex: Knex) { }




  async application(id: number, app: number, pageSize: number = 5) {
    try {
      const offset = (app - 1) * pageSize;
        const applications = await this.knex("job_applications")
          .select("*")
          .where("user_id", id)
          .limit(pageSize)
          .offset(offset);
  
        return applications;
      }
     catch (error) {
      throw error;
    }
  }
  






}
