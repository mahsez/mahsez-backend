/*
  Warnings:

  - You are about to drop the `UserRoleMap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRoleMap" DROP CONSTRAINT "UserRoleMap_userId_fkey";

-- DropTable
DROP TABLE "UserRoleMap";
