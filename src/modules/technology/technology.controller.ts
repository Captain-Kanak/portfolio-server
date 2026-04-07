import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { technologyService } from "./technology.service.js";
import status from "http-status";
import { DecodedToken } from "../../types/auth.type.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";

const addNewTechnology = catchAsync(async (req: Request, res: Response) => {
  const payload = {
    ...req.body,
    icon: req.file?.path,
  };
  const { id } = req.admin as DecodedToken;

  const result = await technologyService.addNewTechnology(payload, id);

  return res.status(status.OK).json({
    success: true,
    message: "Technology added successfully",
    data: result,
  });
});

const getTechnologies = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await technologyService.getTechnologies(query as IQueryParams);

  return res.status(status.OK).json({
    success: true,
    message: "Technologies fetched successfully",
    data: result,
  });
});

const getTechnologyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await technologyService.getTechnologyById(id as string);

  return res.status(status.OK).json({
    success: true,
    message: "Technology fetched successfully",
    data: result,
  });
});

const updateTechnologyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = {
    ...req.body,
    icon: req.file?.path,
  };

  const result = await technologyService.updateTechnologyById(
    id as string,
    payload,
  );

  return res.status(status.OK).json({
    success: true,
    message: "Technology updated successfully",
    data: result,
  });
});

const deleteTechnologyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await technologyService.deleteTechnologyById(id as string);

  return res.status(status.OK).json({
    success: true,
    message: "Technology deleted successfully",
    data: result,
  });
});

export const technologyController = {
  addNewTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnologyById,
  deleteTechnologyById,
};
