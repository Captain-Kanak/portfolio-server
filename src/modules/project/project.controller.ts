import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import status from "http-status";
import { projectService } from "./project.service.js";
import { DecodedToken } from "../../types/auth.type.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";

const addNewProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.admin as DecodedToken;

  const result = await projectService.addNewProject(payload, id);

  return res.status(status.OK).json({
    success: true,
    message: "Project added successfully",
    data: result,
  });
});

const getProjects = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await projectService.getProjects(query as IQueryParams);

  return res.status(status.OK).json({
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await projectService.getProjectById(id as string);

  return res.status(status.OK).json({
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await projectService.updateProjectById(id as string, payload);

  return res.status(status.OK).json({
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

export const projectController = {
  addNewProject,
  getProjects,
  getProjectById,
  updateProjectById,
};
