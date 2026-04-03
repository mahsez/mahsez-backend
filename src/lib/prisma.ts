import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  errorFormat: "minimal",
} as any);

export default prisma;
