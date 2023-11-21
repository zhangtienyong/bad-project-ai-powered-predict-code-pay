import { Request, Response, Router } from "express";
import { knex } from "../db";
import JobBoardsController from "../controllers/jobBoards.controller";
import JobBoardsService from "../services/jobBoards.service";
import path from "path";

const jobBoardsService = new JobBoardsService(knex);
const jobBoardsController = new JobBoardsController(jobBoardsService);

const jobBoardsRoutes = Router();

jobBoardsRoutes.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/html/jobboards.html"));
});

jobBoardsRoutes.get("/initJobBoard", jobBoardsController.initJobBoard);
jobBoardsRoutes.get("/role", jobBoardsController.getRole);

export default jobBoardsRoutes;
