import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { authService } from "./auth.service.js";
import status from "http-status";
import { tokenUtils } from "../../utils/token.js";

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.login(payload);
  const { token } = result;

  tokenUtils.setTokenCookie(res, token);

  return res.status(status.OK).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  login,
};
