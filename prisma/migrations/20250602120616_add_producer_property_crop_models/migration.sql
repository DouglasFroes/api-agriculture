/*
  Warnings:

  - You are about to drop the `Culture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Planting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Producer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Safra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_cultureId_fkey";

-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_safraId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_producerId_fkey";

-- DropTable
DROP TABLE "Culture";

-- DropTable
DROP TABLE "Planting";

-- DropTable
DROP TABLE "Producer";

-- DropTable
DROP TABLE "Property";

-- DropTable
DROP TABLE "Safra";

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" INTEGER NOT NULL,
    "arableArea" INTEGER NOT NULL,
    "vegetationArea" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "producerId" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_cpf_cnpj_key" ON "producers"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
