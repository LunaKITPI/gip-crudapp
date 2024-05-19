/*
  Warnings:

  - You are about to drop the column `huis_nummer` on the `tblleerlingen` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `tblleerlingen` table. All the data in the column will be lost.
  - You are about to drop the column `straat` on the `tblleerlingen` table. All the data in the column will be lost.
  - Added the required column `woon_id` to the `tblleerlingen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `woon_id` to the `tblouders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblleerlingen` DROP COLUMN `huis_nummer`,
    DROP COLUMN `postcode`,
    DROP COLUMN `straat`,
    ADD COLUMN `woon_id` BIGINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `tblouders` ADD COLUMN `woon_id` BIGINT UNSIGNED NOT NULL;
