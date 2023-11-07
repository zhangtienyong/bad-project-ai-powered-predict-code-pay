import express from "express";
// import AuthController from "../controllers/auth.controller";
// import {AuthService}  from "../services/auth.service";
// import { knex } from "../db";



// const authService = new AuthService(knex);
// const authController = new AuthController(authService);

export const authRoutes = express.Router();

<<<<<<< Updated upstream
// authRoutes.post("/login", authController.login);
// authRoutes.post("/signup", authController.signup)
=======
authRoutes.post("/signin", authController.login);
authRoutes.post("/signup", authController.signup)
>>>>>>> Stashed changes


