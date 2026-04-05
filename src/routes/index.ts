import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route.js";
import { technologyRouter } from "../modules/technology/technology.route.js";
import { projectRouter } from "../modules/project/project.route.js";

const router: Router = Router();

router.use("/auth", authRouter);

router.use("/technologies", technologyRouter);

router.use("/projects", projectRouter);

// router.use("/feedbacks");

// router.use("/messages");

export { router as indexRouter };
