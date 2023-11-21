import { Knex } from "knex";
import { Users } from "../models";
import { checkPassword, hashPassword } from "../hash";
import { LoginSchemaT } from "../schemas/auth.schema";

export default class AuthService {
  constructor(private knex: Knex) {}

  async login({ email, password }: LoginSchemaT) {
    try {
      const user = await this.knex<Users>("users").where("email", email).first();
      if (
        !user ||
        !(await checkPassword({
          plainPassword: password,
          hashedPassword: user.password,
        }))
      ) {
        return { result: false, message: "invalid email/password" };
      }
      return { result: true, user };
    } catch (error) {
      throw error;
    }
  }

  async signup(username: string, email: string, password: string, role: string) {
    try {
      const existingUser = await this.knex<Users>("users").where("email", email).first();

      if (existingUser) {
        return { result: false, message: "Email already exists" };
      }
      await this.knex
        .insert({
          username: username,
          email: email,
          password: await hashPassword(password),
          role: role,
        })
        .into("users")
        .returning("id");

      return { result: true };
    } catch (error) {
      throw error;
    }
  }
}
