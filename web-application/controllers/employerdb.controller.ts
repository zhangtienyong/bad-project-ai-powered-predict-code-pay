import EmployerDbService from "../services/employerdb.service"
import { Request, Response } from 'express';

export default class EmployerDbController {
    constructor(private employerDbService: EmployerDbService) { }


    edit = async (req: Request, res: Response) => {       
            const { company, about, industry, website, email, size, phone, location } = req.body;

            try {
                await this.employerDbService.edit(company, about, industry, website, email, size, phone, location);
                res.status(200).json({ message: "Signup successful" });
            } 
            catch (err) {
                console.error("Error", err);
                res.status(500).json({ error: "An error" });
            }
        }
                
      
    }

    

   




