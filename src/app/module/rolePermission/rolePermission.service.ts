import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createRolePermissionIntoDB = async (req: Request) => {
  const { role, permissionId } = req.body;

  const res = await prisma.rolePermission.create({
    data: { role, permissionId },
  });
  return res;
};

export const RolePermissionService = {
  createRolePermissionIntoDB,
};
