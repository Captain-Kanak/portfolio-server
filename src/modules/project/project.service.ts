import status from "http-status";
import AppError from "../../errors/AppError.js";
import { CreateProjectPayload } from "./project.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Project } from "@prisma/client";

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

export const projectService = {
  addNewProject,
};
