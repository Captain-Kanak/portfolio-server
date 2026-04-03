import { TechnologyType } from "@prisma/client";
import * as z from "zod";

const createTechnologySchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name can't be more than 100 characters"),
  icon: z.url("Icon must be a valid URL").optional(),
  description: z
    .string()
    .trim()
    .min(2, "Description must be at least 2 characters")
    .max(1000, "Description can't be more than 1000 characters")
    .optional(),
  type: z.enum([
    TechnologyType.BACKEND,
    TechnologyType.FRONTEND,
    TechnologyType.DATABASE,
    TechnologyType.PACKAGE,
  ]),
});

export const technologyValidation = {
  createTechnologySchema,
};
