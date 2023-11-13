import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.select('*')
        .from('jobs')
        .fullOuterJoin('job_skills', 'jobs.id', 'job_skills.job_id')
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("job_skills");
    await knex.schema.dropTableIfExists("jobs");
}

