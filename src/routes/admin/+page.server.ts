import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { PageServerLoad, Actions } from './$types';
import { writeFile } from 'fs/promises';
import csv from 'csv-parser';
import fs from 'fs';
import { request } from "http";
import { password } from '$lib/server/psswd'

export const load: PageServerLoad = async () => {
  return { tables: {
    // all mijn tabellen
      klassen : await prisma.tblklas.findMany(),
      leerlingen : await prisma.tblleerlingen.findMany(),
      ouders : await prisma.tblouders.findMany(),
      woonplaats : await prisma.tblwoonplaats.findMany(),
      zit_plaatsen : await prisma.tblzit_plaatsen.findMany(),
      zit_plaats_type : await prisma.tblzitplaats_type.findMany(),
      passwd : password
    }
  }
}
// actions -> things forms call
export const actions : Actions = {
  // read file action die ik gebruik voor het importen van csv bestanden
  ReadFile: async ({ request }) => {
    const data = await request.formData();
    const file = data.get("file");
    try {
    const filePath = process.cwd() + '/files' + '/LLN.csv';
    await writeFile(String(filePath), await file?.text());
    // here goes the csv parsing
    const results = []
      fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {

        results.forEach( async (student) => {
      let WI = 1;
      await prisma.tblleerlingen.create({
        data : {
          leerling_id : Number(student.Nummer),
          naam : student.Naam,
          voornaam : student.Voornaam,
          woon_id : WI,
          email : student[ 'E-mailadres' ],
          geslacht : student.Geslacht,
          klas : student[ 'Unieke klas- of groepscode' ],
          aantal_uitgenodigde : 0,
          schooljaar : "2023-2024",
        }
      });
            WI += 1;
    })
    // Output: Array of objects, each representing a row in the CSV
  });
    return { success: true }
    } catch(Err) {
      console.error(Err);
    }
  },

}
