/*
  Warnings:

  - A unique constraint covering the columns `[agentId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "agentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Room_agentId_key" ON "Room"("agentId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
