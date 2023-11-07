import { Knex } from "knex";
import { github_Users } from "../models";

export default class GithubService {
    constructor(private knex: Knex) { }

    async employee_user_data(github_username: any, github_id: any, github_token: any): Promise<github_Users> {
        const user = {
            username: github_username,
            github_username: github_username,
            github_id: github_id,
            github_token: github_token,
            role: "employee"
        };

        try {
            return this.knex.transaction(async (trx) => {
                const insertedIds = await trx("users")
                    .insert(user)
                    .returning("id");

                await trx.commit();

                if (insertedIds.length > 0) {
                    const userData: github_Users = {
                        username: github_username,
                        github_username: github_username,
                        github_id: github_id,
                        github_token: github_token
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


    async employer_user_data(github_username: any, github_id: any, github_token: any): Promise<github_Users> {
        const user = {
            username: github_username,
            github_username: github_username,
            github_id: github_id,
            github_token: github_token,
            role: "employer"
        };

        try {
            return this.knex.transaction(async (trx) => {
                const insertedIds = await trx("users")
                    .insert(user)
                    .returning("id");

                await trx.commit();

                if (insertedIds.length > 0) {
                    const userData: github_Users = {
                        username: github_username,
                        github_username: github_username,
                        github_id: github_id,
                        github_token: github_token
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






