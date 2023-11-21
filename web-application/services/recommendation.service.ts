import { Knex } from "knex";

export default class RecommendationService {
  constructor(private knex: Knex) {}

  async getSalary(userId: number) {
    try {
      const developerId = await this.knex
        .select("id")
        .from("developer_data")
        .where("user_id", userId);

      const salary = await this.knex
        .select("*")
        .from("salary_predictions")
        .where("data_id", developerId[0].id);

      return salary;
    } catch (error) {
      throw error;
    }
  }

  async recommendation(userId: number) {
    const developer = await this.knex
      .select("*")
      .from("developer_data")
      .where("user_id", userId);

    const developer_type = developer[0].developer_type;
    const developer_id = developer[0].id;

    type Skill = { id: number; name: string; types: string };
    const skillMapping = (await this.knex<Skill>("skills")).reduce(
      (mapping, row) =>
        mapping.set(row.id, { name: row.name, types: row.types }),
      new Map<number, Omit<Skill, "id">>(),
    );

    console.log("test", skillMapping);

    const developer_skills = (
      await this.knex
        .select("*")
        .from("developer_skills")
        .where("data_id", developer[0].id)
        .returning("skills_id")
    ).map((row) => ({
      ...row,
      skill_name: skillMapping.get(row.skills_id)?.name,
      skill_type: skillMapping.get(row.skills_id)?.types,
    }));

    const language = developer_skills[0].skill_name;
    const database = developer_skills[1].skill_name;
    const platform = developer_skills[2].skill_name;
    const webframe = developer_skills[3].skill_name;

    const apiParams = {
      UserSkills: {
        LanguageHaveWorkedWith: language,
        DatabaseHaveWorkedWith: database,
        PlatformHaveWorkedWith: platform,
        WebframeHaveWorkedWith: webframe,
        DevType: developer_type,
      },
    };

    const apiResponse = await fetch("http://127.0.0.1:8000/api/skills", {
      method: "POST",
      body: JSON.stringify(apiParams),
      headers: {
        "Content-Type": "application/json",
      },
    });

    interface ApiResponse {
      RecommendedSkills: RecommendedSkills;
    }

    interface RecommendedSkills {
      LanguageWantToWorkWith: string[];
      DatabaseWantToWorkWith: string[];
      PlatformWantToWorkWith: string[];
      WebframeWantToWorkWith: string[];
    }
    const apiData: { RecommendedSkills: RecommendedSkills } =
      (await apiResponse.json()) as ApiResponse;
    console.log(apiData);

    // Extracted recommendation data
    const recommendationData = {
      data_id: developer_id,
      programming_language_recommendation:
        apiData.RecommendedSkills.LanguageWantToWorkWith[0]?.split(";")[0] ||
        "",
      web_framework_recommendation:
        apiData.RecommendedSkills.DatabaseWantToWorkWith[0]?.split(";")[0] ||
        "",
      cloud_platform_recommendation:
        apiData.RecommendedSkills.PlatformWantToWorkWith[0] || "",
      database_recommendation:
        apiData.RecommendedSkills.WebframeWantToWorkWith[0]?.split(";")[0] ||
        "",
    };

    console.log(recommendationData);

    const insert_recommendation_skill = await this.knex
      .insert({
        data_id: recommendationData.data_id,
        programming_language_recommendation:
          recommendationData.programming_language_recommendation,
        web_framework_recommendation:
          recommendationData.web_framework_recommendation,
        cloud_platform_recommendation:
          recommendationData.cloud_platform_recommendation,
        database_recommendation: recommendationData.database_recommendation,
      })
      .into("skill_recommendations")
      .returning("id");

    console.log("Recommendation Skill ID:", insert_recommendation_skill[0]);
  }
}
