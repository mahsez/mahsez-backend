import { PERMISSIONS } from "@/constants/permission.js";
import { prisma } from "@/lib/prisma.js";

const seedPermissions = async () => {
  try {
    console.log("🌱 Seeding permissions...");

    for (const name of PERMISSIONS) {
      await prisma.permission.upsert({
        where: { name },
        update: {}, // already থাকলে কিছু করবে না
        create: {
          name,
          description: `${name} permission`,
        },
      });
    }

    console.log("✅ Permissions seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding permissions:", error);
  }
};

export default seedPermissions;
