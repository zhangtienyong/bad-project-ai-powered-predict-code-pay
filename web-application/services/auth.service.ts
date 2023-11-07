import { Knex } from "knex";
import { Users } from "../models";
import { checkPassword } from "../hash";
import { hashPassword } from "../hash";

export class AuthService {
    constructor(private knex: Knex) { }

    async login(email: string, password: string) {
        const user = await this.knex<Users>("Users").where("email", email).first();
        if (
            !user ||
            !(await checkPassword({ plainPassword: password, hashedPassword: user.password }))
        ) {
            return { result: false, message: "invalid email/password" };
        }
        return { result: true, user };
    }

    async signup(username: string, email: string, password: string, role: string) {
        const existingUser = await this.knex<Users>("users").where("email", email).first();

        if (existingUser) {
            return { result: false, message: "Email already exists" };
        }
        await this.knex
            .insert({
                username: username,
                email: email,
                password: await hashPassword(password),
                role: role
            })
            .into("users")
            .returning("id");

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


