import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { LoginSchema } from "../schemas/auth.schema";
import { BadRequestError } from "../utils/error";

export default class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const schemaResult = LoginSchema.safeParse(req.body);
    if (!schemaResult.success) {
      throw new BadRequestError("invalid input");
    }
    const user = await this.authService.login(schemaResult.data);

    if (req.session.user) {
      res.status(403).json({ error: "Already logged in" });
      return;
    }

    req.session.user = {
      email: user.email,
      user_id: user.id,
      github_id: user.github_id,
      github_username: user.github_username,
      role: user.role,
    };

    res.json({
      success: true,
      message: "login success",
      session: req.session.user,
    });
  };

  logout = async (req: Request, res: Response) => {
    console.log("logout");
    if (req.session) {
      delete req.session.user;
    }
    res.redirect("/index.html");
  };

  signup = async (req: Request, res: Response) => {
    const { username, email, password, password_repeated, role } = req.body;

    try {
      if (!username || !email || !password || !password_repeated || !role) {
        res.status(400).json({
          success: false,
          message: "missing email, username, password, or role",
        });
        return;
      }

      if (password !== password_repeated) {
        res.status(406).json({ success: false, message: "wrong repeated password" });
        return;
      }

      const result = await this.authService.signup(username, email, password, role);

      if (!result.result) {
        res.status(401).json({ error: "Email already exists" });
        return;
      }

      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      res.status(500).json({ error: "An error occurred during signup" });
    }
    return true;
  };

  userInform = (req: Request, res: Response) => {
    const userSessionData = req.session.user;

    if (userSessionData) {
      // User is authenticated
      // console.log(userSessionData)
      res.status(200).json({ user: userSessionData });
    } else {
      // User is not authenticated
      // console.log(userSessionData)
      res.status(401).json({ error: "User not authenticated" });
    }
  };
}
