import * as zod from "zod";

const createProjectSchema = zod.object({
  title: zod.string().min(2).max(100),
  description: zod.string().min(2).max(1000),
  images: zod.array(zod.url()).min(1).optional(),
  features: zod.array(zod.string()).min(1),
  projectUrl: zod.url(),
  backendUrl: zod.url(),
  frontendUrl: zod.url(),
  technologies: zod.array(zod.uuid()).min(1),
});

export const projectValidation = {
  createProjectSchema,
};
