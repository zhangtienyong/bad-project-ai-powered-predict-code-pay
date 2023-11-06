import { Knex } from "knex";
import { github_Users } from "../models";

export default class GithubService {
    constructor(private knex: Knex) { }

    async user_data(github_name: string, github_id: string, token: string): Promise<void> {
        const user = {
            github_name: github_name,
            github_id: github_id,
            token: token
        };

        try {
            await this.knex.transaction(async (trx) => {
                const insertedIds = await trx("users")
                    .insert(user)
                    .returning("id");

                
                await trx.commit();

                if (insertedIds.length > 0) {
                    const userData: github_Users = {
                        github_name: github_name,
                        github_id: github_id,
                        token: token
                    };

                    return userData;
                } else {
                    throw new Error("Failed to insert data into the database.");
                }
            });
        } catch (error) {
            throw error;
        }
    }
}