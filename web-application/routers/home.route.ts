import { Request, Response, Router } from "express";
import path from "path";

const homeRoutes = Router();

homeRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

export default homeRoutes;