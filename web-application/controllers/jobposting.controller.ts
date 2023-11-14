import { Request, Response } from "express";
import JobPostingService from "../services/jobposting.service";



export default class JobPostingController {
    constructor(private jobPostingService: JobPostingService) { }

    getSkills = async (req: Request, res: Response) => {


        try {
            const skills = await this.jobPostingService.getSkills();
            
            const programming_language_skills = skills.programming_language_skills.map(sk =>sk.name)
            const database_skills = skills.database_skills.map(sk =>sk.name)
            const web_framework_skills = skills.web_framework_skills.map(sk =>sk.name)
            const cloud_platform_skills = skills.cloud_platform_skills.map(sk =>sk.name)

            res.status(200).json({result: {programming_language_skills, database_skills, web_framework_skills, cloud_platform_skills}})
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    };


    jobPosting = async (req: Request, res: Response) => {


        try {

            const { job_title, work_place, employment_type, job_description, experience_level, responsibilities, qualifications, skills } = req.body;
    
            const loginUser = req.session.user;
            const loginUserId = loginUser?.user_id!;
           

            await this.jobPostingService.jobPosting(loginUserId, job_title, work_place, employment_type, job_description, experience_level, responsibilities, qualifications, skills);

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }


    }

}