import express from "express";
import AuthController from "../controllers/auth.controller";
import AuthService  from "../services/auth.service";
import { knex } from "../db";



const authService = new AuthService(knex);
const authController = new AuthController(authService);

export const authRoutes = express.Router();

authRoutes.post("/signin", authController.login);
authRoutes.post("/signup", authController.signup)
authRoutes.post("/logout", authController.logout)


