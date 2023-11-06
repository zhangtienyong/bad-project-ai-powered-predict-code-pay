import express from "express";
import AuthController from "../controllers/auth.controller";
import {AuthService}  from "../services/auth.service";
import { Knex } from "knex";



const authService = new AuthService(Knex);
const authController = new AuthController(authService);

export const authRoutes = express.Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/signup", authController.signup)


