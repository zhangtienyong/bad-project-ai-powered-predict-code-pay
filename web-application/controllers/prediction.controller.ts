import { Request, Response } from "express";
import JobPostingService from "../services/prediction.service";

export default class PredictionController {
  constructor(private jobPostingService: JobPostingService) {}

  devDataPosting = async (req: Request, res: Response) => {
    try {
      const {
        education_level,
        country,
        years_of_coding,
        years_of_employment,
        learning_source,
        developer_type,
        age,
        language,
        database,
        webframework,
        platform,
      } = req.body;
      const loginUser = req.session.user;
      const loginUserId = loginUser?.user_id!;

      await this.jobPostingService.devDataPosting(
        loginUserId,
        education_level,
        country,
        years_of_coding,
        years_of_employment,
        learning_source,
        developer_type,
        age,
        language,
        database,
        webframework,
        platform,
      );
      res.json({ success: true, message: "Developer data posting successful" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getSalary = async (req: Request, res: Response) => {
    try {
      const user = req.session.user;
      const userId = user?.user_id!;

      const salaryInfo = await this.jobPostingService.getSalary(userId);
      const salary = salaryInfo;

      res.status(200).json({ result: salary });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
