import express from "express";
import JobPostingController from "../controllers/jobposting.controler";
import JobPostingService from "../services/jobposting.service";
import { knex } from "../db"

const jobPostingService = new JobPostingService(knex);
const jobPostingController = new JobPostingController(jobPostingService);

export const jobPostingRoutes = express.Router();


jobPostingRoutes.post("/jobPosting", jobPostingController.jobPosting);
