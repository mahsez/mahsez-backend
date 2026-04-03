import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

// type CreateAdminInput = { email: string; name: string };

const createAdminIntoDB = async (req: Request) => {
  // const { email, name } = (await req.json()) as CreateAdminInput;
  const { email, name } = req.body;

  // if (email) {
  //   const existingUser = await prisma.user.findUnique({ where: { email } });
  //   if (existingUser) {
  //     throw new Error("User with this email already exists");
  //   }
  // }

  const res = await prisma.user.create({ data: { email, name } });
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
