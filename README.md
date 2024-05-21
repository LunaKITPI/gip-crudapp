# over dit project
dit project is gemaakt door mij  voor mijn eindproject software 2023-2024 in de righting networken en IT. het is een SvelteKit ticketing web app dat mysql als database gebruikt.
om kort uitleg te geven : deze app gebruikte sveltekit ( een fullstack tool voor webapps te maken ) en prisma ( een ORM -> iets dat alle records van een database  representeerd als objecten waarbij elke kolom een atribut is )


## het klaarmaken van dit project
dit is een redelijk simpel project om op uw systeem te krijgen, namelijk
1. clone de repo
``` bash
git clone https://github.com/LunaKITPI/gip-crudapp.git
```

2. install node.js als dit niet geinstaleerd is
dit kan simpelweg via de node.js website https://nodejs.org

3. installeer de dependancies
dit doe je door in uw cli naar het project te gaan en de volgende commando uit te voeren
``` bash
npm install
```

4. run de locale server om de website te runnen
dit kan met volgende comando
``` bash
npm run dev
```
dit toon een localhost link, open deze in uw browser

5. prisma studio
je kan ook een visueele database editor openen om records via prisma aan te passen
``` bash
npx prisma studio
```
