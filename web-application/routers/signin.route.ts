import dotenv from "dotenv";
import { knex } from "../db";
import GithubService from '../services/github.service';
import GithubController  from '../controllers/github.controller';
import path from "path";
import { Request, Response, Router } from "express";

declare global {
    var accessToken: string | undefined; 
  }

const signInRoutes = Router();

const githubService = new GithubService(knex)
const githubController = new GithubController(githubService)

dotenv.config();

signInRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/signin.html"));
});

signInRoutes.get('/employee', githubController.employee);
signInRoutes.get('/employer', githubController.employer);
signInRoutes.get('/employee_callback', githubController.employee_callback);
signInRoutes.get('/employer_callback', githubController.employer_callback);
signInRoutes.get('/employee_user_data', githubController.employee_user_data);
signInRoutes.get('/employer_user_data', githubController.employer_user_data);

export default signInRoutes;
