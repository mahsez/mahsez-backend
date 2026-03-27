import { prisma } from '@/lib/prisma.js';
import type { Request } from 'express';

const createAdminIntoDB = async (req: Request) => {
  const adminData = req.body;
  const res = await prisma.user.create({
    data: {
      userId: adminData.userId,
      emails: adminData.email,
      name: adminData.name,
    },
  });
  // console.log(adminData, 'res');
  return res;
};

const getAdminIntoDB = async () => {
  const res = prisma.user.findMany();
  // console.log(res);
  console.log('ressss');
  // return res;
};

export const UserService = {
  createAdminIntoDB,
  getAdminIntoDB,
};
