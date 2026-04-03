import type { Prisma } from "@/generated/prisma/client.js";

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): IGenericErrorResponse => {
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
