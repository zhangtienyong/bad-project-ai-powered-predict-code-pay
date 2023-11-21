import { Knex } from "knex";

export default class DeveloperDbService {
  constructor(private knex: Knex) {}

  async application(id: number, app: number, pageSize: number = 5) {
    const offset = (app - 1) * pageSize;
    const applications = await this.knex("job_applications")
      .select("*")
      .where("user_id", id)
      .limit(pageSize)
      .offset(offset);

    return applications;
  }

  async getDeveloperInfo(userId: number) {
    const user_id = userId;
    const developer = await this.knex
      .select("*")
      .from("developer_data")
      .where("user_id", user_id)
      .first();
    const recommendations = await this.knex
      .select("*")
      .from("skill_recommendations")
      .where("data_id", developer.id);

    // Model
    // type Skill = { id: number; name: string; types: string };
    // const skillMapping = (await this.knex<Skill>("skills")).reduce(
    //   (mapping, row) => mapping.set(row.id, { name: row.name, types: row.types }),
    //   new Map<number, Omit<Skill, "id">>()
    // );

    // const developer_skills = (
    //   await this.knex
    //     .select("*")
    //     .from("developer_skills")
    //     .where("data_id", developer.id)
    //     .returning("skills_id")
    // ).map((row) => ({
    //   ...row,
    //   skill_name: skillMapping.get(row.skills_id)?.name,
    //   skill_type: skillMapping.get(row.skills_id)?.types,
    // }));

    type Row = {
      id: number;
      data_id: number;
      skills_id: number;
      skill_name: string;
      skill_type: string;
    };
    const developer_skills = await this.knex("developer_skills")
      .innerJoin("skills", "developer_skills.skills_id", "skills.id")
      .select<Row[]>(
        "developer_skills.id",
        "data_id",
        "skills_id",
        "name AS skill_name",
        "types AS skill_type"
      );

    return { developer, recommendations, developer_skills };
  }
}
