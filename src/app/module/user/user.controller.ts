import httpStatus from 'http-status';
import SendResponse from '@/shared/sendResponse.js';
import { UserService } from './user.service.js';
import type { Request, Response } from 'express';
import catchAsync from '@/shared/catchAsync.js';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const restult = await UserService.createAdminIntoDB(req);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: restult,
  });
});

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const restult = await UserService.getAdminIntoDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get Admin successfully',
    data: restult,
  });
});

export const UserController = {
  createAdmin,
  getAdmin,
};
