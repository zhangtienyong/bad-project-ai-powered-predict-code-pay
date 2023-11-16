import { Request, Response, Router } from "express";
import PredictionService from "../services/prediction.service";
import PredictionController from "../controllers/prediction.controller";
import { knex } from "../db";
import path from "path";

const predictionService = new PredictionService(knex);
const predictionController = new PredictionController(predictionService);

const predictionRoutes = Router();

predictionRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../developer/html/prediction.html"));
});

predictionRoutes.post("/devdata",predictionController.devDataPosting);

export default predictionRoutes;
