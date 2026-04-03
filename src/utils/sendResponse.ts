import type { Response } from 'express';

type TMeta = {
  limit: number;
  total: number;
  page: number;
  totalPage: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T | null;
};

const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default SendResponse;
