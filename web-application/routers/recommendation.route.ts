import { Request, Response } from "express";
import path from "path";
import RecommendationController from "../controllers/recommendation.controller";
import RecommendationService from "../services/recommendation.service";
import express from "express";
import { knex } from "../db"



const recommendationService = new RecommendationService(knex);
const recommendationController = new RecommendationController(recommendationService);

export const recommendationRoutes = express.Router();

recommendationRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../developer/html/recommendation.html"));
});


recommendationRoutes.get("/recommendation/salary", recommendationController.getSalary)

recommendationRoutes.get("/recommendation", recommendationController.recommendation)