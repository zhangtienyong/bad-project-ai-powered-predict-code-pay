import { Request, Response, Router } from "express";
import path from "path";

const signUpRoutes = Router();

signUpRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
});

export default signUpRoutes;
