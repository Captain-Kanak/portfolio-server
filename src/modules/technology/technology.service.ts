import status from "http-status";
import AppError from "../../errors/AppError.js";
import { CreateTechnologyPayload } from "./technology.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Technology } from "@prisma/client";

const addNewTechnology = async (
  payload: CreateTechnologyPayload,
  adminId: string,
): Promise<Technology> => {
  try {
    const newTechnology = await prisma.technology.create({
      data: {
        ...payload,
        adminId,
      },
    });

    return newTechnology;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to add new technology",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const technologyService = {
  addNewTechnology,
};
