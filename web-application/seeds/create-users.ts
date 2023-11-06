import { Knex } from "knex";
import { hashPassword } from "../hash";
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const trx = await knex.transaction();
    const hashedPassword=hashPassword("123")

    try {
        await trx("users").del();

        // Inserts seed entries
        await trx("users").insert([
            {
                username: "user1",
                password: hashedPassword,
                email: "123@gmail.com"
            },
        ]);
    } catch (err) {
        await trx.rollback();
        console.error(err.message);
    }
};