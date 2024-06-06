/*
  Warnings:

  - You are about to alter the column `nummer` on the `tblwoonplaats` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `tblwoonplaats` MODIFY `nummer` VARCHAR(255) NOT NULL;
