import express, { Application, Request, Response } from "express";
import status from "http-status";
import { indexRouter } from "./routes/index.js";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(status.OK).json({
    success: true,
    message: "Welcome to my Portfolio Server",
  });
});

app.use("/api/v1", indexRouter);

export default app;
