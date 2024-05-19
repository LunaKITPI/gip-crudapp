/*
  Warnings:

  - The primary key for the `tblwoonplaats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postcode_id` on the `tblwoonplaats` table. All the data in the column will be lost.
  - You are about to drop the column `woonplaats` on the `tblwoonplaats` table. All the data in the column will be lost.
  - Added the required column `nummer` to the `tblwoonplaats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `tblwoonplaats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `straat` to the `tblwoonplaats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woon_id` to the `tblwoonplaats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblwoonplaats` DROP PRIMARY KEY,
    DROP COLUMN `postcode_id`,
    DROP COLUMN `woonplaats`,
    ADD COLUMN `nummer` BIGINT UNSIGNED NOT NULL,
    ADD COLUMN `postcode` VARCHAR(4) NOT NULL,
    ADD COLUMN `straat` VARCHAR(255) NOT NULL,
    ADD COLUMN `woon_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`woon_id`);
