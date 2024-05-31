import type { PageServerLoad, Actions } from './$types'; // acties voor functies aan forms te koppelen en PageServerLoad voor variable naar onse pagine te sturen
import { fail } from '@sveltejs/kit'; // voor beter errors te kunnen returnen ( kan zijn dat ik dit niet gebruik mss well )
import nodemailer from "nodemailer"; // emails versturen via nodemailer library
import Mail from "nodemailer/lib/mailer"; // /\
import { promises as fs } from 'fs';
import { emailpasswd, emailUser } from '$lib/server/psswd' // onze library variabelen importen
import { prisma } from '$lib/server/prisma' // onze prisma client importen van onze library
import QRCode from 'qrcode';
// foutmelding die interactief aan de webpagina is
let errmsg = "";
// alle variabelen die naar de webpagina doorgestuurt wordt


// functie om een qrcode to maken voor in de email te sturen
async function generateQRCode(text: string, outputFile: string): Promise<void> {
    try {
      // genereer de qrcode
        const qrCodeDataUrl = await QRCode.toDataURL(text);
        // Extract base64 encoded image from data URL
        // vervang onnodige bijwerking van het converteren naar een qrcode ( "data:image\/png;base64" wordt er automatisch bij toegevoegd )
        const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");

      // schrijf de file naar ons systeem
        await fs.writeFile(outputFile, base64Data, 'base64');
        console.log(`QR code saved to ${outputFile}`);
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}export const load: PageServerLoad = async () => {
  return {
    seats : {
    // beschikbare plaatse
    available : await prisma.tblzit_plaatsen.findMany({
      where: {
        bezet: false,
        type : 1,
      },
      }),
      // bezete plaatsen
    unavailable : await prisma.tblzit_plaatsen.findMany({
      where: {
        bezet: true 
      },
    }),
      // onze error msg
      errmsg : errmsg
    },
};
}
// acties -> functies die afspelen bij het indienen van een form
// hier is het alleen voor het bestellen van tickers
export const actions : Actions = {
  sendMail : async ({ request }) => {
    // alle invul velden hun data ophalen die in de form zaten
    const data = await request.formData();
    const naam = data.get("naam")
    const voornaam = data.get("voornaam")
    const id  = data.get("id");
    const seat = data.get("seat");
    const key = data.get("key");
    const date = data.get("date");
    const email = data.get("email")

    // checken of elk veld ingevuld is adhv truthy values in js/ts
    if (!id) {
      errmsg = "gelieve een id in te vullen"
      return fail(404, { message : "id is a required field" });
    }
    if (!seat) {
    errmsg = "gelieven een zitplaats in te vullen";
      return fail(404, { seat, missing : true });
    }
    if (!key) {

      errmsg = "gelieven een sleutel in te vullen"
      return fail(404, { key, missing : true });
    }
    if (!date) {
    errmsg = "";
      return fail(404, { date, missing : true });
    }
    if (!email) {
      errmsg = " gelieven een email adress in te vullen"
      return fail(404, { email, missing : true });
    }

    errmsg = ""; // error msg leeg maken als er geen problemen ware
    // vind alleen records die de ingegeven id en auth_key hebben
    const auth = await prisma.tblleerlingen.findMany({
      where : {
        leerling_id : id,
        auth_key : key,
      }
    })


    if (auth.length === 0 ) { // checken of er records gevonden zijn, zo niet stoppen we de actie en veranderen de error message
      errmsg = "dit id en/of deze sleutel zijn ongeldig"; // foutmelding
      return fail(404, { msg: "invalid id/key" })

    }else if ( auth[0].aantal_uitgenodigde >= 2 ) { // chekt of dat de leerlingen all het maximum aantal bestellingen
      errmsg = "de geselecteerde id  heeft het max aantal bestellingen bereikt,\n  :  max 2 bestellingen per gebruiker"; // foutmelding
      return fail(404, { msg: "user has reached max amount of orders" })
    } else { // alse er iets in de query zit doe volgend : | ps er kan maar max 1 record inzitten aangezien we filteren adhv primaire sleutel
      await prisma.tblzit_plaatsen.update({ // verander de zitplaats die we geselecteerd hebben
        where : {
          zitplaats_id : seat,
        },
        data : {
          bezet : true, // bezet -> waar & bezeter_id -> ingegeven id
          beziter_id : id,
        }})
      await prisma.tblleerlingen.update({ // houd bij hoeveel plaatsen de gebruiker all bestelt heeft
        where : {
          leerling_id : id
        },
        data : {
          aantal_uitgenodigde: Number(auth[0].aantal_uitgenodigde) + 1,
        },
      })
      // hier maken we ook een record aan die bijhoud wie er allemaal uitgenodigd word, dit slaan we op in tblgasten
      await prisma.tblgasten.create({
        data : {
          naam : naam,
          voornaam : voornaam,
          email : email,
          leerling_id : id
        }
      })
      // het aanmaken van een qrcode om door te sturen
      const outputFile = String(id) + '.png'
      const filePath = process.cwd() + '/files/' + outputFile;
      const qrcodeSource = String(id) + key;
      generateQRCode(qrcodeSource, filePath);
      // email verzender naar de besteller
      const transporter = nodemailer.createTransport({ // transporter maken
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser, // email & app pasword halen van onze library folder in dit project ( src/lib )
          pass: emailpasswd,
        }
      })
        const mailOptions = { // opties definieeren voor het verzende van de mail
          from: {
            name: 'ticketree',
            address: emailUser,
          },
          to: email,
          subject: "ticket CC de Werf",
          text : "Bedankt voor het bestellen van een ticket voor 'CC de Werf' bij ticketree! |n in de bijlage vind u een qr-code die functioneert als uw ticket",
          attachments : [{
            filename : 'ticket-CC_De_Werf.png',
            path : filePath,
            contentType : 'image/png',
          }]
        }
      const sendMail = async () => { // async functie voor de mail echt te versturen
        try {
          await transporter.sendMail(mailOptions) // proberen de mail te sturen
          console.log("email has been sent")
        } catch ( error ) {
          errmsg = "er is iets fout gelopen bij het versturen van de email, gelieve een mail te sturen naar de school's IT coordinatoren"
          console.error(error) // de error loggen als er iets guit ging + error message aanpassen
        }
      }
      sendMail(); // de functie uitvoeren
    }
  }
}
