/*
  Warnings:

  - The primary key for the `Culture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Planting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Producer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `totalArea` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `arableArea` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `vegetationArea` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The primary key for the `Safra` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_cultureId_fkey";

-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_safraId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_producerId_fkey";

-- AlterTable
ALTER TABLE "Culture" DROP CONSTRAINT "Culture_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Culture_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Culture_id_seq";

-- AlterTable
ALTER TABLE "Planting" DROP CONSTRAINT "Planting_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "propertyId" SET DATA TYPE TEXT,
ALTER COLUMN "safraId" SET DATA TYPE TEXT,
ALTER COLUMN "cultureId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Planting_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Planting_id_seq";

-- AlterTable
ALTER TABLE "Producer" DROP CONSTRAINT "Producer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Producer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Producer_id_seq";

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "totalArea" SET DATA TYPE INTEGER,
ALTER COLUMN "arableArea" SET DATA TYPE INTEGER,
ALTER COLUMN "vegetationArea" SET DATA TYPE INTEGER,
ALTER COLUMN "producerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Property_id_seq";

-- AlterTable
ALTER TABLE "Safra" DROP CONSTRAINT "Safra_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Safra_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Safra_id_seq";

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planting" ADD CONSTRAINT "Planting_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planting" ADD CONSTRAINT "Planting_safraId_fkey" FOREIGN KEY ("safraId") REFERENCES "Safra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planting" ADD CONSTRAINT "Planting_cultureId_fkey" FOREIGN KEY ("cultureId") REFERENCES "Culture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
