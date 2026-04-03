import config from "@/config/index.js";
import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: config.dbUrl,
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
