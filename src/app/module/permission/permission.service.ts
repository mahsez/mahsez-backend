import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createPermissionIntoDB = async (req: Request) => {
  const { name, description } = req.body;

  const existingPermission = await prisma.permission.findUnique({
    where: { name },
  });

  if (existingPermission) {
    throw new Error("Permission with this name already exists");
  }

  const res = await prisma.permission.create({ data: { name, description } });
  return res;
};

const getPermissionsIntoDB = async () => {
  const res = await prisma.permission.findMany();
  return res;
};

export const PermissionService = {
  createPermissionIntoDB,
  getPermissionsIntoDB,
};
