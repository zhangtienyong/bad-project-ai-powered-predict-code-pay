import { Request, Response, Router } from "express";
import path from "path";

const recommendationRoutes = Router();

recommendationRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../developer/html/recommendation.html"));
});

export default recommendationRoutes;
