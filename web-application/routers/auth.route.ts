import express from "express";
import AuthController from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import { knex } from "../db";
import { asyncWrapper } from "../utils/wrapper";

const authService = new AuthService(knex);
const authController = new AuthController(authService);

export const authRoutes = express.Router();

authRoutes.post("/signin", asyncWrapper(authController.login));
authRoutes.post("/employer_signin", authController.login);
authRoutes.post("/signup", authController.signup);
authRoutes.get("/logout", authController.logout);
authRoutes.get("/userInform", authController.userInform);
