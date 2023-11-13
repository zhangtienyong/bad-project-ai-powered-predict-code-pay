import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.string("email").unique();
        table.string("password")
        table.string("github_id").unique();;
        table.string("github_token");
        table.string("github_username");
        table.string("role");
        table.timestamps(false, true);
      });

    await knex.schema.createTable("developer_data", (table) => {
        table.increments();
        table.integer("user_id").notNullable().unsigned();
        table.foreign("user_id").references("users.id").onDelete("CASCADE");
        table.string("education_level").notNullable();
        table.string("country").notNullable();
        table.integer("years_of_coding").notNullable();
        table.integer("years_of_employment").notNullable();
        table.string("learning_source").notNullable();
        table.string("developer_type").notNullable();
        table.string("programming_language").notNullable();
        table.bigint("database");
        table.bigint("web_framework");
        table.bigint("cloud_platform");
        table.integer("age").notNullable();
        table.timestamps(false, true);
    })

    await knex.schema.createTable("salary_predictions", (table) => {
        table.increments();
        table.integer("data_id").notNullable().unsigned();
        table.foreign("data_id").references("developer_data.id").onDelete("CASCADE");
        table.string("predicted_salary").notNullable();
        table.timestamps(false, true);
    })
    
    await knex.schema.createTable("skill_recommendations", (table) => {
        table.increments();
        table.integer("data_id").notNullable().unsigned();
        table.foreign("data_id").references("developer_data.id").onDelete("CASCADE");
        table.string("programming_language_recommendation").notNullable();
        table.string("web_framework_recommendation").notNullable();
        table.string("cloud_platform_recommendation").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("company", (table) => {
        table.increments();
        table.integer("user_id").notNullable().unsigned();
        table.foreign("user_id").references("users.id").onDelete("CASCADE");
        table.string("company_name").notNullable();
        table.string("logo");
        table.string("industry").notNullable();
        table.string("company_size").notNullable();
        table.string("website").notNullable();
        table.string("email").notNullable();
        table.string("phone").notNullable();
        table.string("location").notNullable();
        table.string("about").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("jobs", (table) => {
        table.increments();
        table.integer("company_id").notNullable().unsigned();
        table.foreign("company_id").references("company.id").onDelete("CASCADE");
        table.string("job_title").notNullable();
        table.string("work_place").notNullable();
        table.string("employment_type").notNullable();
        table.text("job_description").notNullable();
        table.string("experience_level").notNullable();
        table.string("responsibilities").notNullable();
        table.string("qualifications").notNullable();
        table.string("skills").notNullable();
        table.timestamps(false, true);
    });

    await knex.schema.createTable("job_applications", (table) => {
        table.increments();
        table.integer("job_id").notNullable().unsigned();
        table.foreign("job_id").references("jobs.id").onDelete("CASCADE");
        table.integer("user_id").notNullable().unsigned();
        table.foreign("user_id").references("users.id").onDelete("CASCADE");
        table.string("cv_pdf").notNullable();
        table.timestamps(false, true);
        table.string('status').defaultTo('Pending').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("job_applications");
    await knex.schema.dropTable("jobs");
    await knex.schema.dropTable("company");
    await knex.schema.dropTable("skill_recommendations");
    await knex.schema.dropTable("salary_predictions");
    await knex.schema.dropTable("developer_data");
    await knex.schema.dropTable("users");
}

