import { Request, Response } from "express";
import JobPostingService from "../services/jobposting.service";


export default class JobPostingController {
    constructor(private jobPostingService: JobPostingService) { }

    jobPosting = async (req: Request, res: Response) => {


        try {

            const { company_id, job_title, work_place, employment_type, job_description, experience_level, responsibilities, qualifications, skills } = req.body;
            await this.jobPostingService.jobPosting(company_id, job_title, work_place, employment_type, job_description, experience_level, responsibilities, qualifications, skills);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }


    }

}