import { Request, Response, Router } from "express";
import path from "path";

const jobPostingRoutes = Router();

jobPostingRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/jobposting.html"));
});

export default jobPostingRoutes;
