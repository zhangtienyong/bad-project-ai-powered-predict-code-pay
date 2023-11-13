import { Request, Response, Router } from "express";
import path from "path";

const predictionRoutes = Router();

predictionRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../developer/html/prediction.html"));
});

export default predictionRoutes;
