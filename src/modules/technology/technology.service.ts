import status from "http-status";
import AppError from "../../errors/AppError.js";
import { CreateTechnologyPayload } from "./technology.interface.js";
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
      .execute();

    return result;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to get technologies",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const technologyService = {
  addNewTechnology,
  getTechnologies,
};
