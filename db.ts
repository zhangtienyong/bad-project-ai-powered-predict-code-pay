import Knex from "knex";
import knexConfig from "./knexfile";

type NodeEnv = "development" | "staging" | "production";
const nodeEnv = (process.env.NODE_ENV ?? "development") as NodeEnv;

export const knex = Knex(knexConfig[nodeEnv]);
