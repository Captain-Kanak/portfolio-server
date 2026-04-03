import { NextFunction, Request, Response } from "express";
import status from "http-status";
import * as z from "zod";
import { env } from "../config/env.js";
import AppError from "../errors/AppError.js";
import { ErrorSourceType } from "../interfaces/error.interface.js";
import { handleZodError } from "../errors/ZodError.js";

async function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let errorSources: ErrorSourceType[] = [];

  if (env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err instanceof z.ZodError) {
    const simplifiedZodErrors = handleZodError(err);

    statusCode = simplifiedZodErrors.statusCode;
    message = simplifiedZodErrors.message;
    errorSources = [...simplifiedZodErrors.errorSources];
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default globalErrorHandler;
