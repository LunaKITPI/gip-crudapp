
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
  return { tables: {
      klassen : await prisma.tblklas.findMany(),
      leerlingen : await prisma.tblleerlingen.findMany(),
      ouders : await prisma.tblouders.findMany(),
      woonplaats : await prisma.tblwoonplaats.findMany(),
      zit_plaatsen : await prisma.tblzit_plaatsen.findMany(),
      zit_plaats_type : await prisma.tblzitplaats_type.findMany(),
    }
  }
}
