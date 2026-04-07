import status from "http-status";
import AppError from "../../errors/AppError.js";
import {
  CreateProjectPayload,
  UpdateProjectPayload,
} from "./project.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma, Project } from "@prisma/client";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  projectFilterableFields,
  projectSearchableFields,
} from "./project.constant.js";

const addNewProject = async (
  payload: CreateProjectPayload,
  adminId: string,
): Promise<Project> => {
  try {
    const { technologies } = payload;

    const newProject = await prisma.project.create({
      data: {
        title: payload.title,
        description: payload.description,
        images: payload.images,
        features: payload.features,
        projectUrl: payload.projectUrl,
        backendUrl: payload.backendUrl,
        frontendUrl: payload.frontendUrl,
        adminId,
      },
    });

    await prisma.projectTechnology.createMany({
      data: technologies.map((technologyId) => ({
        projectId: newProject.id,
        technologyId,
      })),
    });

    return newProject;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to add new project",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const getProjects = async (
  query: IQueryParams,
): Promise<QueryResult<Project>> => {
  const queryBuilder = new QueryBuilder<
    Project,
    Prisma.ProjectWhereInput,
    Prisma.ProjectInclude
  >(prisma.project, query, {
    searchableFields: projectSearchableFields,
    filterableFields: projectFilterableFields,
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
    .includes({})
    .execute();

  return result;
};

const getProjectById = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!project) {
      throw new AppError("Project not found", status.NOT_FOUND);
    }

    const updatedProject = await prisma.project.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    return updatedProject;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to get project",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const updateProjectById = async (
  id: string,
  payload: UpdateProjectPayload,
): Promise<Project> => {
  try {
    const existingProject = await prisma.project.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingProject) {
      throw new AppError("Project not found", status.NOT_FOUND);
    }

    const { technologies, ...projectData } = payload;

    const updatedProject = await prisma.project.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        ...projectData,
      },
    });

    if (technologies && technologies.length > 0) {
      await prisma.projectTechnology.deleteMany({
        where: {
          projectId: id,
        },
      });

      await prisma.projectTechnology.createMany({
        data: technologies.map((technologyId) => ({
          projectId: id,
          technologyId,
        })),
      });
    }

    return updatedProject;
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to update project",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const projectService = {
  addNewProject,
  getProjects,
  getProjectById,
  updateProjectById,
};
