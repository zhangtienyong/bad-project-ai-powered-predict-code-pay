import { Request, Response } from "express";
import JobDetailService from "../services/jobdetail.service";
import formidable from 'formidable';
import fs from 'fs';


export default class JobDetailController {
    constructor(private jobDetailService: JobDetailService) { }

    getJobDetail = async (req: Request, res: Response) => {
        try {
            const jobId = + req.query.job_id!
            const job_detail = await this.jobDetailService.getJobDetail(jobId)
            const company = job_detail.company
            const job = job_detail.jobs
            const skills = job_detail.skills
            console.log(skills)


            res.status(200).json({ result: { company, job, skills } })
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }

    }

    applyJob = async (req: Request, res: Response) => {
        const uploadDir = 'CVs'
        fs.mkdirSync(uploadDir, { recursive: true })
        try {

            const form = formidable({
                uploadDir,
                maxFiles: 1,
                maxFieldsSize: 2 * 1024 * 1024,
                keepExtensions: true,
                filter: (part) => part.mimetype?.includes("pdf") ?? false,
                filename: (originalName, _originalExt, part) => {
                    const fieldName = originalName;
                    const timestamp = Date.now();
                    const ext = part.mimetype?.split("/").pop();
                    return `${fieldName}-${timestamp}.${ext}`;
                },
            });


            form.parse(req, async (err, fields, files) => {
                if (err) {
                    res.status(400).json({ message: "cannot upload file" });
                    return;
                }
                
                const filename = (files.cvUpload as formidable.File)?.newFilename;
       
                const jobId = + req.query.job_id!
  
                const applyUser = req.session.user
                const userId = applyUser?.user_id!

                const result = await this.jobDetailService.applyJob(filename, jobId, userId);
                if (!result.result){
                    res.status(401).json({ message: result.message });
                    return;
                }

                res.json({ success: true, message: "success" });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    }
}