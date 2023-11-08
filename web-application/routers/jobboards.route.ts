import { Request, Response, Router } from "express";
import path from "path";

const jobBoardsRoutes = Router();

jobBoardsRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/jobboards.html"));
});

export default jobBoardsRoutes;
