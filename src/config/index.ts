import dotenv from 'dotenv';
import path from 'path';

// choose env file
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';

// load env
dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

// helper function (validation)
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }

  return value;
};

const config = {
  env: getEnv('NODE_ENV', 'development'),
  port: Number(getEnv('PORT', '5000')), // ✅ number
  dbUri: getEnv('DATABASE_URL', 'mongodb://localhost:27017/mahsez'),
};

export default config;
