import catchAsync from "@/utils/catchAsync.js";
import type { Request, RequestHandler } from "express";
import { UserPermissionService } from "./userPermission.service.js";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";

type TUserPermissionController = {
  createUserPermission: RequestHandler;
};

const createUserPermission = catchAsync(async (req, res) => {
  const result = await UserPermissionService.createUserPermissionIntoDB(req);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User permission created successfully`,
    data: result,
  });
});

export const UserPermissionController: TUserPermissionController = {
  createUserPermission,
};
