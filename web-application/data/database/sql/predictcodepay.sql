CREATE DATABASE predictcodepay;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    github_id INT,
    github_token VARCHAR(255),
    github_username VARCHAR(255),
    profile_image VARCHAR(255),
    role VARCHAR(20) NOT NULL
);

CREATE TABLE EmployerJobs (
    job_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    job_title VARCHAR(255),
    company_name VARCHAR(255),
    logo VARCHAR(255),
    employer_email VARCHAR(255),
    country VARCHAR(255),
    location VARCHAR(255),
    job_type VARCHAR(20),
    experience_level VARCHAR(20),
    industry VARCHAR(255),
    job_description TEXT,
    responsibilities TEXT,
    skills_qualifications TEXT
);

CREATE TABLE JobApplications (
    application_id SERIAL PRIMARY KEY,
    job_id INT REFERENCES EmployerJobs(job_id),
    developer_user_id INT REFERENCES users(user_id),
    cv_pdf VARCHAR(255),
    developer_email VARCHAR(255),
    company_email VARCHAR(255)
);

CREATE TABLE UserJobApplications (
    user_job_application_id SERIAL PRIMARY KEY,
    developer_user_id INT REFERENCES users(user_id),
    job_application_id INT REFERENCES JobApplications(application_id)
);

CREATE TABLE DeveloperData (
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

CREATE TABLE SalaryPredictions (
    prediction_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    predicted_salary NUMERIC,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE SkillRecommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    programming_language_recommendation VARCHAR(255),
    database_recommendation VARCHAR(255),
    web_framework_recommendation VARCHAR(255),
    cloud_platform_recommendation VARCHAR(255)
);
