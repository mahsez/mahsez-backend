import ApiError from "@/app/errors/ApiError.js";
import { comparePassword } from "@/helpers/auth/comparePassword.js";
import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";
import httpStatus from "http-status";

const loginUserIntoDB = async (req: Request) => {
  const { email, password } = req.body;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // if (
  //   isUserExist.password &&
  //   !(await comparePassword(password, isUserExist.password))
  // ) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  // }

  const isMatch = await comparePassword(password, isUserExist.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
};

export const AuthService = {
  loginUserIntoDB,
};
