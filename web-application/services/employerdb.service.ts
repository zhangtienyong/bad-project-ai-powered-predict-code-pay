import { Knex } from "knex";



export default class EmployerDbService {
    constructor(private knex: Knex) { }


    async edit(company: string, about: string, industry: string, website: string, email: string, size: string, phone: string, location: string)
    {
        const companyForm = await this.knex<any>("company").where("company_name", company).first();

        if (companyForm) {
            return { result: false, message: "error" };
        }
        await this.knex
            .insert({
                company_name: company,
                about: about,
                industry: industry,
                website: website,
                email: email,
                company_size: size,
                phone: phone,
                location: location,
                user_id: "1",
                logo: "2"
            })
            .into("company")
            .returning("id");

         return { result: true };
    }


}