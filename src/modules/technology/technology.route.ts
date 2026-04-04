import { Router } from "express";
import { technologyController } from "./technology.controller.js";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { technologyValidation } from "./technology.validation.js";
import authMiddleware from "../../middlewares/auth-middleware.js";
import { AdminRole } from "@prisma/client";
import { multerUpload } from "../../config/multer.js";

const router: Router = Router();

router.post(
  "/",
  authMiddleware(AdminRole.SUPER_ADMIN, AdminRole.ADMIN),
  multerUpload.single("file"),
  validateRequestBody(technologyValidation.createTechnologySchema),
  technologyController.addNewTechnology,
);

router.get("/", technologyController.getTechnologies);

export { router as technologyRouter };
