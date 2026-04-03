import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://postgres.gwelhvcczpsvinturovw:Mahsez.3692@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres",
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
