import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  accelerateUrl: "file:./prisma/accelerate.db",
  errorFormat: "minimal",
} as any);

export default prisma;
