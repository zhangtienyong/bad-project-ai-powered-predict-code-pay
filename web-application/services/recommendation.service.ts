import { Knex } from "knex";

export default class RecommendationService {
    constructor(private knex: Knex) { }

    async getSalary(userId: number) {
        try {
            // const user=await this.knex
            // .select("id")
            // .from("users")
            // .where("user_id", userId)
            console.log(userId)

            const developerId = await this.knex
            .select("id")
            .from("developer_data")
            .where("user_id", userId)

            const salary = await this.knex
                .select("*")
                .from("salary_predictions")
                .where("data_id", developerId[0].id)

            return salary
        } catch (error) {
            throw error;
        }


    }
}