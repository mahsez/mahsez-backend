import dotenv from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'

const envPath = path.resolve(process.cwd(), envFile)

dotenv.config({ path: envPath })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/mahsez',
}
