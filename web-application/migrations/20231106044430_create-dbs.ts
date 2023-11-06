import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.integer("github_id");
        table.string("github_token");
        table.string("github_username");
        table.timestamps(false, true);
      });
    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}
