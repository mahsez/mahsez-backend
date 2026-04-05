import catchAsync from "@/utils/catchAsync.js";
import { RolePermissionService } from "./rolePermission.service.js";
import type { RequestHandler } from "express";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";

type TRolePermissionController = {
  createRolePermission: RequestHandler;
};

const createRolePermission = catchAsync(async (req, res) => {
  const result = await RolePermissionService.createRolePermissionIntoDB(req);
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role permission created successfully",
    data: result,
  });
});

export const RolePermissionController: TRolePermissionController = {
  createRolePermission,
};
