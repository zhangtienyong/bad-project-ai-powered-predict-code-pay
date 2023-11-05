import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { checkPassword } from "../hash";

export default class AuthController {
    constructor(private authService: AuthService) {
    }

    login = async (req: Request, res: Response) => {

        try {

            const { email, password } = req.body;
            const result = await client.query(`SELECT * FROM users WHERE users.email = $1`, [email]);

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















}