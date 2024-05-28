// imports die ik gebruikte heb :
// pageservload & actions voor functies en variabelen en te delen met de webpagina
// writefile files maken en schrijven
// csv om csv bestanden te lezen
// fs voor actes in verband met het file systeem
// password is een variable in een extern bestand
// prisma onze ORM gedifinieert in een extern bestand
// fail om errors te returnen ( ga ik mogelijks niet in de webpagina gebruiken )
import type { PageServerLoad, Actions } from './$types';
import { writeFile } from 'fs/promises';
import csv from 'csv-parser';
import fs from 'fs';
import { password } from '$lib/server/psswd'
import {prisma} from '$lib/server/prisma'
import { fail } from '@sveltejs/kit';
import { request } from 'http';
import { type } from 'os';

let errMsg = "" // error message die we delen met webpagina
let crudErr = ""
export const load: PageServerLoad = async () => {
  return { tables: {
    // all mijn tabellen + password & error message
      klassen : await prisma.tblklas.findMany(),
      leerlingen : await prisma.tblleerlingen.findMany(),
      woonplaats : await prisma.tblwoonplaats.findMany(),
      zit_plaatsen : await prisma.tblzit_plaatsen.findMany(),
      zit_plaats_type : await prisma.tblzitplaats_type.findMany(),
      passwd : password, // NOTE dit is NIET de veiligste manier, meestal gebruik je een externe authenticatie service ( zoals oAuth ) maar ik heb het er niet ingestoken omdat ik er geen ervaring mee heb
      errMsg : errMsg,
      crudErr : crudErr,
    }
  }
}
// een functie om een wilikeurige string te maken voor studenten Auth_keys, de lange string in de 'charset' param is een lijst van alle characters dat the functie mag gebruiken
function generateRandomString(length: number, charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+;:/?.>,<'): string {
    let result = '';
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) { // een loop die elke keer een willikeurig character neemt en plakt aan onze string, length -> ingegeven param -> bepaalt hoevaak we herhalen
        result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// acties zijn functies die we gebruiken als antwoord op een form die ingedient word
export const actions : Actions = {
  // 'ReadFile' id de functie die ons csv bestand leest en invoegd in ons database
  ReadFile: async ({ request }) => {
    const data = await request.formData(); // we halen hier de form data
    const file = data.get("file"); // hier halen we de file die we indiende in ons form op
          const students = await prisma.tblleerlingen.findMany(); // ondertussen halen we alle studenten van onze db op en slaan we deze op
            const data_max = await prisma.tblleerlingen.aggregate({ // zoek de hoogste woonplaats id, dit doen we omdat we simpleweg een autoincrement systeem gebruiken voor woonplaats_id
                                                                    // vanuit die waarde starten we met omhoog tellen voor de woonid in te vullen in tblleerlingen & tblwoonplaatsen
                                                                    // deze gebruiken we late ( 30 lijnen hieronder )
              _max: {
                woon_id: true
              }
            })

    try {
    const filePath = process.cwd() + '/files' + '/LLN.csv'; // hier maken we het pad naar waar wij onze csv gaan opslaan ( in de poject root -> /files/LLN.csv )
    await writeFile(String(filePath), await file?.text()); // hier schrijven dit bestand weg naar het pad die we de bovenstaande lijn maakte

      // hier starten we met het lezen van onze csv bestand
    const results = [] // hier slaan we elke csv 'record' in op in array, elke individueel record zal opgeslagen worden als een object
      fs.createReadStream(filePath) // hier beginnen we met het lezen van ons csv bestand
      .pipe(csv()) // -> csv parser
      .on('data', (data) => results.push(data)) // hier duwen we de gelezen data ( onze objecten ) in onze array
      .on('end', () => { // hiet komt alles wat we doen als we klaar zijn met het lezen van de bestanden

        let valid = true; // we maken een waarde die dicteert of de ingegeven data acceptable is, die is standaart 'waar'
        results.forEach((student) => { // itereren over elke resultaat ( csv record als object ) waardbij huidige object 'student' word
          students.forEach((existing_student) => {
            if ( student.Nummer === existing_student.leerling_id ) { // we checken of de leerling id in het csv bestand all bestaad in onze data base
              errMsg = "1 ( of meer ) van de leerlingen hun nummer is all in de data base : " + student.Nummer; // we maken een error message die antoont bij welke record het fout liept ( word getoont op de pagina )
              valid = false; // het is niet valide
              return fail(500, { msg : "id inside the csv already exists"}); // returnen een error ( voor als we dit willen gebruiken )
            }
          })
        })
        if (valid) { // als het resultaat nogsteeds valide is doen we het volgende :

        let highest = 0; // maken de hoogste waarde als standaart 0
          if (data_max._max.woon_id === null) { // als we geen waarde in onze statistische query ( en onze db dus leeg is ) terug vinden gaan we door zoals gewonlijk
          } else {
            highest = data_max._max.woon_id; // als we well iets vinden zetten we onze max waarde = de gevonde waarde
          }
        let current = highest; // hier maken we een andere variabel, 1 word gebruikt voor het bijhouden van woon_id in tblleerlingen en de andere word gebruikt voor het bijhouden van woon_id in tblwoonplaats
        results.forEach( async (student) => {
        highest += 1;
      await prisma.tblleerlingen.create({
        data : {
          leerling_id : student.Nummer, // student -> huidig object in de iteratie
          naam : student.Naam,
          voornaam : student.Voornaam,
          woon_id : highest,
          auth_key : generateRandomString(9), // een random authKey aanmaken
          email : student[ 'E-mailadres' ],
          geslacht : student.Geslacht,
          klas : student[ 'Unieke klas- of groepscode' ],
          aantal_uitgenodigde : 0, // # uitgenodigde is standaart = 0
          schooljaar : "2023-2024", // we gaan ervan uit dat iedereen die geimport word van het huidig schooljaar komt
        }
      });
    })
        results.forEach( async (student) => {
          current += 1;
        await prisma.tblwoonplaats.create({
            data : {
              woon_id : current, // current als primaire sleutel, all de rest komt van ons object
              straat : student.Straat,
              nummer : student.Huisnummer,
              postcode : student.Postcode,
              woonplaats : student.Woonplaats,
              busnummer : student.Busnummer,
            }
          })
        } )
        }
  });
    return { success: true } // de functie afsluiten met een 'succes' signaal
    } catch(Err) {
      console.error(Err); // als er iets loopt printen we de error naar de node.js console
    }
  },

  // hier komen een lijst van queries, ik ga alleen de eerste paar overlopen aangezien de meeste exact hetzelfde werken
  verwijder_llr : async ({ url }) => {
    const id = url.searchParams.get("id")
    try {
    await prisma.tblleerlingen.delete({
        where : {
          leerling_id : id,
        }
    })
    } catch (err) {
      console.error(err);
    }
  },
  update_llr : async ({ request, url }) => {
    const data = await request.formData();
    const current_id = url.searchParams.get("current_id");
    const id = data.get("id");
    const naam = data.get("naam");
    const voornaam = data.get("voornaam");
    const woonid = data.get("woonid");
    const authkey = data.get("authkey");
    const email = data.get("email");
    const geslacht = data.get("gesclacht");
    const klas = data.get("klas");
    const zitplaats = data.get("zitplaats");
    const aantal = data.get("aantal");
    const schooljaar = data.get("schooljaar");
    const db = await prisma.tblleerlingen.findMany({
      where : {
        leerling_id : id,
      },
    });
    if (db.length === 0) {
      await prisma.tblleerlingen.update({
        where : {
          leerling_id : current_id,
        },
        data : {
          leerling_id : id,
          naam : naam,
          voornaam : voornaam,
          auth_key : authkey,
          woon_id : Number(woonid),
          email : email,
          geslacht : geslacht,
          klas : klas,
          zitplaats : zitplaats, 
          aantal_uitgenodigde : Number(aantal),
          schooljaar : schooljaar,
        },
      })
    } else if ( current_id === id) {
      await prisma.tblleerlingen.update({
        where : {
          leerling_id : current_id,
        },
        data : {
          naam : naam,
          voornaam : voornaam,
          auth_key : authkey,
          woon_id : Number(woonid),
          email : email,
          geslacht : geslacht,
          klas : klas,
          zitplaats : zitplaats, 
          aantal_uitgenodigde : Number(aantal),
          schooljaar : schooljaar,
        },
      })
    } else {
      crudErr = "dit ID bestaad all in uw database";
      return fail(500, {msg : "dit Id bestaad all in uw database"})
    }
    },
  nieuwe_llr : async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const naam = data.get("naam");
    const voornaam = data.get("voornaam");
    const woonid = data.get("woonid");
    const authkey = data.get("authkey");
    const email = data.get("email");
    const geslacht = data.get("gesclacht");
    const klas = data.get("klas");
    const zitplaats = data.get("zitplaats");
    const aantal = data.get("aantal");
    const schooljaar = data.get("schooljaar");
    const db = await prisma.tblleerlingen.findMany({
      where : {
        leerling_id : id,
      },
    });


    if ( db.length === 0) {
      console.log("creating mf");
      await prisma.tblleerlingen.create({
        data : {
          leerling_id : id,
          naam : naam,
          voornaam : voornaam,
          auth_key : authkey,
          woon_id : Number(woonid),
          email : email,
          geslacht : geslacht,
          klas : klas,
          zitplaats : zitplaats, 
          aantal_uitgenodigde : Number(aantal),
          schooljaar : schooljaar,
        }
      })
    } else {
      crudErr = "deze primaire sleutel bestaat all in de database";
      return fail(500, { msg : "deze primaite sleutel bestaat all in de database"});
    }
  },
  verwijder_klas : async ({ url }) => {
    const id = url.searchParams.get("id");
      await prisma.tblklas.delete({
        where : {
          klascode_id : id,
        }
      });
    },
  update_klas : async ({url, request}) => {
    const current_id = url.searchParams.get("current_id");
    const data = await request.formData();
    const id = data.get("id");
    const beschrijving = data.get("beschrijving");
    const db = await prisma.tblklas.findMany({
      where : {
        klascode_id : id,
      },
    });
    if ( db.length === 0)  {
      await prisma.tblklas.update({
        where : {
          klascode_id : current_id,
        },
        data : {
          klascode_id : id,
          klas_beschrijving : beschrijving,
        }
      })
    } else if ( id === current_id ) {
      await prisma.tblklas.update({
        where : {
          klascode_id : current_id,
        },
        data : {
          klas_beschrijving : beschrijving,
        }
      })
    } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  nieuwe_klas : async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const beschrijving = data.get("beschrijving");
    const db = await prisma.tblklas.findMany({
      where : {
        klascode_id : id,
      },
    });
    if ( db.length === 0) {
      await prisma.tblklas.create({
        data : {
        klascode_id : id,
        klas_beschrijving : beschrijving,
        }
      });
    } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  verwijder_woon : async ({ url }) => {
    const id = url.searchParams.get("id");
    try {
      await prisma.tblwoonplaats.delete({
        where : {
          woon_id : Number(id),
        }
      })
    } catch(Err) {
      crudErr = "something went wrong, see the console";
      console.error(Err);
      return fail(500, { msg : Err});
    }
  },
  update_woon : async ({ request, url }) => {
    const data = await request.formData();
    const current_id = url.searchParams.get("current_id")
    const id = data.get("id");
    const straat = data.get("straat");
    const nummer = data.get("nummer");
    const postcode = data.get("postcode");
    const woonplaats = data.get("woon");
    const busnummer = data.get("bus");
    const db = await prisma.tblwoonplaats.findMany({
      where : {
        woon_id : Number(id),
      },
    })
    if ( db.length === 0 ) {
      await prisma.tblwoonplaats.update({
        where : {
         woon_id : Number(current_id),
        },
        data : {
        woon_id : Number(id),
        straat : straat,
        nummer : nummer,
        postcode : postcode,
        woonplaats : woonplaats,
        busnummer : busnummer,
        },
      });
    } else if  (id === current_id)  {
      await prisma.tblwoonplaats.update({
        where : {
         woon_id : Number(current_id),
        },
        data : {
        straat : straat,
        nummer : nummer,
        postcode : postcode,
        woonplaats : woonplaats,
        busnummer : busnummer,
        },
      });
      } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  nieuwe_woon : async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const straat = data.get("straat");
    const nummer = data.get("nummer");
    const postcode = data.get("postcode");
    const woonplaats = data.get("woon");
    const busnummer = data.get("bus");
    const db = await prisma.tblwoonplaats.findMany({
      where : {
        woon_id : Number(id),
      },
    })
    if ( db.length === 0) {
      await prisma.tblwoonplaats.create({
        data : {
        woon_id : Number(id),
        straat : straat,
        nummer : nummer,
        postcode : postcode,
        woonplaats : woonplaats,
        busnummer : busnummer,
        },
      });
    } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  update_zit : async ({ request ,url }) => {
    const data = await request.formData();
    const current_id = url.searchParams.get("current_id")
    const id = data.get("id");
    const bezet = data.get("bezet");
    const beziter_id = data.get("beziter_id");
    const type = data.get("type");
    const db = await prisma.tblzit_plaatsen.findMany({
      where : {
        zitplaats_id : id,
      },
    })
    if ( db.length === 0 ) {
      await prisma.tblzit_plaatsen.update({
        where : {
         zitplaats_id : current_id,
        },
        data : {
          zitplaats_id : id,
          bezet : Boolean(bezet),
          beziter_id : beziter_id,
          type : Number(type),
        },
      });
    } else if  (id === current_id)  {
      await prisma.tblzit_plaatsen.update({
        where : {
         zitplaats_id : current_id,
        },
        data : {
          zitplaats_id : id,
          bezet : Boolean(bezet),
          beziter_id : beziter_id,
          type : Number(type),
        },
      });
      } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  verwijder_zit : async ({ url }) => {
    const id = url.searchParams.get("id");
    try {
      await prisma.tblzit_plaatsen.delete({
        where : {
          zitplaats_id : id,
        }
      })
    } catch(Err) {
      crudErr = "something went wrong, see the console";
      console.error(Err);
      return fail(500, { msg : Err});
    }
  },
  nieuwe_zit : async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const bezet = data.get("bezet");
    const beziter_id = data.get("beziter_id");
    const type = data.get("type");
    const db = await prisma.tblzit_plaatsen.findMany({
      where : {
        zitplaats_id : id,
      },
    })
    if ( db.length === 0) {
      await prisma.tblzit_plaatsen.create({
        data : {
          zitplaats_id : id,
          bezet : Boolean(bezet),
          beziter_id : beziter_id,
          type : Number(type),
        },
      });
    } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  update_type : async ({ request, url}) => {
    const data = await request.formData();
    const current_id = url.searchParams.get("current_id")
    const id = data.get("id");
    const beschrijving = data.get("beschrijving");
    const db = await prisma.tblzitplaats_type.findMany({
      where : {
        type_id : Number(id),
      },
    })
    if ( db.length === 0 ) {
      await prisma.tblzitplaats_type.update({
        where : {
         type_id : Number(current_id),
        },
        data : {
          type_id : Number(id),
          beschrijving_type : beschrijving,
        },
      });
    } else if  (id === current_id)  {
      await prisma.tblzitplaats_type.update({
        where : {
         type_id : Number(current_id),
        },
        data : {
          type_id : Number(id),
          beschrijving_type : beschrijving,
        },
      });
      } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },
  verwijder_type : async ({ url }) => {
    const id = url.searchParams.get("id");
    try {
      await prisma.tblzitplaats_type.delete({
        where : {
          type_id : Number(id),
        }
      })
    } catch(Err) {
      crudErr = "something went wrong, see the console";
      console.error(Err);
      return fail(500, { msg : Err});
    }
  },
  nieuwe_type : async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const beschrijving = data.get("beschrijving");
    const db = await prisma.tblzitplaats_type.findMany({
      where : {
        type_id : Number(id)
      },
    })
    if ( db.length === 0) {
      await prisma.tblzitplaats_type.create({
        data : {
          type_id : Number(id),
          beschrijving_type : beschrijving,
        },
      });
    } else {
      crudErr = "deze primaire sleutel zit all in het database";
      return fail(500, { msg : "deze ID bestaat all"});
    }
  },

  }


