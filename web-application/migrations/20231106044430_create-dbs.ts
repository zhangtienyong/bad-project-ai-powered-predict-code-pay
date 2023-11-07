import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("Users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("email").unique();
        table.string("password")
        table.integer("github_id");
        table.string("github_token");
        table.string("github_username");
        table.string("role")
        table.timestamps(false, true);
      });
    
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("Users");
}

