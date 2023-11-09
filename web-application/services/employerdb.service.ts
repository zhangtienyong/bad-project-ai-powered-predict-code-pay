import { Knex } from "knex";



export default class EmployerDbService {
    constructor(private knex: Knex) { }


    async edit(company: string, about: string, industry: string, website: string, email: string, size: string, phone: string, location: string)
    {
        const companyForm = await this.knex<any>("company").where("").first();

        if (companyForm) {
            return { result: false, message: "already exists" };
        }
        await this.knex
            .insert({
                company: company,
                about: about,
                industry: industry,
                website: website,
                email: email,
                size: size,
                phone: phone,
                location: location
            })
            .into("company")
            .returning("id");

         return { result: true };
    }


}