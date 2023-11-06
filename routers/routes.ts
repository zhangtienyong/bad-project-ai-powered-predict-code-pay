import { Router } from "express";
import {authRoutes} from "./auth.route";
import homeRoutes from "./home.route";
import predictionRoutes from "./prediction.route";
import recommendationRoutes from "./recommendation.route";
import jobPostingRoutes from "./jobposting.route";
import dashboardRoutes from "./dashboard.route";

export const apiRoutes = Router();

apiRoutes.use("/", authRoutes);
apiRoutes.use("/", homeRoutes);
apiRoutes.use("/prediction", predictionRoutes);
apiRoutes.use("/recommendation", recommendationRoutes);
apiRoutes.use("/jobs", jobPostingRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
