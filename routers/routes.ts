import { Router } from "express";
import signUpRoutes from "./signup.route";
import signInRoutes from "./signin.route";
import homeRoutes from "./home.route";
import predictionRoutes from "./prediction.route";
import recommendationRoutes from "./recommendation.route";
import dashboardRoutes from "./dashboard.route";

export const apiRoutes = Router();

apiRoutes.use("/signup", signUpRoutes);
apiRoutes.use("/signin", signInRoutes);
apiRoutes.use("/", homeRoutes);
apiRoutes.use("/prediction", predictionRoutes);
apiRoutes.use("/recommendation", recommendationRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);