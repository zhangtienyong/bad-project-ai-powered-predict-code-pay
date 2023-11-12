import EmployerDbService from "../services/employerdb.service"
import { Request, Response } from 'express'
import formidable from 'formidable';
import fs from 'fs';

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })



export default class EmployerDbController {
    constructor(private employerDbService: EmployerDbService) { }

    edit = async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                const Session = req.session.user;

                if (Session.user_id !== undefined) {
                    const form = formidable({
                        uploadDir,
                        maxFiles: 1,
                        maxFileSize: 1024 ** 2 * 200,
                        filter: (part) => part.mimetype?.startsWith("image/") ?? false,
                        filename: (_originalName, _originalExt, part) => {
                            const fieldName = part.name;
                            const timestamp = Date.now();
                            const ext = part.mimetype?.split("/").pop();
                            return `${fieldName}-${timestamp}.${ext}`;
                        },
                    });

                    const { fields, files } = await new Promise<{ fields: formidable.Fields, files: formidable.Files }>((resolve, reject) => {
                        form.parse(req, (err, fields, files) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({ fields, files });
                            }
                        });
                    });

                    // Check if files.image is an array
                    const fileArray = files.image as formidable.File[];
                    const file = Array.isArray(fileArray) ? fileArray[0]?.newFilename : undefined;
                    

                    const company = fields.company
                    const about = fields.about 
                    const industry = fields.industry 
                    const website = fields.website 
                    const email = fields.email 
                    const size = fields.size 
                    const phone = fields.phone 
                    const location = fields.location

                    await this.employerDbService.edit(company, about, industry, website, email, size, phone, location, Session.user_id, file);

                    res.status(200).json({ message: "successful" });
                } else {
                    res.status(400).json({ error: "user_id is undefined" });
                }
            } else {
                res.status(401).json({ error: "User not authenticated" });
            }
        } catch (err) {
            console.error("Error", err);
            res.status(500).json({ error: "error" });
        }
    };



    // edit = async (req: Request, res: Response) => {
    //     if (req.session.user) {
    //         const Session = req.session.user;
    //         const { company, about, industry, website, email, size, phone, location } = req.body;

    //         try {
    //             if (Session.user_id !== undefined) {
    //                 await this.employerDbService.edit(company, about, industry, website, email, size, phone, location, Session.user_id);
    //                 res.status(200).json({ message: "successful" });
    //             } else {
    //                 // Handle the case where user_id is undefined
    //                 res.status(400).json({ error: "user_id is undefined" });
    //             }
    //         } catch (err) {
    //             console.error("Error", err);
    //             res.status(500).json({ error: "error" });
    //         }
    //     } else {
    //         res.status(401).json({ error: "User not authenticated" });
    //     }
    // };


    getUserDetails = async (req: Request, res: Response) => {
        const user = req.session.user;

        if (!user) {
            console.log(`You are not logged in.`);
            return res.status(404).json({ error: 'user not found' });
        } else {
            try {
                if (user.user_id) {
                    const ID: number = user.user_id;
                    console.log("login", ID);

                    const result = await this.employerDbService.getUserDetails(ID);
                    console.log(result);
                    return res.json(result);
                } 

                return res.status(404).json({ error: 'compaany details not found' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    
    initJob = async (req: Request, res: Response) => {
        try {
            if (req.session.user) {
                const userId = req.session.user.user_id; 
    
                if (userId !== undefined) {
                    const result = await this.employerDbService.getJob(userId);
                    // Handle the retrieved user details as needed
                    
                    return res.json(result);
                } else {
                    return res.status(400).json({ error: "User ID is undefined" });
                }
            } else {
                return res.status(401).json({ error: "User not authenticated" });
            }
        } catch (error) {
            console.error("Error", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };






}

                    

                    

                    


    

    


