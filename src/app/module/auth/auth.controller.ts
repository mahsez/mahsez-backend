import catchAsync from "@/utils/catchAsync.js";
import type { RequestHandler } from "express";
import { AuthService } from "./auth.service.js";
import SendResponse from "@/utils/sendResponse.js";
import httpStatus from "http-status";

type TAuthController = {
  userLogin: RequestHandler;
  createRefreshToken: RequestHandler;
};

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDB(req);

  const { accessToken, refreshToken } = result;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    // maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const createRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.createRefreshTokenForLogin(refreshToken);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create refresh token successfully",
    data: result,
  });
});

export const AuthController: TAuthController = {
  userLogin,
  createRefreshToken,
};
