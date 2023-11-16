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

  async getDeveloperInfo(userId: number) {
    try {
      const user_id = userId;
      const developer = await this.knex
        .select("*")
        .from("developer_data")
        .where("user_id", user_id)

      const recommendations = await this.knex
        .select("*")
        .from("skill_recommendations")
        .where("data_id", developer[0].id)

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

      return { developer, recommendations, developer_skills }
    } catch (error) {
      throw error;
    }

  }





}
