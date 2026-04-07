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
    TechnologyType.LANGUAGE,
    TechnologyType.FRONTEND,
    TechnologyType.BACKEND,
    TechnologyType.DATABASE,
    TechnologyType.ORM,
    TechnologyType.DEVOPS,
    TechnologyType.CLOUD,
    TechnologyType.TOOL,
    TechnologyType.TESTING,
    TechnologyType.AUTH,
    TechnologyType.API,
    TechnologyType.MOBILE,
  ]),
});

const updateTechnologySchema = z
  .object({
    name: z
      .string("Name is required")
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name can't be more than 100 characters"),
    icon: z.url("Icon must be a valid URL"),
    description: z
      .string()
      .trim()
      .min(2, "Description must be at least 2 characters")
      .max(1000, "Description can't be more than 1000 characters"),
    type: z.enum([
      TechnologyType.LANGUAGE,
      TechnologyType.FRONTEND,
      TechnologyType.BACKEND,
      TechnologyType.DATABASE,
      TechnologyType.ORM,
      TechnologyType.DEVOPS,
      TechnologyType.CLOUD,
      TechnologyType.TOOL,
      TechnologyType.TESTING,
      TechnologyType.AUTH,
      TechnologyType.API,
      TechnologyType.MOBILE,
    ]),
  })
  .partial();

export const technologyValidation = {
  createTechnologySchema,
  updateTechnologySchema,
};
