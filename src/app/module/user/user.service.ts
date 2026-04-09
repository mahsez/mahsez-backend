import { UserRole } from "@/generated/prisma/browser.js";
import { hashedPassword } from "@/helpers/auth/hashPassword.js";
import { prisma } from "@/lib/prisma.js";
import { idGenerator } from "@/utils/idGenerator.js";
import type { Request } from "express";

const createAdminIntoDB = async (req: Request) => {
  const { email, password, userId, adminProfile } = req.body;

  return await prisma.$transaction(async (tx) => {
    // 🔍 1. Check existing user
    const isUserExist = await tx.user.findFirst({
      where: { email },
    });

    if (isUserExist) {
      throw new Error("User already exists with this email");
    }

    // 🔐 2. Hash password
    const hashPassword = await hashedPassword(req.body.password);

    // 👤 3. Create User
    const user = await tx.user.create({
      data: {
        email,
        password: hashPassword,
        userId: idGenerator.nextId(),
        role: "ADMIN", // 🔥 force role
      },
    });

    // 🧠 4. Create Admin Profile
    const profile = await tx.adminProfile.create({
      data: {
        userRef: user.id,
        fullName: adminProfile.fullName,
        phone: adminProfile.phone,
        accessLevel: adminProfile.accessLevel,
        department: adminProfile.department,
      },
    });

    // 🎯 5. Assign permissions based on accessLevel (optional advanced)
    // উদাহরণ:
    /*
    if (adminProfile.accessLevel === "SUPER") {
      const allPermissions = await tx.permission.findMany();
      await tx.userPermission.createMany({
        data: allPermissions.map((p) => ({
          userId: user.id,
          permissionId: p.id,
        })),
      });
    }
    */

    return {
      user,
      profile,
    };
  });
};

const getAdminIntoDB = async () => {
  const res = prisma.user.findMany();
  return res;
};

export const UserService = {
  createAdminIntoDB,
  getAdminIntoDB,
};
