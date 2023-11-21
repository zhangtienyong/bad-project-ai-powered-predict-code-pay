import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export type LoginSchemaT = z.infer<typeof LoginSchema>;
