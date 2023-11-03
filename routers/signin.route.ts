import { Request, Response, Router } from "express";
import path from "path";

const signInRoutes = Router();

signInRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/signin.html"));
});

export default signInRoutes;
