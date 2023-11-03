import { Request, Response, Router } from "express";
import path from "path";

const dashboardRoutes = Router();

dashboardRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
});

export default dashboardRoutes;
