import DeveloperDbService from "../services/developerdb.service";
import { Request, Response } from "express";

export default class DeveloperDbController {
  constructor(private developerDbService: DeveloperDbService) {}

  // matchingSkills = async (req: Request, res: Response) => {
  //     try {
  //         if (req.session.user) {
  //             const userId = req.session.user.user_id;

  //             if (userId !== undefined) {
  //                 const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  //                 const result = await this.developerDbService.matchingSkills(userId,page);
  //                 return res.json(result);
  //             } else {
  //                 return res.status(400).json({ error: "User ID is undefined" });
  //             }
  //         } else {
  //             return res.status(401).json({ error: "User not authenticated" });
  //         }
  //     } catch (error) {
  //         console.error("Error", error);
  //         return res.status(500).json({ error: "Internal Server Error" });
  //     }
  // };

  application = async (req: Request, res: Response) => {
    try {
      if (req.session.user) {
        const userId = req.session.user.user_id;

        if (userId !== undefined) {
          const app = req.query.app ? parseInt(req.query.app as string, 10) : 1;
          console.log(app);
          const result = await this.developerDbService.application(userId, app);

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

  getDeveloperInfo = async (req: Request, res: Response) => {
    try {
      const userId = req.session.user?.user_id!;
      const developerInfo =
        await this.developerDbService.getDeveloperInfo(userId);
      // const recommendations = developerInfo.recommendations
      // const developer = developerInfo.developer
      // const developer_skills = developerInfo.developer_skills
      // const skills = developerInfo.skills

      res.status(200).json({ result: { ...developerInfo } });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
