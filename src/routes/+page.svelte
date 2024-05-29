<script lang="ts">
  // importeren van Actie data & page data zodat we variabelen en return waarden kunnen gebruiken op onze webpagina
  import type { PageData, ActionData } from './$types'
  export let data: PageData
  $: ({seats} = data ) // importeren van het object 'data' wat bestaad uit all onze gespecifieerde variablene, deze noemen we 'seats'

  let selected_btn = "" // het bijhouden van welke zitplaats we geselecteerd hebben
  const select_seat = (event) => { // de functie die afspeelt waneer we een zitplaats selecteren
    selected_btn = event.target.id;
  };
  let current_filter = ""; // een variabel om de filter string bij te houden
</script>
<style>
  /* NOTE ik ga het style segment niet volproppen met comentaar omdat het redelijk van zelfsprekend is */
  /* styling van element soorten */
  * {
    box-sizing: border-box;
  }
  html {
    background: #333c43;
    color: #D3C6AA;
  }
  body {
    text-align: center;
    font-size: 1.5rem;
  }
  button {
    width:100%;
    height: 20px;
    background:#3a464c;
    color:#a7c080;
    border:0px;
    border-radius:8px;
  }
  button:hover {
    background:#293136;
  }
  button:active {
  background:#55544a;
}
input {
  background:#293136;
  color:#d3c6aa;
  border:0px;
}



  /* styling gebaseerd op ID */
  #plan {
    width: 600px;
    border-radius:8px;
    border: 2px solid #7FBBB3;
  }
 #confirm {
  border:0px;
  background:#3a464c;
  color:#83c092;
}
 #confirm:hover {
  background:#293136;
}
#confirm:active {
  background:#55544a;
}
 #errmsg {
   color : #e67e80;
   font-size: 12px;
   text-align: left;
 }

 /* styling gebaseerd op klasse */
  .sep {
    width: 95%;
    margin-left: 2.5%;
    align-self: center;
    height: 1.5px;
    background: #7FBBB3;
  }
  .container {
    width: 100%;
    display: flex;
    gap: 3rem;
    justify-content: center;
  }
  .available {
    border-radius: 8px;
    border: 2px solid #7FBBB3;
    height: 420px;
    padding: 18px;
    width: 600px;
    text-align: center;
  }
  .scroll {
    height:264px;
    overflow: auto;
}
  .scroll button {
    width:90%;
    background:#3a464c;
    color:#a7c080;
    border:0px;
    border-radius:8px;
  }
  .scroll button:hover {
    background:#293136;
  }
  .scroll button:active {
  background:#55544a;
}
.unavailable {
     border-radius: 8px;
    border: 2px solid #7FBBB3;
    height: 420px;
    padding: 18px;
    width: 600px;
    text-align: center;
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
.virtSep {
    width: 1px;
    height: 412.283px; 
    background: #7FBBB3;
  }
.mailForm {
    padding: 2rem;
    border: 1px solid #7FBBB3;
    border-radius: 8px;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
  }
.right{
    float:right;
}

.left{
    float:left;
}
 .selectBox {
    border: 0px;
    background: #293136;
    color: #d3c6aa;
    font-size: 18px;
    width:176px;
  }
</style>

<html lang="nederlands">
  <head>
  </head>
    <body>
      <!-- title sectie -->
      <h1>ticketree</h1>
    <div class="sep"></div> <br />
      welcome to ticketry : <br>
    CC de Werf - Proclamatie SMI
<br><br>


      <!-- zitplaatsen sectie -->
      <h2>Zitplaatsen</h2>
    <br>
<div class="sep"></div> <br />
        filter ( rijnum.stoelnum ) <br />
  <!-- een manier om te filteren gebaseerd op input :: bind:value... zorgt ervoor dat de text in dit input element gelijkstaat aan een variabel -->
        <input type="text" bind:value={current_filter}>
        <br /> <br />
    <div class="container">
      <div class="available">
        <strong>beschikbaare plaatsen </strong><br>
      <div class="scroll">

      <!-- hier itereren we over elke record ( waarbij bezit == false ) en tonen we het ALS onze filter string in onze zitplaats_id zit  -->
          {#each seats.available as item}  <!-- for each loop -->
            {#if item.zitplaats_id.includes(current_filter)} <!-- filteren -->
            <button id={item.zitplaats_id } on:click={select_seat}> plaats {item.zitplaats_id}</button> <!-- representeer als knopen met de zitplaats_id als id en als text + plaats -->
            {/if}
          {/each}
      </div>
      </div>

<div class="virtSep"></div>
<!-- hier doen we exact hetzelfde maar dan voor de records die bezet zijn, dit doen we om nooit het gevoel te geven dat "mijn plaats er niet in staat" -->
<div class="unavailable">
        <strong>onbeschikbaare plaatsen </strong><br>

      <div class="scroll">
          {#each seats.unavailable as item}
            {#if item.zitplaats_id.includes(current_filter)}
        <button>plaats {item.zitplaats_id}</button><br />
            {/if}
          {/each}

      </div>
    </div>
    </div>
<br />
<div class="sep">

    </div> <br>
<h2>bestell nu</h2>
    <br>
  <div class="mailForm">
    <!-- hier is ons form die we gebruiken om een email door te sturen ( via de Actions sectie in de ts file met een functie => sendMail ) -->
    <form action="?/sendMail" method="POST">

<span class="left">naam</span> <!-- hier nemen we text input en geven wij de input als naam & type bv : 'email', dit kunnen we later in onze ts file gebruiken met een get request om data op te hallen -->
        <span class="right"><input type="naam" name="naam" ></span><br>

        <span class="left">voornaam</span> <!-- hier nemen we text input en geven wij de input als naam & type bv : 'email', dit kunnen we later in onze ts file gebruiken met een get request om data op te hallen -->
        <span class="right"><input type="voornaam" name="voornaam" ></span><br>

        <span class="left">email adress</span> <!-- hier nemen we text input en geven wij de input als naam & type bv : 'email', dit kunnen we later in onze ts file gebruiken met een get request om data op te hallen -->
        <span class="right"><input type="email" name="email" ></span><br>

        <span class="left">leerling id</span>
        <span class="right"><input type="id" name="id" ></span><br>

        <span class="left">authentikatie sleutel</span>
        <span class="right"><input type="key" name="key"> </span><br>

        <span class="left">zitplaats</span>
        <span class="right">
          <select class="selectBox" type="seat" name="seat" bind:value={selected_btn}> <!-- hier 'binden' we een variabel aan deze input zodat we kunnen selecteren door op een knop te drukken ( zie zitplaatsen overzicht ) -->
              {#each seats.available as seat}
                <!-- hier nemen we een combobox en voor elke beschikbaare zitplaats ( van een vorige query ) maken we 1 optie aan ( hierdoor kan de gebruiker geen foute zitplaats invullen ) -->
                <option value={seat.zitplaats_id}> {seat.zitplaats_id} </option>
              {/each}
            </select>
</span>
          <!--  <input type="seat" bind:value={selected_btn} name="seat">    --> <br />
        <span class="left">datum</span>
    <span class="right"> <!-- hier is nog een combobox voor een datum te selecteren -->
          <select class="selectBox" type="date" name="date">
            <option value="eenDatum"> een datum </option> <!-- dummy data -->
            <option value="eenDatum"> een datum </option>
            <option value="eenDatum"> een datum </option>
          </select> <br />
            <button> bestel</button>
    </form>
    <br />
    <p id="errmsg">{seats.errmsg}</p> <!-- hier hebben we een error message dat gewoon plain text is dat we aanpassen naarmate we een exception tegen komen in onze ts file -->
        <br/>
  </div>

        <br/>
      uw ticket zal verstuurd worden via mail
    <br><br>
<div class="sep">  </div>
 <h2> zaal planning</h2>
 <p>klik op de afbeelding om het te downloaden</p>
      <div class="plan-venue"> <a href="https://www.ccdewerf.be/files/download/zaalplan-schouwburg-2019-2020-website.jpg"><img id="plan" src="https://www.ccdewerf.be/files/download/zaalplan-schouwburg-2019-2020-website.jpg" alt=""></a></div> <!-- een foto van de planning -->

    <br /><br />
    </body>
</html>
<!-- gewoon een bar als herrinering -->
<div class="bottomBar">
Gemaakt door : Joshua De Wannemaeker | 6nit | nr 5 | voor GIP opdracht software 2023-2024
    </div>
