import { Knex } from "knex";
import { Users } from "../models";
import { checkPassword } from "../hash";

export class AuthService {
    constructor(private knex: Knex) { }

    async login(email: string, password: string) {
        const user = await this.knex<Users>("users").where("email", email).first();
        if (
            !user ||
            !(await checkPassword({ plainPassword: password, hashedPassword: user.password }))
        ) {
            return { result: false, message: "invalid email/password" };
        }
        return { result: true, user };
    }

    async signup(username: string, email: string, password: string) {
        const existingUserInfo = await this.knex
            .select("email")
            .from("users")
            .where("email", email);

        const existingUser = existingUserInfo.rows[0];
        console.log(existingUserInfo);

        if (existingUser) {
            return { result: false, message: "Email already exists" };
        }
        await this.knex
        .insert({
            username: "name", 
            email: "email", 
            password: "await hashPassword(password)"
        })
        .into("users")
         return { result: true };
    }
}


