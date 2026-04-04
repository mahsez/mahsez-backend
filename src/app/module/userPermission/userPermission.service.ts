import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createUserPermissionIntoDB = async (req: Request) => {
  const { userId, permissionId } = req.body;

  const res = await prisma.userPermission.create({
    data: {
      userId,
      permissionId,
    },
  });

  return res;
};

export const UserPermissionService = {
  createUserPermissionIntoDB,
};
