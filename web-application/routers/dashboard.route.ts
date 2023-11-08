import { Request, Response, Router } from "express";
import path from "path";

const dashboardRoutes = Router();

dashboardRoutes.get("/developer", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/developer_dashboard.html"));
});

dashboardRoutes.get("/employer", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/employer_dashboard.html"));
});

export default dashboardRoutes;
