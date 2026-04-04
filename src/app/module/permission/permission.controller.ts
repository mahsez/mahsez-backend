import type { Request, RequestHandler, Response } from "express";
import { PermissionService } from "./permission.service.js";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";
import catchAsync from "@/utils/catchAsync.js";

type TPermissionController = {
  createPermission: RequestHandler;
};

const createPermission: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PermissionService.createPermissionIntoDB(req);
    SendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Permission created successfully",
      data: result,
    });
  },
);

export const PermissionController: TPermissionController = {
  createPermission,
};
