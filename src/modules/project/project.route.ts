import { Router } from "express";
import { projectController } from "./project.controller.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import { AdminRole } from "@prisma/client";

const router: Router = Router();

router.post(
  "/",
  authMiddleware(AdminRole.SUPER_ADMIN, AdminRole.ADMIN),
  projectController.addNewProject,
);

export { router as projectRouter };
