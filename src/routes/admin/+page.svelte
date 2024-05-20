<script lang="ts">
  let selectedOption = "";
  let showYear = false;

  function onChange(event) {
    selectedOption = event.target.value;
    showYear = selectedOption === "tblleerlingen" || selectedOption === "tblklas";
  }


// initial loading of all our data
  import type { PageData } from './$types'
  export let data: PageData
  $: ({tables} = data )
// selecting an id
  let selectedID = ''
  function selectID(event) {
    selectedID = event.target.id
  }

  let inputedPass = "";
  let logged_in = false;
  function Login(event) {
    // I know this isn't secure but I do NOT feel like using oAuth,, might change my mind later tho
    if (inputedPass === tables.passwd) {
      logged_in = true
    }
  }
</script>
<style>
  html {
    background: #333c43;
    color: #D3C6AA;
  }
  body {
    text-align: center;
    font-size: 1.5rem;
  }
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
input {
    width: 60%;
    background: #3a464c;
    color: #a7c080;
    border: 0px;
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  }
.csv_btn {
    background: #3a464c;
    color: #DBBC7F;
    border: 0px;
    border-radius: 8px;
    width: 10%;
    font-size: 22px;
    height: 34px;
    
  }
.csv_btn:hover {
    background: #293136;
    color: #DBBC7F;
  }
.csv_btn:active {
    background: #e67e80;
    color: #293136;
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
.csv_input {
    background: #293136;
    width: 15%;
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

.login_prompt {
  margin-left:30%;
  margin-top: 20%;
  width: 40%;
}
.login_prompt input{
  width:70%;
}
</style>



<html lang="english">
  <body>
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

      <select name="dabatabses" id="DB0" on:change={onChange} class="selectBox">
      <option   value="none">  </option>
        <option value="tblleerlingen"> leerlingen </option>
        <option value="tblwoonplaats"> woonplaats </option>
        <option value="tblklas"> klas </option>
        <option value="tblouders"> ouders </option>
        <option value="tblzitplaatsen"> zitplaatsen </option>
        <option value="tblzitplaats_type"> zitplaatstypes</option>
      </select> <br>
      <br>
      <br />
    {#if selectedOption === 'tblleerlingen'}
      <div class="scroll">
  {#each tables.leerlingen as leerling }
        <button id={leerling.leerling_id} on:click={selectID} >{leerling.leerling_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblklas'}
      <div class="scroll">
  {#each tables.klassen as klas }
        <button id={klas.klascode_id} on:click={selectID}>{klas.klascode_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblouders'}
      <div class="scroll">
  {#each tables.ouders as ouder }
        <button id={ouder.ouder_id} on:click={selectID}>{ouder.ouder_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblwoonplaats'}
      <div class="scroll">
  {#each tables.woonplaats as woonplaats }
        <button id={woonplaats.woon_id} on:click={selectID}>{woonplaats.woon_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblzitplaatsen'}
      <div class="scroll">
  {#each tables.zit_plaatsen as zitplaats }
        <button id={zitplaats.zitplaats_id} on:click={selectID}>{zitplaats.zitplaats_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblzitplaats_type'}
      <div class="scroll">
  {#each tables.zit_plaats_type as type }
        <button id={type.type_id} on:click={selectID}>{type.type_id}</button><br>
  {/each}
  </div>
  {/if}        
<br><br>
      <div class="sep"></div>
    <br>
      record data : <br> <br>
  {#if selectedOption == "tblklas"}
    {#each tables.klassen as klas }
{#if klas.klascode_id == selectedID }
  

    <div class="stats">
    <strong> klascode_id </strong> <br> <input value={klas.klascode_id} type="text"> <br>
    <strong> klas_beschrijving </strong> <br> <input value={klas.klas_beschrijving} type="text" > <br>
    </div>
<br>
      {/if}
    {/each}
{/if}
  {#if selectedOption == "tblleerlingen"}
    {#each tables.leerlingen as leerling }
      {#if leerling.leerling_id == selectedID }
    <div class="stats">
    <strong> leerling_id </strong> <br> <input value={leerling.leerling_id} type="text"> <br>
    <strong> naam </strong> <br> <input value={leerling.naam} type="text" > <br>
    <strong> voornaam </strong> <br> <input value={leerling.voornaam} type="text" > <br>
    <strong> woon_id </strong> <br> <input value={leerling.woon_id} type="text" > <br>
    <strong> email </strong> <br> <input value={leerling.email} type="text" > <br>
    <strong> geslacht </strong> <br> <input value={leerling.geslacht} type="text" > <br>
    <strong> klas </strong> <br> <input value={leerling.klas} type="text" > <br>
    <strong> zitplaats </strong> <br> <input value={leerling.zitplaats} type="text" > <br>
    <strong> aantal_uitgenodigde </strong> <br> <input value={leerling.aantal_uitgenodigde} type="text" > <br>
    <strong> schooljaar </strong> <br> <input value={leerling.schooljaar} type="text" > <br>
    </div>
<br>
    {/if}
  {/each}
{/if}
  {#if selectedOption == "tblouders"}
    {#each tables.ouders as ouder }
      {#if ouder.ouder_id == selectedID }
    <div class="stats">
    <strong> ouder_id </strong> <br> <input value={ouder.ouder_id} type="text"> <br>
    <strong> naam</strong> <br> <input value={ouder.naam} type="text" > <br>
    <strong>voornaam </strong> <br> <input value={ouder.voornaam} type="text" > <br>
    <strong>woon_id </strong> <br> <input value={ouder.woon_id} type="text" > <br>
    <strong>zitplaats </strong> <br> <input value={ouder.zitplaats} type="text" > <br>
    </div>
<br>
    {/if}
  {/each}
{/if}
  {#if selectedOption == "tblwoonplaats"}
    {#each tables.woonplaats as woonplaats }
      {#if woonplaats.woon_id == selectedID }
    <div class="stats">
    <strong> woon_id </strong> <br> <input value={woonplaats.woon_id} type="text"> <br>
    <strong>straat  </strong> <br> <input value={woonplaats.straat} type="text" > <br>
    <strong>nummer  </strong> <br> <input value={woonplaats.nummer} type="text"> <br>
    <strong>postcode  </strong> <br> <input value={woonplaats.postcode} type="text"> <br>
    </div>
<br>
    {/if}
  {/each}
{/if}
  {#if selectedOption == "tblzitplaatsen"}
    {#each tables.zit_plaatsen as plaats }
      {#if plaats.zitplaats_id == selectedID }
    <div class="stats">
    <strong> zitplaats_id </strong> <br> <input value={plaats.zitplaats_id} type="text"> <br>
    <strong>bezet  </strong> <br> <input value={plaats.bezet} type="text" > <br>
    <strong>type  </strong> <br> <input value={plaats.type} type="text"> <br>
    </div>
<br>
    {/if}
  {/each}
{/if}
  {#if selectedOption == "tblzitplaats_type"}
    {#each tables.zit_plaats_type as type }
      {#if type.type_id == selectedID }
    <div class="stats">
    <strong> type_id </strong> <br> <input value={type.type_id} type="text"> <br>
    <strong>beschrijvings_type  </strong> <br> <input value={type.beschrijvings_type} type="text"> <br>
    </div>
    {/if}
  {/each}
{/if}
<br />
      <div class="sep"></div>
      <h3>import leerlingen tabel (csv)</h3>
<form method="POST" action="?/ReadFile" class="csv_from" enctype="multipart/form-data">
  <input type="file" name="file" accept=".csv"/>
<br />
  <button class="csv_btn"> import (csv) </button>
  <p>refresh de pagina indien de veranderingen niet plaats vinden <br /> indien onzekerheid bekijk de DB en/of prisma studio</p>
</form>
<div class="bottomBar">
Gemaakt door : Joshua De Wannemaeker | 6nit | nr 5 | voor GIP opdracht software 2023-2024

    </div>

{/if}

  </body>
</html>
