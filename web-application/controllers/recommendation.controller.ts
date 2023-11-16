import { Request, Response } from "express";
import RecommendationService from "../services/recommendation.service";

export default class RecommendationController {
    constructor(private recommendationService: RecommendationService) { }

    getSalary = async (req: Request, res: Response) => {
        try {
            const user = req.session.user
            const userId = user?.user_id!

            const salaryInfo = await this.recommendationService.getSalary(userId)
            const salary = salaryInfo

            res.status(200).json({ result: salary })
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    }


    recommendation = async (req: Request, res: Response) => {

        try {
            const user = req.session.user
            const userId = user?.user_id!

            const result = await this.recommendationService.recommendation(userId)

            res.status(200).json({ result })
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "internal server error" });
        }
    }
}