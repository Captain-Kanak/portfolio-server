import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catch-async.js";
import { authService } from "./auth.service.js";
import status from "http-status";

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  const { token } = result;

  return res.status(status.OK).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  login,
};
