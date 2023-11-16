import express from "express";
import JobPostingController from "../controllers/jobposting.controller";
import JobPostingService from "../services/jobposting.service";
import { knex } from "../db"
// import { Request, Response } from "express";
// import path from "path";



const jobPostingService = new JobPostingService(knex);
const jobPostingController = new JobPostingController(jobPostingService);

export const jobPostingRoutes = express.Router();

// jobPostingRoutes.get("/jobposting", (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, "../employer/html/jobposting.html"));
// });

jobPostingRoutes.get("/jobposting", jobPostingController.getSkills);
jobPostingRoutes.post("/jobposting", jobPostingController.jobPosting);
