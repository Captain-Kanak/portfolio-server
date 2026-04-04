import { AdminRole, AdminStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { tokenUtils } from "../utils/token.js";
import AppError from "../errors/AppError.js";
import status from "http-status";

const authMiddleware = (...roles: AdminRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = tokenUtils.getTokenCookie(req, "auth_token");

      if (!token) {
        throw new AppError(
          "Unauthorized: Token not found",
          status.UNAUTHORIZED,
        );
      }

      const decodedToken = tokenUtils.verifyToken(token);

      if (
        decodedToken.status !== AdminStatus.ACTIVE ||
        decodedToken.isDeleted
      ) {
        throw new AppError("Unauthorized: Inactive user", status.UNAUTHORIZED);
      }

      if (roles.length > 0 && !roles.includes(decodedToken.role)) {
        throw new AppError("Unauthorized: Access denied", status.UNAUTHORIZED);
      }

      req.admin = decodedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authMiddleware;
