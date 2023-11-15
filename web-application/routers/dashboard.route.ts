import { Request, Response, Router } from "express";
import EmployerDbService from "../services/employerdb.service";
import EmployerDbController from "../controllers/employerdb.controller";
import { knex } from "../db"
import path from "path";

const employerDbService = new EmployerDbService(knex);
const employerDbController = new EmployerDbController(employerDbService);

const dashboardRoutes = Router();

dashboardRoutes.get("/developer", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../developer/html/developer_dashboard.html"));
});
dashboardRoutes.get("/employer", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/employer_dashboard.html"));
});
dashboardRoutes.post("/employer/company",employerDbController.edit);
dashboardRoutes.post("/employer/logo",employerDbController.image);
dashboardRoutes.get("/employer/company/details",employerDbController.getUserDetails);
dashboardRoutes.get("/employer/job", employerDbController.initJob)
dashboardRoutes.get("/employer/application", employerDbController.application)
dashboardRoutes.post("/employer/accepted_job", employerDbController.accepted_job)
dashboardRoutes.post("/employer/rejected_job", employerDbController.rejected_job)
dashboardRoutes.delete("/employer/delete_job", employerDbController.delete_job)
dashboardRoutes.post("/employer/editJob",employerDbController.editJob);




export default dashboardRoutes;
