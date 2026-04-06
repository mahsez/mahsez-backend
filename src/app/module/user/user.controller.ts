import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";
import { UserService } from "./user.service.js";
import catchAsync from "@/utils/catchAsync.js";
import type { RequestHandler } from "express";

type TUserController = {
  createAdmin: RequestHandler;
  getAdmin: RequestHandler;
};

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.createAdminIntoDB(req);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const getAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserService.getAdminIntoDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

export const UserController: TUserController = {
  createAdmin,
  getAdmin,
};
