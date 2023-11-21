import { Knex } from "knex";

export default class EmployerDbService {
  constructor(private knex: Knex) {}

  async getUserDetails(ID: any) {
    try {
      const company = await this.knex("company")
        .select("*")
        .where("user_id", ID)
        .first();

      if (company) {
        return company;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }

  async edit(
    company: any,
    about: any,
    industry: any,
    website: any,
    email: any,
    size: any,
    phone: any,
    location: any,
    id: number,
  ) {
    const Company = {
      company_name: company,
      about: about,
      industry: industry,
      website: website,
      email: email,
      company_size: size,
      phone: phone,
      location: location,
      user_id: id,
    };
    const existingCompany = await this.knex<any>("company")
      .where("user_id", id)
      .first();

    if (existingCompany) {
      await this.knex("company").where("user_id", id).update(Company);

      return { result: true, message: "Company updated successfully" };
    } else {
      await this.knex.insert(Company).into("company").returning("id");

      return { result: true, message: "Company inserted successfully" };
    }
  }

  async editJob(
    jobId: any,
    title: any,
    place: any,
    type: any,
    description: any,
    level: any,
    responsibilities: any,
    qualifications: any,
  ) {
    const Job = {
      job_title: title,
      work_place: place,
      employment_type: type,
      job_description: description,
      experience_level: level,
      responsibilities: responsibilities,
      qualifications: qualifications,
    };
    await this.knex("jobs").where("id", jobId).update(Job);

    return { result: true, message: "Job updated successfully" };
  }

  async image(file: any, id: number) {
    const image = {
      logo: file,
    };
    const existingCompany = await this.knex<any>("company")
      .where("user_id", id)
      .first();

    if (existingCompany) {
      await this.knex("company").where("user_id", id).update(image);

      return { result: true, message: "Company updated successfully" };
    } else {
      await this.knex.insert(image).into("company");

      return { result: true, message: "Company inserted successfully" };
    }
  }

  async getJob(id: number, page: number, pageSize: number = 4) {
    try {
      const company = await this.knex("company")
        .select("id", "user_id")
        .where("user_id", id)
        .first();

      if (company) {
        const offset = (page - 1) * pageSize;

        const jobs = await this.knex("jobs")
          .select("*")
          .where("company_id", company.id)
          .limit(pageSize)
          .offset(offset);

        return jobs;
      } else {
        throw new Error("Company not found for the given user");
      }
    } catch (error) {
      throw error;
    }
  }

  async application(id: number, app: number, pageSize: number = 4) {
    try {
      const company = await this.knex("company")
        .select("id", "user_id")
        .where("user_id", id)
        .first();

      if (company) {
        const offset = (app - 1) * pageSize;

        const jobs = await this.knex("jobs")
          .select("*")
          .where("company_id", company.id);

        if (jobs && jobs.length > 0) {
          const jobIds = jobs.map((job) => job.id);
          const applications = await this.knex("job_applications")
            .select("*")
            .whereIn("job_id", jobIds)
            .where("status", "Pending")
            .limit(pageSize)
            .offset(offset);

          return applications;
        }

        return;
      } else {
        throw new Error("Company not found for the given user");
      }
    } catch (error) {
      throw error;
    }
  }

  async accepted_job(Title: number, user_id: number) {
    try {
      const status = { status: "accepted" };

      const existingApplication = await this.knex("job_applications")
        .where("id", Title)
        .first();

      if (existingApplication) {
        await this.knex("job_applications").where("id", Title).update(status);

        return { message: "Job application successfully accepted." };
      } else {
        return { error: "Job application not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        error: "An error occurred while accepting the job application.",
      };
    }
  }

  async rejected_job(Title: number, user_id: number) {
    try {
      const status = { status: "rejected" };

      const existingApplication = await this.knex("job_applications")
        .where("id", Title)
        .first();

      if (existingApplication) {
        await this.knex("job_applications").where("id", Title).update(status);

        return { message: "Job application successfully rejected." };
      } else {
        return { error: "Job application not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        error: "An error occurred while rejecting the job application.",
      };
    }
  }

  async delete_job(Title: number, user_id: number) {
    try {
      const existingJob = await this.knex("jobs").where("id", Title).first();

      if (existingJob) {
        await this.knex("jobs").where("id", Title).delete();

        return { message: "Job successfully deleted." };
      } else {
        return { error: "Job not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: "An error occurred while deleting the job." };
    }
  }

  async downloadCV(Title: number) {
    try {
      const existingApplication = await this.knex("job_applications")
        .where("id", Title)
        .first();

      if (existingApplication) {
        const cv_pdf = await this.knex("job_applications")
          .where("id", Title)
          .select("cv_pdf");

        return cv_pdf;
      } else {
        return { error: "Application not found." };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: "An error occurred while download CV." };
    }
  }
}
