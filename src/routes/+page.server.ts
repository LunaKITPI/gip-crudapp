import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
  return { 
    seats : {
    available : await prisma.tblzit_plaatsen.findMany({
      where: {
        bezet: false 
      },
      }),
    unavailable : await prisma.tblzit_plaatsen.findMany({
      where: {
        bezet: true 
      },
    }),
    }
};
}
