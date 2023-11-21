import { Knex } from "knex";
import * as skillsData from "../data/json/skills.json";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("skills").del();

  try {
    const skills = skillsData.skills;

    // Insert skills into the 'skills' table
    await knex("skills").insert(skills);

    console.log("Skills seeded successfully");
  } catch (err) {
    console.error("Error seeding skills:", err.message);
  }
}
