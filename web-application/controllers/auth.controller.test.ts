import AuthService from "../services/auth.service";
import AuthController from "./auth.controller";
import { getRequest, getResponse } from "../utils/mock";
import { Request, Response } from "express";
import { Knex } from "knex"


describe("Test AuthController", () => {
    let authService: AuthService;
    let authController: AuthController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        authService = new AuthService({} as Knex);
        authController = new AuthController(authService);
        req = getRequest();
        res = getResponse();

    })

    describe('login', () => {
        it('should return 401 status and error message for wrong username/password', async () => {
          req.body = { email: 'test@example.com', password: 'wrongpassword' };
          authService.login = jest.fn().mockResolvedValue({ result: false });
    
          await authController.login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.json).toHaveBeenCalledWith({ error: 'Wrong Username/Password' });
        });
    
        it('should return 403 status and error message if user is already logged in', async () => {
          req.body = { email: 'test@example.com', password: 'password' };
          req.session.user = {email: 'test@example.com', user_id: 1, github_id: 'github123', github_username: "any", role: "any" };
          authService.login = jest.fn().mockResolvedValue({ result: true });
    
          await authController.login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.json).toHaveBeenCalledWith({ error: 'Already logged in' });
        });
    
        it('should set session user and return success message for valid login', async () => {
          const user = {
            email: 'test@example.com',
            user_id: 123,
            github_id: 'github123',
            github_username: 'testuser',
            role: 'user',
          };
          req.body = { email: 'test@example.com', password: 'password' };
          authService.login = jest.fn().mockResolvedValue({ result: true });
    
          await authController.login(req, res);
          
          expect(req.session.user).toEqual(user);
          expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'login success',
            session: req.session.user,
          });
        });
    
        it('should return 500 status and error message for internal server error', async () => {
          req.body = { email: 'test@example.com', password: 'password' };
          authService.login = jest.fn().mockRejectedValue(new Error('Internal server error'));
    
          await authController.login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'internal server error' });
        });
      });
      
      describe('signup', () => {
        it('should return 400 status and error message for missing required fields', async () => {
          req.body = {};
          authService.signup = jest.fn();
    
          await authController.signup(req, res);
    
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'missing name, email, password, or role',
          });
        });
    
        it('should return 406 status and error message for wrong repeated password', async () => {
          req.body = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            password_repeated: 'wrongpassword',
            role: 'user',
          };
          authService.signup = jest.fn();
    
          await authController.signup(req, res);
    
          expect(res.status).toHaveBeenCalledWith(406);
          expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'wrong repeated password',
          });
        });
    
        it('should call authService.signup and return success message for valid signup', async () => {
          req.body = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            password_repeated: 'password',
            role: 'user',
          };
          authService.signup = jest.fn();
    
          await authController.signup(req, res);
    
          expect(authService.signup).toHaveBeenCalledWith(
            'testuser',
            'test@example.com',
            'password',
            'user'
          );
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({ message: 'Signup successful' });
        });
    
        it('should return 500 status and error message for internal server error during signup', async () => {
          req.body = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password',
            password_repeated: 'password',
            role: 'user',
          };
          authService.signup = jest.fn().mockRejectedValue(new Error('Internal server error'));
    
          await authController.signup(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred during signup'})
        })
      })
})

