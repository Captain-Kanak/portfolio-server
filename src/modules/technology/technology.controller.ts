import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { technologyService } from "./technology.service.js";
import status from "http-status";
import { DecodedToken } from "../../types/auth.type.js";

const addNewTechnology = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const { id } = req.admin as DecodedToken;

  const result = await technologyService.addNewTechnology(payload, id);

  return res.status(status.OK).json({
    success: true,
    message: "Technology added successfully",
    data: result,
  });
});

export const technologyController = {
  addNewTechnology,
};
