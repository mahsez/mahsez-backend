/*
  Warnings:

  - Changed the type of `accessLevel` on the `AdminProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `department` to the `AdminProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminAccessLevel" AS ENUM ('SUPER', 'MANAGER', 'SUPPORT', 'FINANCE', 'HR');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('MANAGEMENT', 'FINANCE', 'OPERATIONS', 'LOGISTICS', 'TECH', 'SUPPORT', 'MARKETING', 'SELLER_MANAGEMENT');

-- AlterTable
ALTER TABLE "AdminProfile" DROP COLUMN "accessLevel",
ADD COLUMN     "accessLevel" "AdminAccessLevel" NOT NULL,
DROP COLUMN "department",
ADD COLUMN     "department" "Department" NOT NULL;
