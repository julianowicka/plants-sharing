/*
  Warnings:

  - Made the column `userId` on table `UserPlant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `plantId` on table `UserPlant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserPlant" DROP CONSTRAINT "UserPlant_plantId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlant" DROP CONSTRAINT "UserPlant_userId_fkey";

-- AlterTable
ALTER TABLE "UserPlant" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "plantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPlant" ADD CONSTRAINT "UserPlant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlant" ADD CONSTRAINT "UserPlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
