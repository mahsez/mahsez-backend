import ApiError from "@/app/errors/ApiError.js";
import config from "@/config/index.js";
import type { User } from "@/generated/prisma/client.js";
import { comparePassword } from "@/helpers/auth/comparePassword.js";
import { jwtHelpers } from "@/helpers/auth/jwtHelpers.js";
import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";
import httpStatus from "http-status";
import type { Secret, SignOptions } from "jsonwebtoken";

const loginUserIntoDB = async (req: Request) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (
    !user ||
    !user.password ||
    !(await comparePassword(password, user.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const checkUserStatus = (user: User) => {
    if (user.status === "BLOCKED") {
      throw new ApiError(403, "User is blocked");
    }

    if (user.status === "PENDING") {
      throw new ApiError(403, "User is not verified");
    }

    if (user.status === "DELETED" || user.isDeleted) {
      throw new ApiError(403, "User account is deleted");
    }
  };

  checkUserStatus(user);

  const accessToken = jwtHelpers.createToken(
    { userId: user.id, role: user.role, email: user.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as SignOptions["expiresIn"],
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: user.id },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_secret_expires_in as SignOptions["expiresIn"],
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUserIntoDB,
};
