import express, { Application, Request, Response } from "express";
import status from "http-status";
import { indexRouter } from "./routes/index.js";
import globalErrorHandler from "./app/middlewares/error-middleware.js";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(status.OK).json({
    success: true,
    message: "Welcome to my Portfolio Server",
  });
});

app.use("/api/v1", indexRouter);

app.use((req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
    route: req.originalUrl,
  });
});

app.use(globalErrorHandler);

export default app;
