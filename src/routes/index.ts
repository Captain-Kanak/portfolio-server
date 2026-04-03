import { Router } from "express";
import { authRouter } from "../app/modules/auth/auth.route.js";

const router: Router = Router();

router.use("/auth", authRouter);

// router.use("/technologies");

// router.use("/projects");

// router.use("/feedbacks");

// router.use("/messages");

export { router as indexRouter };
