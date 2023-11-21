import { Knex } from "knex";
import { Users } from "../models";
import { checkPassword, hashPassword } from "../hash";
import { LoginSchemaT } from "../schemas/auth.schema";
import { BadRequestError } from "../utils/error";

export default class AuthService {
  constructor(private knex: Knex) {}

  async login({ email, password }: LoginSchemaT) {
    const user = await this.knex<Users>("users").where("email", email).first();

    if (
      !user ||
      !(await checkPassword({
        plainPassword: password,
        hashedPassword: user.password,
      }))
    ) {
      throw new BadRequestError("invalid email/password");
    }
    return user;
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
        role: role,
      })
      .into("users")
      .returning("id");

    return { result: true };
  }
}
