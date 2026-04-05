import { UserRole } from "@/generated/prisma/browser.js";
import { hashedPassword } from "@/helpers/auth/hashPassword.js";
import { prisma } from "@/lib/prisma.js";
import type { Request } from "express";

const createAdminIntoDB = async (req: Request) => {
  const { email, name, password } = req.body;

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
  }

  const hashPassword = await hashedPassword(req.body.password);

  const res = await prisma.user.create({
    data: { name, email, password: hashPassword, role: UserRole.ADMIN },
  });
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
