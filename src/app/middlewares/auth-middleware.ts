import { AdminRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { tokenUtils } from "../../utils/token.js";

const authMiddleware = (...roles: AdminRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = tokenUtils.getTokenCookie(req, "auth_token");

      console.log(token);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authMiddleware;
