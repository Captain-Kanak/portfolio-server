import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { authValidation } from "./auth.validation.js";

const router: Router = Router();

router.post(
  "/login",
  validateRequestBody(authValidation.loginSchema),
  authController.login,
);

// router.post("/create-admin");

// router.post("/reset-password");

export { router as authRouter };
