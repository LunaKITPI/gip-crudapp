# over dit project
dit project is gemaakt door mij  voor mijn eindproject software 2023-2024 in de righting networken en IT. het is een SvelteKit ticketing web app dat mysql als database gebruikt. Ik heb een alternatieve versie heb die sqlite gebruikt ( deze repo ), deze heb ik gemaakt vanwege het gemak van een locale file te gebruiken vergeleken een locale mysql server op te starten ( die in sync is op meerdere bestanden ).

gelukig is het enigste verschil in dit project ( tussen sqlite & MySql ) het schema.prisma bestand ( en de migrations hoewell deze gewoon records zijn van vorige aanpassingen aan mijn database )

om kort uitleg te geven : deze app gebruikte sveltekit ( een fullstack tool voor webapps te maken ) en prisma ( een ORM -> iets dat alle records van een database  representeerd als objecten waarbij elke kolom een atribut is )

## het klaarmaken van dit project
dit is een redelijk simpel project om op uw systeem te krijgen, namelijk
1. clone de repo
``` bash
git clone https://github.com/LunaKITPI/GIP-crudapp-sqlite-version.git
```

2. install node.js als dit niet geinstaleerd is
dit kan simpelweg via de node.js website https://nodejs.org

3. installeer de dependancies
dit doe je door in uw cli naar het project te gaan en de volgende commando uit te voeren
``` bash
npm install
```
4. de database aanmaken
in prisma/schema.prisma staat een beschrijving van ons database, bovenaans staat ook een url, dit url is standaart onze localhost met de db 'dbgip'
als u all een database hebt met die naam raad ik aan dat u 'dbgip' met iets anders verandert. wanneer u de database wilt aanmaken typt u het volgende in:
``` bash
npx prisma migrate dev
```
migrate zorgt ervoor dat onze beschrijving in schema.prisma overgeschreven wordt naar ons werkelijke database

5. dummy data voor de zitplaatsen
in deze repo is er een 'seats.sql' file die u kan uitvoeren op uw database ( via bv mysql workbench ) om alvast iets van data te hebben over dde zitplaatsen
deze zijn ingedeelt in 2 categorien, type 1 zijn vrij zitplaatsen die open staan voor bestelling, type 2 zijn zitplaatsen gereserveed voor studenten en leerkrachten, aka gereserveerd voor een soort persoon

6. run de locale server om de website te runnen
dit kan met volgende comando
``` bash
npm run dev
```
dit toon een localhost link, open deze in uw browser
u kunt een admin panel vinden door '/admin' na uw url te plaatsen, het wachtwoord hiervan is 'School99'

de login is suboptimaal waarvoor ik mij excuseer, ik had last met oAuth te implementeren op een manier dat niet prive wachtwoorden vrijstelt ( omdat deze repo openbaar staat )
dus elke refresh vraagt opnieuw om in te loggen, om dit te ontzijlen kunt u in het bestand 'src/routes/admin/+pager.svelte' in het script segment de variabel 'logged_in' als 'true' zetten.
deze variabel staat op lijn 27

deze sql file is gemaakt adhv een python script die ook in deze repo beschikbaar is onder de naam 'seats.py'

