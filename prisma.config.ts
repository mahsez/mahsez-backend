import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // url: process.env.DATABASE_URL as string,

    //  Connect to Supabase via connection pooling
    url: 'postgresql://postgres.nhdgwtkbjtkhgmafllpj:Mahsez.3692@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true',

    // Direct connection to the database. Used for migrations
    // url: 'postgresql://postgres.nhdgwtkbjtkhgmafllpj:Mahsez.3692@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres',
  },
});
