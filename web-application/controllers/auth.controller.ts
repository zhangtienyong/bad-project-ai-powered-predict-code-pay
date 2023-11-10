import { Request, Response } from "express";
import AuthService from "../services/auth.service";



export default class AuthController {
  constructor(private authService: AuthService) {
  }

  login = async (req: Request, res: Response) => {

    try {

      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      console.log(result.user)

      if (!result.result) {
        res.status(401).json({ error: "Wrong Username/Password" });
        return;
      }

      if (req.session.user) {
        res.status(403).json({ error: "Already logged in" });
        return;
      }

      req.session.user = {
        email: result.user?.email!,
        user_id: result.user?.id,
        github_id: result.user?.github_id!,
        github_username: result.user?.github_username!,
        role: result.user?.role!
      };

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

  logout = async (req: Request, res: Response) => {
    console.log("logout");
    if (req.session) {
      delete req.session.user;
    }
    res.redirect('/index.html')
  }

  signup = async (req: Request, res: Response) => {
    const { username, email, password, password_repeated, role } = req.body;

    try {
      if (!username || !email || !password || !password_repeated || !role) {
        res
          .status(400)
          .json({ success: false, message: "missing name, email, password, or role" });
        return;
      }

      if (password !== password_repeated) {
        res
          .status(406)
          .json({ success: false, message: "wrong repeated password" });
        return;
      }
      
      await this.authService.signup(username, email, password, role);

      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error occurred during signup:", error);
      res.status(500).json({ error: "An error occurred during signup" });
    }
    return true;
  }

  userInform = (req: Request, res: Response) => {
    const userSessionData = req.session.user;

    if (userSessionData) {
        // User is authenticated
        // console.log(userSessionData)
        res.status(200).json({ user: userSessionData });
    } else {
        // User is not authenticated
        // console.log(userSessionData)
        res.status(401).json({ error: 'User not authenticated' });
    }
};

}





