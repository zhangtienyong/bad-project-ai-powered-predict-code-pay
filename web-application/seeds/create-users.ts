import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const trx = await knex.transaction();

    await trx('job_applications').del();
    await trx('jobs').del();
    await trx('company').del();
    await trx('skill_recommendations').del();
    await trx('salary_predictions').del();
    await trx('developer_data').del();
    await trx('users').del();


    try {
        // Generate random data for 'users' table
        const users = await trx('users').insert([
            {
                username: "aaa",
                email: "aaa@gmail.com",
                password: await hashPassword("aaa"),
                github_id: "aaa",
                github_token: "aaa",
                github_username: "aaa",
                role: "employer",
            },
            {
                username: "bbb",
                email: "bbb@gmail.com",
                password: await hashPassword("aaa"),
                github_id: "bbb",
                github_token: "aaa",
                github_username: "aaa",
                role: "developer",
            },
        ]).returning("id");

        const [aaa, bbb] = users

        // Generate random data for 'developer_data' table
        const developer_data = await trx('developer_data').insert([
            {
                user_id: aaa.id,
                education_level: "aaa",
                country: "aaa",
                years_of_coding: 999,
                years_of_employment: 999,
                learning_source: "aaa",
                developer_type: "aaa",
                programming_language: "aaa",
                database: BigInt(333),
                web_framework: BigInt(333),
                cloud_platform: BigInt(333),
                age: 999,
            },
            {
                user_id: bbb.id,
                education_level: "aaa",
                country: "aaa",
                years_of_coding: 999,
                years_of_employment: 999,
                learning_source: "aaa",
                developer_type: "aaa",
                programming_language: "aaa",
                database: BigInt(333),
                web_framework: BigInt(333),
                cloud_platform: BigInt(333),
                age: 999,
            }

        ]).returning("id");

        const [developer_data_id] = developer_data

        // Generate random data for 'salary_predictions' table
        await trx('salary_predictions').insert([
            {
                data_id: developer_data_id.id, // Assuming the data ID is 1 for the created developer_data above
                predicted_salary: 222,
            },
        ]).returning("id");

        // Generate random data for 'skill_recommendations' table
        await trx('skill_recommendations').insert([
            {
                data_id: developer_data_id.id,
                programming_language_recommendation: "aaa",
                web_framework_recommendation: "aaa",
                cloud_platform_recommendation: "aaa",
            },
        ]).returning("id");

        // Generate random data for 'company' table
        const company = await trx('company').insert([
            {
                user_id: aaa.id,
                company_name: "aaa",
                logo: "aaa",
                industry: "aaa",
                company_size: "aaa",
                website: "aaa",
                email: "aaa",
                phone: "aaa",
                location: "aaa",
                about: "aaa",
            },
        ]).returning("id");

        const [company_id] = company

        // Generate random data for 'jobs' table
        const jobs = await trx('jobs').insert([
            {
                company_id: company_id.id,
                job_title: "aaa",
                work_place: "aaa",
                employment_type: "aaa",
                job_description: "aaa",
                experience_level: "aaa",
                responsibilities: "aaa",
                qualifications: "aaa",
                skills: "aaa",
            },
        ]).returning("id");
        const [job_id] = jobs
        // Generate random data for 'job_applications' table
        await trx('job_applications').insert([
            {
                job_id: job_id.id,
                user_id: aaa.id,
                cv_pdf: "aaa",
                status: 'Pending',
            },
        ]).returning("id");

        await trx.commit();
    } catch (err) {
        await trx.rollback();
        console.error(err.message);
    }
};
