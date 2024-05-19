/*
  Warnings:

  - You are about to drop the column `familie_id` on the `tblouders` table. All the data in the column will be lost.
  - You are about to drop the `tblfamilie_groep` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `tblouders` DROP COLUMN `familie_id`;

-- DropTable
DROP TABLE `tblfamilie_groep`;
