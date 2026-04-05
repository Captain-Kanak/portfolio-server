import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import status from "http-status";
import { projectService } from "./project.service.js";
import { DecodedToken } from "../../types/auth.type.js";

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

export const projectController = {
  addNewProject,
};
