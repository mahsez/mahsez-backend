import { z } from "zod";

const loginZodSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
