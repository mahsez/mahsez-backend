import { ZodError } from 'zod';
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  // const errorss: IGenericErrorMessage[] = error.issues.map((issue) => {
  //   return {
  //     path: issue?.path[issue.path.length - 1],
  //     message: issue?.message,
  //   };
  // });

  // const errors: IGenericErrorMessage[] = error.issues.map((issue) => ({
  //   path: issue.path.length ? issue.path[issue.path.length - 1] : 'unknown',
  //   message: issue.message,
  // }));

  const errors: IGenericErrorMessage[] = error.issues.map((issue) => ({
    path: issue.path.join('.') || 'root',
    field: issue.path.at(-1) ?? 'unknown', //// Pro Hybrid Approach
    message: issue.message,
  }));

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
