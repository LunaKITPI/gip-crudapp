/*
  Warnings:

  - Added the required column `zitplaats` to the `tblgasten` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblgasten` ADD COLUMN `zitplaats` VARCHAR(255) NOT NULL;
