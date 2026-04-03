import { Router } from "express";
import { authController } from "./auth.controller.js";

const router: Router = Router();

router.post("/login", authController.login);

// router.post("/create-admin");

// router.post("/reset-password");

export { router as authRouter };
