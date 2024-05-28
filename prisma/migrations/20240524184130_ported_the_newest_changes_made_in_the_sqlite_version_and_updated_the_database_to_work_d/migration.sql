/*
  Warnings:

  - The primary key for the `tblleerlingen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `leerling_id` on the `tblleerlingen` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `VarChar(255)`.
  - Added the required column `auth_key` to the `tblleerlingen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woonplaats` to the `tblwoonplaats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblleerlingen` DROP PRIMARY KEY,
    ADD COLUMN `auth_key` VARCHAR(255) NOT NULL,
    MODIFY `leerling_id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`leerling_id`);

-- AlterTable
ALTER TABLE `tblwoonplaats` ADD COLUMN `busnummer` VARCHAR(10) NULL,
    ADD COLUMN `woonplaats` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `tblzit_plaatsen` ADD COLUMN `beziter_id` VARCHAR(191) NULL;
