import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("developer_data", (table) => {
        table.dropColumn("programming_language");
        table.dropColumn("database");
        table.dropColumn("web_framework");
        table.dropColumn("cloud_platform");
    })

    await knex.schema.alterTable("jobs", (table) => {
        table.dropColumn("skills");
    })

    await knex.schema.createTable("skills", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("types").notNullable();
        table.timestamps(false, true);
    })

    await knex.schema.createTable("job_skills", (table) => {
        table.increments();
        table.integer("job_id").notNullable().unsigned();
        table.foreign("job_id").references("jobs.id").onDelete("CASCADE");
        table.integer("skills_id").notNullable().unsigned();
        table.foreign("skills_id").references("skills.id").onDelete("CASCADE");
    });

    await knex.schema.createTable("developer_skills", (table) => {
        table.increments();
        table.integer("data_id").notNullable().unsigned();
        table.foreign("data_id").references("developer_data.id").onDelete("CASCADE");
        table.integer("skills_id").notNullable().unsigned();
        table.foreign("skills_id").references("skills.id").onDelete("CASCADE");

    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("developer_skills");
    await knex.schema.dropTable("job_skills");
    await knex.schema.dropTable("skills");

    await knex.schema.alterTable("developer_data", (table) => {
        table.string("programming_language");
        table.string("database");
        table.string("web_framework");
        table.string("cloud_platform");
    })

    await knex.schema.alterTable("jobs", (table) => {
        table.string("skills");
    })
   
}

