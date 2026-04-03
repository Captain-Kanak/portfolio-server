import * as z from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password can't be more than 32 characters"),
});

export const authValidation = {
  loginSchema,
};
