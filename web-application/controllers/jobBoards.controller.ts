import JobBoardsService from "../services/jobBoards.service"
import { Request, Response } from 'express'

export default class JobBoardsController {
    constructor(private jobBoardsService: JobBoardsService) { }

    initJobBoard = async (req: Request, res: Response) => {
        if (req.session.user) {
            const Session = req.session.user
            try {
                if (Session.user_id !== undefined) {
                    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
                    const result = await this.jobBoardsService.initJobBoard(Session.user_id,page);
                    return res.json(result);
                } else {
                    // Handle the case where user_id is undefined
                    return res.status(400).json({ error: "user_id is undefined" });
                }
            } catch (err) {
                console.error("Error", err);
                return res.status(500).json({ error: "error" });
            }
        } else {
            return res.status(401).json({ error: "User not authenticated" });
        }
    };



}


