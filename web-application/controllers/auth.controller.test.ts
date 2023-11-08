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
    
        // it.skip('should return 403 status and error message if user is already logged in', async () => {
        //   req.body = { email: 'test@example.com', password: 'password' };
        //   req.session = { user: {}};
        //   authService.login = jest.fn().mockResolvedValue({ result: true });
    
        //   await authController.login(req, res);
    
        //   expect(res.status).toHaveBeenCalledWith(403);
        //   expect(res.json).toHaveBeenCalledWith({ error: 'Already logged in' });
        // });
    
        // it.skip('should set session user and return success message for valid login', async () => {
        //   const user = {
        //     email: 'test@example.com',
        //     user_id: 123,
        //     github_id: 'github123',
        //     github_username: 'testuser',
        //     role: 'user',
        //   };
        //   req.body = { email: 'test@example.com', password: 'password' };
        //   req.session = {};
        //   authService.login = jest.fn().mockResolvedValue({ result: true, user });
    
        //   await authController.login(req, res);
    
        //   expect(req.session.user).toEqual(user);
        //   expect(res.json).toHaveBeenCalledWith({
        //     success: true,
        //     message: 'login success',
        //     session: req.session.user,
        //   });
        // });
    
        it('should return 500 status and error message for internal server error', async () => {
          req.body = { email: 'test@example.com', password: 'password' };
          authService.login = jest.fn().mockRejectedValue(new Error('Internal server error'));
    
          await authController.login(req, res);
    
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'internal server error' });
        });
      });
   

})

