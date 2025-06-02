/*
  Warnings:

  - You are about to drop the column `season` on the `crops` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crops" DROP COLUMN "season",
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 1;
