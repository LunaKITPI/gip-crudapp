-- CreateTable
CREATE TABLE `tblklas` (
    `klascode_id` VARCHAR(255) NOT NULL,
    `klas_beschrijving` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`klascode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblleerlingen` (
    `leerling_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `voornaam` VARCHAR(255) NOT NULL,
    `straat` VARCHAR(255) NOT NULL,
    `huis_nummer` VARCHAR(255) NOT NULL,
    `postcode` BIGINT NOT NULL,
    `email` VARCHAR(255) NULL,
    `geslacht` VARCHAR(255) NOT NULL,
    `klas` VARCHAR(255) NOT NULL,
    `zitplaats` VARCHAR(255) NULL,
    `aantal_uitgenodigde` BIGINT NOT NULL,
    `schooljaar` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`leerling_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfamilie_groep` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `leerlingen_id` BIGINT NOT NULL,
    `ouders_id` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblouders` (
    `ouder_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(255) NOT NULL,
    `voornaam` VARCHAR(255) NOT NULL,
    `familie_id` BIGINT NOT NULL,
    `zitplaats` VARCHAR(255) NULL,

    PRIMARY KEY (`ouder_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblwoonplaats` (
    `postcode_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `woonplaats` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`postcode_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblzit_plaatsen` (
    `zitplaats_id` VARCHAR(255) NOT NULL,
    `bezet` BOOLEAN NOT NULL,
    `type` BIGINT NOT NULL,

    PRIMARY KEY (`zitplaats_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblzitplaats_type` (
    `type_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `beschrijving_type` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


