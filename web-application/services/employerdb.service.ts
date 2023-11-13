import { Knex } from "knex";

export default class EmployerDbService {
  constructor(private knex: Knex) { }


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

  async edit(company: any, about: any, industry: any, website: any, email: any, size: any, phone: any, location: any, id: number) {
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
      
    }
    const existingCompany = await this.knex<any>("company").where("user_id", id).first();

    if (existingCompany) {
      await this.knex("company")
        .where("user_id", id)
        .update(Company);

      return { result: true, message: "Company updated successfully" };
    } else {
      await this.knex
        .insert(Company)
        .into("company")
        .returning("id");

      return { result: true, message: "Company inserted successfully" };
    }
  }

  async image(file: any, id: number) {
    const image = {
      logo: file,
    }
    const existingCompany = await this.knex<any>("company").where("user_id", id).first();

    if (existingCompany) {
      await this.knex("company")
        .where("user_id", id)
        .update(image);

      return { result: true, message: "Company updated successfully" };
    } else {
      await this.knex
        .insert(image)
        .into("company")

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
          .where("company_id", company.id)
  
        if (jobs && jobs.length > 0) {
          const jobIds = jobs.map((job) => job.id); 
          const applications = await this.knex("job_applications")
            .select("*")
            .whereIn("job_id", jobIds)
            .limit(pageSize)
            .offset(offset);
  
          return applications;}

        return

      }else {
        throw new Error("Company not found for the given user");
      }
    } catch (error) {
      throw error;
    }
  }
  


}





// async edit(company: any, about: any, industry: any, website: any, email: any, size: any, phone: any, location: any, id: number) {
//   const Company = {
//     company_name: company,
//     about: about,
//     industry: industry,
//     website: website,
//     email: email,
//     company_size: size,
//     phone: phone,
//     location: location,
//     user_id: id,
//     logo: file,
//   }
//   const existingCompany = await this.knex<any>("company").where("user_id", id).first();

//   if (existingCompany) {
//     await this.knex("company")
//       .where("user_id", id)
//       .update(Company);

//     return { result: true, message: "Company updated successfully" };
//   } else {
//     await this.knex
//       .insert(Company)
//       .into("company")
//       .returning("id");

//     return { result: true, message: "Company inserted successfully" };
//   }
// }