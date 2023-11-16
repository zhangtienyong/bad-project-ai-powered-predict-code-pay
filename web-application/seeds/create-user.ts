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

    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE jobs_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE job_skills_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE skill_recommendations_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE company_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE developer_data_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE skills_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE salary_predictions_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE job_applications_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE developer_skills_id_seq RESTART WITH 1');


    try {
        // Generate random data for 'users' table
        const users = await trx('users').insert([
            {
                username: "Peter",
                email: "peter@gmail.com",
                password: await hashPassword("aaa"),
                github_id: "",
                github_token: "",
                github_username: "",
                role: "employer",
            },
            {
                username: "Mary",
                email: "mary@gmail.com",
                password: await hashPassword("aaa"),
                github_id: "",
                github_token: "",
                github_username: "",
                role: "developer",
            },
        ]).returning("id");

        const [peter, mary] = users

        // Generate random data for 'developer_data' table
        const developer_data = await trx('developer_data').insert([
            {
                user_id: peter.id,
                education_level: "99",
                country: "HK",
                years_of_coding: 10,
                years_of_employment: 10,
                learning_source: "book",
                developer_type: "rookie",
                age: 30,
            },
            {
                user_id: mary.id,
                education_level: "88",
                country: "Japan",
                years_of_coding: 4,
                years_of_employment: 4,
                learning_source: "interent",
                developer_type: "senior",
                age: 999,
            }

        ]).returning("id");

        const [developer_data_id] = developer_data

        // Generate random data for 'salary_predictions' table
        await trx('salary_predictions').insert([
            {
                data_id: developer_data_id.id, // Assuming the data ID is 1 for the created developer_data above
                predicted_salary: 777,
            },
        ]).returning("id");

        // Generate random data for 'skill_recommendations' table
        await trx('skill_recommendations').insert([
            {
                data_id: developer_data_id.id,
                programming_language_recommendation: "no",
                web_framework_recommendation: "sleep",
                cloud_platform_recommendation: "watch TV",
            },
        ]).returning("id");

        // Generate random data for 'company' table
        const company = await trx('company').insert([
            {
                user_id: peter.id,
                company_name: "abc company",
                logo: "../uploads/logo.jpg",
                industry: "IT",
                company_size: "1",
                website: "abc.com",
                email: "abc@email.com",
                phone: "12345678",
                location: "HK",
                about: "ABC company recruitment information",
            },
        ]).returning("id");

        const [company_id] = company

        // Generate random data for 'jobs' table
        const jobs = await trx('jobs').insert([
            {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            }, {
                company_id: company_id.id,
                job_title: "Monkey",
                work_place: "HK",
                employment_type: "monkey type",
                job_description: "a monkey",
                experience_level: "0",
                responsibilities: "sleep",
                qualifications: "HK people",
            },
        ]).returning("id");
        const [job_id] = jobs
        

        // Generate random data for 'job_applications' table
        await trx('job_applications').insert([
            {
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },{
                job_id: job_id.id,
                user_id: mary.id,
                cv_pdf: "monkey-cv",
                status: 'Pending',
            },
        ]).returning("id");

        const skills = await trx("skills").insert([
            {
                name: "aaa",
                types: "programming_language",
            },
            {
                name: "bbb",
                types: "programming_language",
            },
            {
                name: "ccc",
                types: "database",
            },
            {
                name: "ddd",
                types: "database",
            },
            {
                name: "eee",
                types: "web_framework",
            },
            {
                name: "bbb",
                types: "web_framework",
            },
            {
                name: "fff",
                types: "cloud_platform",
            },
            {
                name: "ggg",
                types: "cloud_platform",
            }
        ]).returning("id");

       await trx("job_skills").insert([
            {
                job_id: job_id.id,
                skills_id: skills[0].id,
            },
            {
                job_id: job_id.id,
                skills_id: skills[1].id,
            },
            {
                job_id: job_id.id,
                skills_id: skills[2].id,
            },
            {
                job_id: job_id.id,
                skills_id: skills[3].id,
            },
        ]).returning("id");

        await trx("developer_skills").insert([
            {
                data_id: developer_data_id.id,
                skills_id: skills[0].id,
            },
            {
                data_id: developer_data_id.id,
                skills_id: skills[1].id,
            },
            {
                data_id: developer_data_id.id,
                skills_id: skills[2].id,
            },
            {
                data_id: developer_data_id.id,
                skills_id: skills[3].id,
            },
        ]).returning("id");

        await trx.commit();
    } catch (err) {
        await trx.rollback();
        console.error(err.message);
    }
};
