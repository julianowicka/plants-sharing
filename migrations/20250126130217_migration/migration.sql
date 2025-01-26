-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userPlantId_fkey";

-- DropForeignKey
ALTER TABLE "ExchangeOffer" DROP CONSTRAINT "ExchangeOffer_userPlantId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userPlantId_fkey" FOREIGN KEY ("userPlantId") REFERENCES "UserPlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeOffer" ADD CONSTRAINT "ExchangeOffer_userPlantId_fkey" FOREIGN KEY ("userPlantId") REFERENCES "UserPlant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
