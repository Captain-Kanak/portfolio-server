import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma.js";
import AppError from "../../errors/AppError.js";
import status from "http-status";
import { tokenUtils } from "../../../utils/token.js";
import { Admin } from "@prisma/client";

const login = async (
  email: string,
  password: string,
): Promise<{ token: string; admin: Admin }> => {
  try {
    const isAdminExists = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!isAdminExists) {
      throw new AppError("Admin not found", status.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isAdminExists.password,
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid password", status.UNAUTHORIZED);
    }

    const token = tokenUtils.getToken({
      id: isAdminExists.id,
      name: isAdminExists.name,
      email: isAdminExists.email,
      role: isAdminExists.role,
      status: isAdminExists.status,
      isDeleted: isAdminExists.isDeleted,
    });

    return {
      token,
      admin: isAdminExists,
    };
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to login",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const authService = {
  login,
};
