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
                user_id: bbb.id,
                education_level: "aaa",
                country: "aaa",
                years_of_coding: 999,
                years_of_employment: 999,
                learning_source: "aaa",
                developer_type: "aaa",
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
                database_recommendation: "aaa",
            },
        ]).returning("id");

        // Generate random data for 'company' table
        
        const company = await trx('company').insert([
            {
                user_id: aaa.id,
                company_name: "CodePredictPay",
                logo: "logo.jpg",
                industry: "IT",
                company_size: "Small",
                website: "https://www.codepredictpay.me",
                email: "code@codepredictpay.me",
                phone: "12345678",
                location: "Sheung Wan",
                about: "Founded in 2021, CodePredictPay is a company that provides a platform for developers to find jobs and for employers to find developers.",
            },
        ]).returning("id");

        const [company_id] = company

        // Generate random data for 'jobs' table
        const jobs = await trx('jobs').insert([
           
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_1",
                    work_place: "dummy_work_place_1",
                    employment_type: "dummy_employment_type_1",
                    job_description: "dummy_job_description_1",
                    experience_level: "dummy_experience_level_1",
                    responsibilities: "dummy_responsibilities_1",
                    qualifications: "dummy_qualifications_1",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_2",
                    work_place: "dummy_work_place_2",
                    employment_type: "dummy_employment_type_2",
                    job_description: "dummy_job_description_2",
                    experience_level: "dummy_experience_level_2",
                    responsibilities: "dummy_responsibilities_2",
                    qualifications: "dummy_qualifications_2",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_3",
                    work_place: "dummy_work_place_3",
                    employment_type: "dummy_employment_type_3",
                    job_description: "dummy_job_description_3",
                    experience_level: "dummy_experience_level_3",
                    responsibilities: "dummy_responsibilities_3",
                    qualifications: "dummy_qualifications_3",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_4",
                    work_place: "dummy_work_place_4",
                    employment_type: "dummy_employment_type_4",
                    job_description: "dummy_job_description_4",
                    experience_level: "dummy_experience_level_4",
                    responsibilities: "dummy_responsibilities_4",
                    qualifications: "dummy_qualifications_4",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_5",
                    work_place: "dummy_work_place_5",
                    employment_type: "dummy_employment_type_5",
                    job_description: "dummy_job_description_5",
                    experience_level: "dummy_experience_level_5",
                    responsibilities: "dummy_responsibilities_5",
                    qualifications: "dummy_qualifications_5",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_6",
                    work_place: "dummy_work_place_6",
                    employment_type: "dummy_employment_type_6",
                    job_description: "dummy_job_description_6",
                    experience_level: "dummy_experience_level_6",
                    responsibilities: "dummy_responsibilities_6",
                    qualifications: "dummy_qualifications_6",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_7",
                    work_place: "dummy_work_place_7",
                    employment_type: "dummy_employment_type_7",
                    job_description: "dummy_job_description_7",
                    experience_level: "dummy_experience_level_7",
                    responsibilities: "dummy_responsibilities_7",
                    qualifications: "dummy_qualifications_7",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_8",
                    work_place: "dummy_work_place_8",
                    employment_type: "dummy_employment_type_8",
                    job_description: "dummy_job_description_8",
                    experience_level: "dummy_experience_level_8",
                    responsibilities: "dummy_responsibilities_8",
                    qualifications: "dummy_qualifications_8",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_9",
                    work_place: "dummy_work_place_9",
                    employment_type: "dummy_employment_type_9",
                    job_description: "dummy_job_description_9",
                    experience_level: "dummy_experience_level_9",
                    responsibilities: "dummy_responsibilities_9",
                    qualifications: "dummy_qualifications_9",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_10",
                    work_place: "dummy_work_place_10",
                    employment_type: "dummy_employment_type_10",
                    job_description: "dummy_job_description_10",
                    experience_level: "dummy_experience_level_10",
                    responsibilities: "dummy_responsibilities_10",
                    qualifications: "dummy_qualifications_10",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_11",
                    work_place: "dummy_work_place_11",
                    employment_type: "dummy_employment_type_11",
                    job_description: "dummy_job_description_11",
                    experience_level: "dummy_experience_level_11",
                    responsibilities: "dummy_responsibilities_11",
                    qualifications: "dummy_qualifications_11",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_12",
                    work_place: "dummy_work_place_12",
                    employment_type: "dummy_employment_type_12",
                    job_description: "dummy_job_description_12",
                    experience_level: "dummy_experience_level_12",
                    responsibilities: "dummy_responsibilities_12",
                    qualifications: "dummy_qualifications_12",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_13",
                    work_place: "dummy_work_place_13",
                    employment_type: "dummy_employment_type_13",
                    job_description: "dummy_job_description_13",
                    experience_level: "dummy_experience_level_13",
                    responsibilities: "dummy_responsibilities_13",
                    qualifications: "dummy_qualifications_13",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_14",
                    work_place: "dummy_work_place_14",
                    employment_type: "dummy_employment_type_14",
                    job_description: "dummy_job_description_14",
                    experience_level: "dummy_experience_level_14",
                    responsibilities: "dummy_responsibilities_14",
                    qualifications: "dummy_qualifications_14",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_15",
                    work_place: "dummy_work_place_15",
                    employment_type: "dummy_employment_type_15",
                    job_description: "dummy_job_description_15",
                    experience_level: "dummy_experience_level_15",
                    responsibilities: "dummy_responsibilities_15",
                    qualifications: "dummy_qualifications_15",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_16",
                    work_place: "dummy_work_place_16",
                    employment_type: "dummy_employment_type_16",
                    job_description: "dummy_job_description_16",
                    experience_level: "dummy_experience_level_16",
                    responsibilities: "dummy_responsibilities_16",
                    qualifications: "dummy_qualifications_16",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_17",
                    work_place: "dummy_work_place_17",
                    employment_type: "dummy_employment_type_17",
                    job_description: "dummy_job_description_17",
                    experience_level: "dummy_experience_level_17",
                    responsibilities: "dummy_responsibilities_17",
                    qualifications: "dummy_qualifications_17",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_18",
                    work_place: "dummy_work_place_18",
                    employment_type: "dummy_employment_type_18",
                    job_description: "dummy_job_description_18",
                    experience_level: "dummy_experience_level_18",
                    responsibilities: "dummy_responsibilities_18",
                    qualifications: "dummy_qualifications_18",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_19",
                    work_place: "dummy_work_place_19",
                    employment_type: "dummy_employment_type_19",
                    job_description: "dummy_job_description_19",
                    experience_level: "dummy_experience_level_19",
                    responsibilities: "dummy_responsibilities_19",
                    qualifications: "dummy_qualifications_19",
                },
                {
                    company_id: company_id.id,
                    job_title: "dummy_job_20",
                    work_place: "dummy_work_place_20",
                    employment_type: "dummy_employment_type_20",
                    job_description: "dummy_job_description_20",
                    experience_level: "dummy_experience_level_20",
                    responsibilities: "dummy_responsibilities_20",
                    qualifications: "dummy_qualifications_20",
                },
            
        ]).returning("id");
        const [job_id] = jobs
        

        // Generate random data for 'job_applications' table
        await trx('job_applications').insert([
            {
                job_id: job_id.id,
                user_id: bbb.id,
                cv_pdf: "aaa",
                status: 'Pending',
            }
        ]).returning("id");

        const skills = await trx("skills").insert([
            {
                name: "aaa",
                types: "language",
            },
            {
                name: "bbb",
                types: "language",
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
                types: "webframework",
            },
            {
                name: "bbb",
                types: "webframework",
            },
            {
                name: "fff",
                types: "platform",
            },
            {
                name: "ggg",
                types: "platform",
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
