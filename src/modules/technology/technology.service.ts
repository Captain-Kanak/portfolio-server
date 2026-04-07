import status from "http-status";
import AppError from "../../errors/AppError.js";
import {
  CreateTechnologyPayload,
  UpdateTechnologyPayload,
} from "./technology.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma, Technology } from "@prisma/client";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  technologyFilterableFields,
  technologySearchableFields,
} from "./technology.constant.js";

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

const getTechnologies = async (
  query: IQueryParams,
): Promise<QueryResult<Technology>> => {
  try {
    const queryBuilder = new QueryBuilder<
      Technology,
      Prisma.TechnologyWhereInput,
      Prisma.TechnologyInclude
    >(prisma.technology, query, {
      searchableFields: technologySearchableFields,
      filterableFields: technologyFilterableFields,
    });

    const result = await queryBuilder
      .paginate()
      .sort()
      .where({
        isDeleted: false,
      })
      .search()
      .filter()
      .select()
      .includes({
        _count: true,
      })
      .execute();

    return result;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to get technologies",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const getTechnologyById = async (id: string): Promise<Technology> => {
  try {
    const technology = await prisma.technology.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!technology) {
      throw new AppError("Technology not found", status.NOT_FOUND);
    }

    return technology;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to get technology by ID",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const updateTechnologyById = async (
  id: string,
  payload: UpdateTechnologyPayload,
): Promise<Technology> => {
  try {
    const existingTechnology = await prisma.technology.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingTechnology) {
      throw new AppError("Technology not found", status.NOT_FOUND);
    }

    const updatedTechnology = await prisma.technology.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });

    return updatedTechnology;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to update technology",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const deleteTechnologyById = async (id: string): Promise<Technology> => {
  try {
    const existingTechnology = await prisma.technology.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingTechnology) {
      throw new AppError("Technology not found", status.NOT_FOUND);
    }

    const deletedTechnology = await prisma.technology.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return deletedTechnology;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to delete technology",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const technologyService = {
  addNewTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnologyById,
  deleteTechnologyById,
};
