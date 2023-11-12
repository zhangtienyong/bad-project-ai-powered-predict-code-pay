import express from "express";
import JobPostingController from "../controllers/jobposting.controller";
import JobPostingService from "../services/jobposting.service";
import { knex } from "../db"

const jobPostingService = new JobPostingService(knex);
const jobPostingController = new JobPostingController(jobPostingService);

export const jobPostingRoutes = express.Router();

jobPostingRoutes.get("/jobposting", jobPostingController.getSkills);
jobPostingRoutes.post("/jobposting", jobPostingController.jobPosting);
