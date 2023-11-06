import { Request, Response } from "express";
import {AuthService} from "../services/auth.service";
import { checkPassword, hashPassword } from "../hash";


export default class AuthController {
    constructor(private authService: AuthService) {
    }

    login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;
            // const result = await client.query(`SELECT * FROM users WHERE users.email = $1`, [email]);
            const result = await this.authService.login(email, password);

            const user = result.rows[0];
            if (!user) {
                res.status(401).json({ error: "Wrong Username/Password" });
            }

            const match = await checkPassword({
                plainPassword: password,
                hashedPassword: user.password,
            });
            if (!match) {
                res.status(401).json({ error: "Wrong Username/Password" });
            }

            if (req.session.user) {
                res.status(403).json({ error: "Already logged in" });
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

        //   const existingUserInfo = await client.query(
        //     "SELECT * FROM users WHERE email = $1",
        //     [email],
        //   );
        //   const existingUser = existingUserInfo.rows[0];
        //   console.log(existingUserInfo);
        //   if (existingUser) {
        //     return res.status(409).json({ message: "Email already exists" });
        //   }
        //   await client.query(
        //     "INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, now(), now())",
        //     [name, email, await hashPassword(password)],
        //   );
      
          res.status(200).json({ message: "Signup successful" });
        } catch (error) {
          console.error("Error occurred during signup:", error);
          res.status(500).json({ error: "An error occurred during signup" });
        }
        return true;
    }

}















}