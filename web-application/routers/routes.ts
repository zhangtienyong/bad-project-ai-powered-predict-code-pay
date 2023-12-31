import { Router } from "express";
import {authRoutes} from "./auth.route";
import homeRoutes from "./home.route";
import predictionRoutes from "./prediction.route";
// import recommendationRoutes from "./recommendation.route";
import {recommendationRoutes} from "./recommendation.route";
import {jobPostingRoutes} from "./jobposting.route";
import jobBoardsRoutes from "./jobboards.route";
import dashboardRoutes from "./dashboard.route";
import signInRoutes from "./signin.route";
import { jobDetailRoutes } from "./jobdetail.route";
// import { isDeveloperLoggedInApi, isEmployerLoggedInApi} from "../guard";
// , isEmployerLoggedInApi, isLoggedInApi 
export const apiRoutes = Router();

apiRoutes.use("/", authRoutes);
apiRoutes.use("/signin", signInRoutes);
apiRoutes.use("/", homeRoutes);
apiRoutes.use("/prediction", predictionRoutes);
apiRoutes.use("/", recommendationRoutes);
apiRoutes.use("/",jobPostingRoutes);
apiRoutes.use("/jobboards", jobBoardsRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
apiRoutes.use("/", jobDetailRoutes);
