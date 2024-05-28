<script lang="ts">
  // de geselecteerde optie van tabellen te houden
  let selectedOption = "";
// een 'onChange' functie  die onze geselecteerde aanpast bijhoud
  function dbSelect(event) {
    selectedOption = event.target.value;
  }

  // de geselecteerde jaartall bijhouden
  let selectedYear = "none";
  function yrSelect(event) {
    selectedYear = event.target.value;
  }
// het importeren van variabelen van onze ts file
  import type { PageData } from './$types'
  export let data: PageData
  $: ({tables} = data )

  // de geselecteerde primaire sleutel bijhouden
  let selectedID = ''
  // een functie uitvoeren die de geselecteerdeID aanpast adhv de geclickte knop
  function selectID(event) {
    selectedID = event.target.id
  }
// bijhouden welke wachtwoord de gebruiker ingeeft
  let inputedPass = "";
  let logged_in = true; // bijhouden of de gebruiker ingelogt is
  function Login(event) {
    // simple login systeem, zoals gezegd in de ts file is deze methode niet veilig maar heb ik gewoon geen ervaring met werken met services zoals oAuth
    if (inputedPass === tables.passwd) {
      logged_in = true
    }
  }

  // bijhouden van de filter string voor de primaire sleutrels
  let filter = "";
</script>
<style>
  /* styling adhv element */
  html {
    background: #333c43;
    color: #D3C6AA;
  }
  body {
    text-align: center;
    font-size: 1.5rem;
  }
input {
    width: 60%;
    background: #3a464c;
    color: #a7c080;
    border: 0px;
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  }
button {
    background: #3a464c;
    color: #DBBC7F;
    border: 0px;
    border-radius: 8px;

    font-size: 22px;
    height: 34px;
    
  }
button:hover {
    background: #293136;
    color: #DBBC7F;
  }
button:active {
    background: #e67e80;
    color: #293136;
  }
input[type="file"] {
    width:15%;
    margin-bottom:4px;
}
input[type="file"]::file-selector-button {
    background: #3a464c;
    color: #DBBC7F;
    border: 0px;
    border-radius: 8px;
    font-size: 22px;
    height: 34px;
}

input[type="file"]::file-selector-button:hover {
    background: #293136;
    color: #DBBC7F;
  }
input[type="file"]::file-selector-button:active {
    background: #e67e80;
    color: #293136;
  }
/* styling adhv klasse */
  .sep {
    width: 95%;
    margin-left: 2.5%;
    align-self: center;
    height: 1.5px;
    background: #7FBBB3;
  }
  .selectBox {
    border: 0px;
    background: #293136;
    color: #d3c6aa;
    width: 10rem;
    font-size: 18px;
  }
  .scroll {
    height:264px;
    overflow: auto;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    border: 2px solid #7FBBB3;
}
  .scroll button {
    width:90%;
    background:#3a464c;
    color:#a7c080;
    border:0px;
    border-radius:8px;
  }

.scroll button:hover {
    background: #293136;
    color: #DBBC7F;
  }
.scroll button:active {
    background: #e67e80;
    color: #293136;
  }
.stats {
    padding: 1rem;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    border: 2px solid #7FBBB3;
    text-align: left;
}
.bottomBar {
  font-size:12px;
  background:#d3c6aa;
  color:#293136;
  width:100%;
  height:auto;
  text-align:left;
  padding:4px;
  border-radius:8px;
}
.login_prompt {
  margin-left:30%;
  margin-top: 20%;
  width: 40%;
}
.login_prompt input{
  width:70%;
}
/* styling adhv id */
 #err {
   color : #e67e80;
   font-size: 12px;
   text-align: center;
 }
 #filter {
   width : 20%;
 }
</style>



<html lang="nederlands">
  <body>
    <!-- toont login prompt waneer de gebruiker niet ingelogd is, anders toont het de rest van de web pagina -->
    {#if !logged_in}
      <div class="login_prompt">
<h1>login</h1>
          <input type="text" name="input" bind:value={inputedPass}/> <button on:click={Login}>login</button> <br />
      </div>
    {:else}
    <h1> Admin Panel</h1>
      <div class="sep"></div> <br>
  <p>
      selecteer een databank :  <br>
      selecteer een record adhv primaire sleutel <br>
      dan krijg je de record details zichtbaar 
  </p>
<!-- optie om elke database te selecteren -->
      <select name="dabatabses" id="DB0" on:change={dbSelect} class="selectBox">
      <option   value="none">  </option>
        <option value="tblleerlingen"> leerlingen </option>
        <option value="tblwoonplaats"> woonplaats </option>
        <option value="tblklas"> klas </option>
        <option value="tblzitplaatsen"> zitplaatsen </option>
        <option value="tblzitplaats_type"> zitplaatstypes</option>
      </select> <br>
  {#if selectedOption == "tblleerlingen"}
  <select name="year" id="YR0" on:change={yrSelect} class="selectBox">
  <option value="none"> alle jaren </option>
    <option value="2021-2022">2021-2022</option>
    <option value="2022-2023">2022-2023</option>
    <option value="2023-2024">2023-2024</option>
    <option value="2024-2025">2024-2025</option>
    <option value="2025-2026">2025-2026</option>
  </select>
{/if}
      <br>
      <br />
      <!-- voor elke tabel heb ik een statement geplaatse die hetzelfde doet, namelijk : als geselecteerde = tbl... -> toont alle records gerepresenteerd als knoppen  -->
vull hier een filter in adhv primaire sleutel <br />
<input id="filter" bind:value={filter}/> <br /> <br />
      <div class="scroll">
    {#if selectedOption === 'tblleerlingen'}
<button id="new" on:click={selectID}> new </button>
  {#each tables.leerlingen as leerling } <!-- de each statement in kwestie -> voor elke record in tbl... toon een knop met de text [primaire sleutel] erop || zelfde techniek word voor elke tabel toegepast -->
    {#if leerling.leerling_id.includes(filter)}
      {#if leerling.schooljaar == selectedYear || selectedYear == "none"}
        <button id={leerling.leerling_id} on:click={selectID} >{leerling.leerling_id}</button><br>
      {/if}
    {/if}
  {/each}
  {/if}

    {#if selectedOption == 'tblklas'}
<button id="new" on:click={selectID}> new </button>
  {#each tables.klassen as klas }
    {#if klas.klascode_id.includes(filter)}
        <button id={klas.klascode_id} on:click={selectID}>{klas.klascode_id}</button><br>
    {/if}
  {/each}
  {/if}

    {#if selectedOption === 'tblwoonplaats'}
<button id="new" on:click={selectID}> new </button>
  {#each tables.woonplaats as woonplaats }
    {#if String(woonplaats.woon_id).includes(filter)}
        <button id={woonplaats.woon_id} on:click={selectID}>{woonplaats.woon_id}</button><br>
    {/if}
  {/each}
  {/if}

    {#if selectedOption === 'tblzitplaatsen'}
<button id="new" on:click={selectID}> new </button>
  {#each tables.zit_plaatsen as zitplaats }
    {#if zitplaats.zitplaats_id.includes(filter)}
        <button id={zitplaats.zitplaats_id} on:click={selectID}>{zitplaats.zitplaats_id}</button><br>
    {/if}
  {/each}
  {/if}

    {#if selectedOption === 'tblzitplaats_type'}
<button id="new" on:click={selectID}> new </button>
  {#each tables.zit_plaats_type as type }
    {#if String(type.type_id).includes(filter)}
        <button id={type.type_id} on:click={selectID}>{type.type_id}</button><br>
    {/if}
  {/each}
  {/if}

  </div>
<br><br>
      <div class="sep"></div>
    <br>
      record data : <br> <br>


  {#if selectedOption == "tblklas"}
    {#each tables.klassen as klas }
{#if klas.klascode_id == selectedID }
  

    <div class="stats">
      <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> klascode_id </strong> <br> <input value={klas.klascode_id} type="id" name="id"> <br>
    <strong> klas_beschrijving </strong> <br> <input value={klas.klas_beschrijving} type="beschrijving" name="beschrijving"> <br> <br>
    <button formaction="?/update_klas&current_id={klas.klascode_id}"> update record </button>
    <button formaction="?/verwijder_klas&id={klas.klascode_id}"> verwijder record </button>
  </form>
    </div>
<br>
      {/if}
    {/each}
    {#if selectedID == "new"} <!-- we hebben hier een ander component voor waneer we de "new" knop induwen, hiermee gaan wij een nieuw record erin steken -->
    <div class="stats">
      <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> klascode_id </strong> <br> <input type="id" name="id"> <br>
    <strong> klas_beschrijving </strong> <br> <input type="beschrijving" name="beschrijving" > <br> <br>
    <button formaction="?/nieuwe_klas"> nieuw record </button>
  </form>
      </div>
      {/if}
{/if}

<!-- de waardes TONEN -->
<!-- we checken welke tbl geselecteerd is, dan itereren we over elk record en tonen we alleen maar de records waarbij de --
  -- primaire sleutel == aan de geselecteerde record ( er kan maar 1 record zijn -> primaire sleutel is unique ) -->
  {#if selectedOption == "tblleerlingen"}
    {#each tables.leerlingen as leerling }
      {#if leerling.leerling_id == selectedID }
    <div class="stats">
      <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> leerling_id </strong> <br> <input value={leerling.leerling_id} type="id" name="id"> <br>
    <strong> naam </strong> <br> <input value={leerling.naam} type="naam" name="naam"> <br>
    <strong> voornaam </strong> <br> <input value={leerling.voornaam} type="voornaam" name="voornaam"> <br>
    <strong> woon_id </strong> <br> <input value={leerling.woon_id} type="woonid" name="woonid"> <br>
    <strong> auth_key </strong> <br> <input value={leerling.auth_key} type="authkey" name="authkey"> <br>
    <strong> email </strong> <br> <input value={leerling.email} type="email" name="email"> <br>
    <strong> geslacht </strong> <br> <input value={leerling.geslacht} type="gesclacht" name="gesclacht"> <br>
    <strong> klas </strong> <br> <input value={leerling.klas} type="klas" name="klas"> <br>
    <strong> zitplaats </strong> <br> <input value={leerling.zitplaats} type="zitplaats" name="zitplaats"> <br>
    <strong> aantal_uitgenodigde </strong> <br> <input value={leerling.aantal_uitgenodigde} type="aantal" name="aantal"> <br>
    <strong> schooljaar </strong> <br> <input value={leerling.schooljaar} type="schooljaar" name="schooljaar"> <br> <br>
    <button formaction="?/update_llr&current_id={leerling.leerling_id}"> update record </button>
    <button formaction="?/verwijder_llr&id={leerling.leerling_id}"> verwijder record </button>
  </form>
      </div>
<br>
    {/if}
  {/each}
    {#if selectedID == "new"} <!-- we hebben hier een ander component voor waneer we de "new" knop induwen, hiermee gaan wij een nieuw record erin steken -->
    <div class="stats">
      <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> leerling_id </strong> <br> <input name="id"> <br>
    <strong> naam </strong> <br> <input type="naam" name="naam"> <br>
    <strong> voornaam </strong> <br> <input  type="voornaam" name="voornaam"> <br>
    <strong> woon_id </strong> <br> <input type="woonid" name="woonid"> <br>
    <strong> auth_key </strong> <br> <input type="authkey" name="authkey"> <br>
    <strong> email </strong> <br> <input type="email" name="email"> <br>
    <strong> geslacht </strong> <br> <input type="gesclacht" name="gesclacht"> <br>
    <strong> klas </strong> <br> <input  type="klas" name="klas"> <br>
    <strong> zitplaats </strong> <br> <input  type="zitplaats" name="zitplaats"> <br>
    <strong> aantal_uitgenodigde </strong> <br> <input type="aantal" name="aantal"> <br>
    <strong> schooljaar </strong> <br> <input type="schooljaar" name="schooljaar"> <br> <br>
    <button formaction="?/nieuwe_llr"> nieuw record </button>
  </form>
      </div>
      {/if}


{/if}
  {#if selectedOption == "tblwoonplaats"}
    {#each tables.woonplaats as woonplaats }
      {#if woonplaats.woon_id == selectedID }
    <div class="stats">
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> woon_id </strong> <br> <input value={woonplaats.woon_id} type="id" name="id"> <br>
    <strong>straat  </strong> <br> <input value={woonplaats.straat} type="straat" name="straat" > <br>
    <strong>nummer  </strong> <br> <input value={woonplaats.nummer} type="nummer" name="nummer"> <br>
    <strong>postcode  </strong> <br> <input value={woonplaats.postcode} type="postcode" name="postcode"> <br>
    <strong>woonplaats  </strong> <br> <input value={woonplaats.woonplaats} type="woon" name="woon"> <br>
    <strong>busnummer  </strong> <br> <input value={woonplaats.busnummer} type="bus" name="bus"> <br> <br>
    <button formaction="?/update_woon&current_id={woonplaats.woon_id}"> update record </button>
    <button formaction="?/verwijder_woon&id={woonplaats.woon_id}"> verwijder record </button>
  </form>
    </div>
<br>
    {/if}
  {/each}
  {#if selectedID === "new"}
    <div class="stats">
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <strong> woon_id </strong> <br> <input type="id" name="id"> <br>
    <strong>straat  </strong> <br> <input type="straat" name="straat" > <br>
    <strong>nummer  </strong> <br> <input type="nummer" name="nummer"> <br>
    <strong>postcode  </strong> <br> <input type="postcode" name="postcode"> <br>
    <strong>woonplaats  </strong> <br> <input type="woon" name="woon"> <br>
    <strong>busnummer  </strong> <br> <input type="bus" name="bus"> <br> <br>
    <button formaction="?/nieuwe_woon"> nieuw record </button>
  </form>
    </div>
{/if}
{/if}
  {#if selectedOption == "tblzitplaatsen"}
    {#each tables.zit_plaatsen as plaats }
      {#if plaats.zitplaats_id == selectedID }
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <div class="stats">
    <strong> zitplaats_id </strong> <br> <input value={plaats.zitplaats_id} type="id" name="id"> <br>
    <strong>bezet  </strong> <br> <input value={plaats.bezet} type="bezet" name="bezet" > <br>
    <strong>beziter_id  </strong> <br> <input value={plaats.beziter_id} type="beziter_id" name="beziter_id"> <br>
    <strong>type  </strong> <br> <input value={plaats.type} type="type" name="type"> <br> <br>
    <button formaction="?/update_zit&current_id={plaats.zitplaats_id}"> update record </button>
    <button formaction="?/verwijder_zit&id={plaats.zitplaats_id}"> verwijder record </button>
    </div>
  </form>
<br>
    {/if}
  {/each}
  {#if selectedID == "new"}
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <div class="stats">
    <strong> zitplaats_id </strong> <br> <input type="id" name="id"> <br>
    <strong>bezet  </strong> <br> <input type="bezet" name="bezet"> <br>
    <strong>beziter_id  </strong> <br> <input type="beziter_id" name="beziter_id" > <br>
    <strong>type  </strong> <br> <input type="type" name="type"> <br> <br>
    <button formaction="?/nieuwe_zit"> nieuw record </button>
    </div>
  </form>
  {/if}
{/if}
  {#if selectedOption == "tblzitplaats_type"}
    {#each tables.zit_plaats_type as type }
      {#if type.type_id == selectedID }
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <div class="stats">
    <strong> type_id </strong> <br> <input value={type.type_id} type="id" name="id"> <br>
    <strong>beschrijving_type  </strong> <br> <input value={type.beschrijving_type} type="beschrijving" name="beschrijving"> <br> <br>
    <button formaction="?/update_type&current_id={type.type_id}"> update record </button>
    <button formaction="?/verwijder_type&id={type.type_id}"> verwijder record </button>
    </div>
    </form>
    {/if}
  {/each}
  {#if selectedID == "new"}
    <form method="POST" id="selectllr" enctype="multipart/form-data">
    <div class="stats">
    <strong> type_id </strong> <br> <input type="id" name="id"> <br>
    <strong>beschrijving_type  </strong> <br> <input type="beschrijving" name="beschrijving"> <br> <br>
    <button formaction="?/nieuwe_type"> nieuw record </button>
    </div>
  </form>
  {/if}
{/if}
<br />
  {#if tables.crudErr}
    <p id="err">
    {tables.crudErr}
    </p>
  {/if}
<!-- het onderdeel om een csv te lezen -->
      <div class="sep"></div>
      <h3>import leerlingen tabel (csv)</h3>
      <!-- een form die in de ts file bij onze acties onderdeel de 'ReadFile' functie uitvoort -->
<form method="POST" action="?/ReadFile" class="csv_from" enctype="multipart/form-data">
  <!-- de input word meegenomen naar de ts file via de formData ( op te hallen met een .get request )  -->
  <input type="file" name="file" accept=".csv"/> <!-- accepteert een file als input ( accepteert alleen .csv bestanden ) -->
<br />
  <button class="csv_btn"> import (csv) </button>
  <p>refresh de pagina indien de veranderingen niet plaats vinden <br /> indien onzekerheid bekijk de DB en/of prisma studio</p>
  {#if tables.errMsg }
<!-- toont een error message als deze NIET leeg is -->
  <p id="err">{tables.errMsg}</p>
{/if}
</form>
<!-- bar onderaan voor credits of iets :D -->
<div class="bottomBar">
Gemaakt door : Joshua De Wannemaeker | 6nit | nr 5 | voor GIP opdracht software 2023-2024

    </div>
{/if}

  </body>
</html>
