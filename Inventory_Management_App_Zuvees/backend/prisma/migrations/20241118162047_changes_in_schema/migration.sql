/*
  Warnings:

  - You are about to drop the column `categoryId` on the `RawMaterial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "RawMaterial" DROP CONSTRAINT "RawMaterial_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- AlterTable
ALTER TABLE "RawMaterial" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "_RawMaterialToVariant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_VariantRawMaterials" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RawMaterialToVariant_AB_unique" ON "_RawMaterialToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_RawMaterialToVariant_B_index" ON "_RawMaterialToVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VariantRawMaterials_AB_unique" ON "_VariantRawMaterials"("A", "B");

-- CreateIndex
CREATE INDEX "_VariantRawMaterials_B_index" ON "_VariantRawMaterials"("B");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawMaterialToVariant" ADD CONSTRAINT "_RawMaterialToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "RawMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawMaterialToVariant" ADD CONSTRAINT "_RawMaterialToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VariantRawMaterials" ADD CONSTRAINT "_VariantRawMaterials_A_fkey" FOREIGN KEY ("A") REFERENCES "RawMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VariantRawMaterials" ADD CONSTRAINT "_VariantRawMaterials_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
