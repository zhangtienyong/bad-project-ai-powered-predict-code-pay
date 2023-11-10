import EmployerDbService from "../services/employerdb.service"
import { Request, Response } from 'express';

export default class EmployerDbController {
    constructor(private employerDbService: EmployerDbService) { }


    edit = async (req: Request, res: Response) => {
        if (req.session.user) {
            const Session = req.session.user;
            const { company, about, industry, website, email, size, phone, location } = req.body;

            try {
                if (Session.user_id !== undefined) {
                    await this.employerDbService.edit(company, about, industry, website, email, size, phone, location, Session.user_id);
                    res.status(200).json({ message: "successful" });
                } else {
                    // Handle the case where user_id is undefined
                    res.status(400).json({ error: "user_id is undefined" });
                }
            } catch (err) {
                console.error("Error", err);
                res.status(500).json({ error: "error" });
            }
        } else {
            res.status(401).json({ error: "User not authenticated" });
        }
    };



    getUserDetails = async (req: Request, res: Response) => {
        const user = req.session.user;

        if (!user) {
            console.log(`You are not logged in.`);
            return res.status(404).json({ error: 'User not found' });
        } else {
            try {
                if (user.github_id) {
                    const ID: string = user.github_id;
                    console.log("GithubLogin", ID);


                    const result = await this.employerDbService.getUserDetails(ID);

                    console.log(JSON.stringify(result));

                    return res.json(result);
                } else if (user.email) {
                    const email: string = user.email;
                    console.log("Login", email);


                    const result = await this.employerDbService.getUserDetails(email);

                    console.log(JSON.stringify(result));

                    return res.json(result);
                }


                return res.status(404).json({ error: 'User not found' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };



}

