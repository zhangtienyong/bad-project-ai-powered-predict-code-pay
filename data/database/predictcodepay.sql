CREATE DATABASE predictcodepay;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    github_id INT,  -- GitHub user ID
    github_token VARCHAR(255),  -- GitHub access token
    github_username VARCHAR(255)  -- GitHub username
);
