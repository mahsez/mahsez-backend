import config from '@/config/index.js';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import handleClientError from '../errors/handleClientError.js';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError.js';
import ApiError from '../errors/ApiError.js';
import handleValidationError from '../errors/handleValidationError.js';

type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (error: any, req: Request, res: Response) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  // if (err instanceof Prisma.PrismaClientKnownRequestError) {
  //   const simplifiedError = handleClientError(err);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorMessages = simplifiedError.errorMessages;
  // } else if (err instanceof ZodError) {
  //   const simplifiedError = handleZodError(err);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorMessages = simplifiedError.errorMessages;
  // } else if (err instanceof Prisma.PrismaClientValidationError) {
  //   // ❗ fallback (developer mistake)
  //   statusCode = 500;
  //   message = 'Database validation error';
  // } else if (err instanceof ApiError) {
  //   statusCode = err.statusCode;
  //   message = err.message;
  //   errorMessages = [{ path: '', message: err.message }];
  // }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  // Production response (clean)
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources: errorMessages || [],
    ...(config.env !== 'production' && { stack: error?.stack }),
  });
};

export default globalErrorHandler;
