import { Router } from "express";
import { projectController } from "./project.controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import { AdminRole } from "@prisma/client";
import {
  paramsIdSchema,
  validateRequestBody,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";
import { projectValidation } from "./project.validation.js";

const router: Router = Router();

router.post(
  "/",
  authMiddleware(AdminRole.SUPER_ADMIN, AdminRole.ADMIN),
  validateRequestBody(projectValidation.createProjectSchema),
  projectController.addNewProject,
);

router.get("/", projectController.getProjects);

router.get(
  "/:id",
  validateRequestParams(paramsIdSchema),
  projectController.getProjectById,
);

router.patch(
  "/:id",
  authMiddleware(AdminRole.SUPER_ADMIN, AdminRole.ADMIN),
  validateRequestParams(paramsIdSchema),
  validateRequestBody(projectValidation.updateProjectSchema),
  projectController.updateProjectById,
);

export { router as projectRouter };
