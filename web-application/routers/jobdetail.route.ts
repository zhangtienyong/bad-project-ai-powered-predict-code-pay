import express from "express";
// import { Request, Response } from "express";
import JobDetailController from "../controllers/jobdetail.controller";
import JobDetailService from "../services/jobdetail.service";
import { knex } from "../db";
// import path from "path";

const jobDetailService = new JobDetailService(knex);
const jobDetailController = new JobDetailController(jobDetailService);

export const jobDetailRoutes = express.Router();


// jobDetailRoutes.get("/jobdetail", (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, "../public/html/jobdetail.html"));
// });

jobDetailRoutes.get("/jobdetail", jobDetailController.getJobDetail);
jobDetailRoutes.post("/apply", jobDetailController.applyJob);