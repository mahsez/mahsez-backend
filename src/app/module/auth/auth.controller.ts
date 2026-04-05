import catchAsync from "@/utils/catchAsync.js";
import type { RequestHandler } from "express";
import { AuthService } from "./auth.service.js";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";

type TAuthController = {
  userLogin: RequestHandler;
};

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDB(req);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController: TAuthController = {
  userLogin,
};
