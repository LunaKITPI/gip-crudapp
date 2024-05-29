-- CreateTable
CREATE TABLE `tblgasten` (
    `gast_id` BIGINT NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `voornaam` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `leerling_id` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`gast_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
