import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createAdminIntoDB = async (req: Request) => {
  // const { email, name } = req.body;

  if (req?.body?.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
  }

  const res = await prisma.user.create({ data: req.body });
  return res;
};

const getAdminIntoDB = async () => {
  const res = prisma.user.findMany();
  // console.log(res);
  console.log("ressss");
  return res;
};

export const UserService = {
  createAdminIntoDB,
  getAdminIntoDB,
};
