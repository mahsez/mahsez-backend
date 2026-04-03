import config from "@/config/index.js";
import type { ErrorRequestHandler } from "express";
import handleClientError from "../errors/handleClientError.js";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError.js";
import ApiError from "../errors/ApiError.js";
import handleValidationError from "../errors/handleValidationError.js";
import { Prisma } from "@/generated/prisma/client.js";

type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    if (error.isOperational) {
      message = error.message;
      errorMessages = [{ path: "", message: error.message }];
    } else {
      message = "Something went wrong";
      errorMessages = [];
    }
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [{ path: "", message }];
  }

  // Production response (clean)
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: errorMessages || [],
    ...(config.env !== "production" && { stack: error?.stack }),
  });
};

export default globalErrorHandler;
