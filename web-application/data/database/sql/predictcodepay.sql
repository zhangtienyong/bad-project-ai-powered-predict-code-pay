CREATE DATABASE predictcodepay;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    github_id INT,
    github_token VARCHAR(255),
    github_username VARCHAR(255),
    profile_image VARCHAR(255),
    role VARCHAR(20) NOT NULL
);

CREATE TABLE developer_data (
    data_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    education_level VARCHAR(255),
    country VARCHAR(255),
    years_of_coding INT,
    years_of_employment INT,
    learning_source VARCHAR(255),
    developer_type VARCHAR(255),
    programming_language VARCHAR(255),
    database VARCHAR(255),
    web_framework VARCHAR(255),
    cloud_platform VARCHAR(255)
);

CREATE TABLE salary_predictions (
    prediction_id SERIAL PRIMARY KEY,
    data_id INT REFERENCES developer_data(data_id),
    predicted_salary NUMERIC,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE skill_recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    data_id INT REFERENCES developer_data(data_id),
    programming_language_recommendation VARCHAR(255),
    database_recommendation VARCHAR(255),
    web_framework_recommendation VARCHAR(255),
    cloud_platform_recommendation VARCHAR(255)
);

CREATE TABLE company (
    company_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    company_name VARCHAR(255),
    logo VARCHAR(255),
    industry VARCHAR(255),
    company_size VARCHAR(255),
    website VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    location VARCHAR(255),
    about VARCHAR(255)
);

CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES company(company_id),
    job_title VARCHAR(255) NOT NULL,
    workplace_type VARCHAR(255),
    employment_type VARCHAR(255),
    job_description TEXT,
    experience_level VARCHAR(255),
    responsibilities TEXT,
    qualifications TEXT,
    skills TEXT
    job_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_applications (
    application_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(job_id),
    user_id INT REFERENCES users(user_id),
    cv_pdf BYTEA,
    application_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'Pending'
);
