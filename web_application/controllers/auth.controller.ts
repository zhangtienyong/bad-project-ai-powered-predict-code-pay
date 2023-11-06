import { Request, Response } from "express";
import {AuthService} from "../services/auth.service";



export default class AuthController {
  constructor(private authService: AuthService) {
  }

  login = async (req: Request, res: Response) => {

    try {

      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      if (!result.result) {
        res.status(401).json({ error: "Wrong Username/Password" });
        return;
      }

      if (req.session.user) {
        res.status(403).json({ error: "Already logged in" });
        return;
      }

      res.json({
        success: true,
        message: "login success",
        session: req.session.user,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "internal server error" });

    }
  }


  signup = async (req: Request, res: Response) => {
    const { username, email, password, password_repeated } = req.body;

    try {
      if (!username || !email || !password || !password_repeated) {
        res
          .status(400)
          .json({ success: false, message: "missing name, email or password" });
        return;
      }

      if (password !== password_repeated) {
        res
          .status(406)
          .json({ success: false, message: "wrong repeated password" });
        return;
      }
      
      await this.authService.signup(username, email, password);

      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      res.status(500).json({ error: "An error occurred during signup" });
    }
    return true;
  }

}





