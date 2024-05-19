<script lang="ts">
  let selectedOption = "";
  let showYear = false;

  function onChange(event) {
    selectedOption = event.target.value;
    showYear = selectedOption === "tblleerlingen" || selectedOption === "tblklas";
  }


// prisma related functions
  import type { PageData } from './$types'
  export let data: PageData
  $: ({tables} = data )

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
.containerFlex {
    display:flex ;
    justify-content: center;
    gap: 5%;
    width: 100%;
  }
.containerFlex button {
    background: #3a464c;
    color: #DBBC7F;
    border: 0px;
    border-radius: 8px;

    font-size: 22px;
    height: 34px;
    
  }
.containerFlex button:hover {
    background: #293136;
    color: #DBBC7F;
  }
.containerFlex button:active {
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
</style>



<html lang="english">
  <body>
    <h1> Admin Panel</h1>
      <div class="sep"></div> <br>
      selecteer een databank :  <br>
      selecteer een record adhv primaire sleutel
      <select name="dabatabses" id="DB0" on:change={onChange} class="selectBox">
      <option   value="none">  </option>
        <option value="tblleerlingen"> leerlingen </option>
        <option value="tblwoonplaats"> woonplaats </option>
        <option value="tblklas"> klas </option>
        <option value="tblouders"> ouders </option>
        <option value="tblzitplaatsen"> zitplaatsen </option>
        <option value="tblzitplaats_type"> zitplaatstypes</option>
      </select> <br>
      {#if showYear}
        sorteer op schooljaar : <select name="schooljaar" id="SY0" class="selectBox">
      <option value="*"> alle</option>
      <option value="2024-2025"> 2024-2025</option>
      <option value="2023-2024"> 2023-2024</option>
      <option value="2022-2023"> 2022-2023</option>
      </select>
        {/if}
      <br>
      <br />
    {#if selectedOption === 'tblleerlingen'}
      <div class="scroll">
  {#each tables.leerlingen as leerling }
        <button id={leerling.leerling_id} >{leerling.leerling_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblklas'}
      <div class="scroll">
  {#each tables.klassen as klas }
        <button>{klas.klascode_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblouders'}
      <div class="scroll">
  {#each tables.ouders as ouder }
        <button>{ouder.ouder_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblwoonplaats'}
      <div class="scroll">
  {#each tables.woonplaats as woonplaats }
        <button>{woonplaats.woon_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblzitplaatsen'}
      <div class="scroll">
  {#each tables.zit_plaatsen as zitplaats }
        <button>{zitplaats.zitplaats_id}</button><br>
  {/each}
  </div>
  {/if}        

    {#if selectedOption === 'tblzitplaats_type'}
      <div class="scroll">
  {#each tables.zit_plaats_type as type }
        <button>{type.type_id}</button><br>
  {/each}
  </div>
  {/if}        
<br><br>
      <div class="sep"></div>
    <br>
      record data : <br> <br>
  {#if selectedOption == "tblklas"}
    <div class="stats">
    <strong> klascode_id </strong> <br> <input value="" type="text"> <br>
    <strong> klas_beschrijving </strong> <br> <input value="waarde" type="text" > <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  {#if selectedOption == "tblleerlingen"}
    <div class="stats">
    <strong> leerling_id </strong> <br> <input value="" type="text"> <br>
    <strong> naam </strong> <br> <input value="waarde" type="text" > <br>
    <strong> voornaam </strong> <br> <input value="waarde" type="text" > <br>
    <strong> woon_id </strong> <br> <input value="waarde" type="text" > <br>
    <strong> email </strong> <br> <input value="waarde" type="text" > <br>
    <strong> klas </strong> <br> <input value="waarde" type="text" > <br>
    <strong> familie_groep </strong> <br> <input value="waarde" type="text" > <br>
    <strong> zitplaats </strong> <br> <input value="waarde" type="text" > <br>
    <strong> aantal_uitgenodigde </strong> <br> <input value="waarde" type="text" > <br>
    <strong> schooljaar </strong> <br> <input value="waarde" type="text" > <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  {#if selectedOption == "tblouders"}
    <div class="stats">
    <strong> ouder_id </strong> <br> <input value="" type="text"> <br>
    <strong> naam</strong> <br> <input value="waarde" type="text" > <br>
    <strong>voornaam </strong> <br> <input value="waarde" type="text" > <br>
    <strong>familie_groep </strong> <br> <input value="waarde" type="text" > <br>
    <strong>zitplaats </strong> <br> <input value="waarde" type="text" > <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  {#if selectedOption == "tblwoonplaats"}
    <div class="stats">
    <strong> woon_id </strong> <br> <input value="" type="text"> <br>
    <strong>straat  </strong> <br> <input value="waarde" type="text" > <br>
    <strong>nummer  </strong> <br> <input value="" type="text"> <br>
    <strong>postcode  </strong> <br> <input value="" type="text"> <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  {#if selectedOption == "tblzitplaatsen"}
    <div class="stats">
    <strong> zitplaats_id </strong> <br> <input value="" type="text"> <br>
    <strong>bezet  </strong> <br> <input value="waarde" type="text" > <br>
    <strong>type  </strong> <br> <input value="" type="text"> <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  {#if selectedOption == "tblzitplaats_type"}
    <div class="stats">
    <strong> type_id </strong> <br> <input value="" type="text"> <br>
    <strong>beschrijvings_type  </strong> <br> <input value="" type="text"> <br>
    </div>
<br>
      <div class="containerFlex">
      <div>
<button> update </button>
      </div>
      <div>
<button> insert </button>
      </div>
      <div>
<button> delete </button>
      </div>
      <div>
<button> import (csv) </button>
      </div>
    </div>
      <br />

{/if}
  </body>
</html>
<div class="bottomBar">
Gemaakt door : Joshua De Wannemaeker | 6nit | nr 5 | voor GIP opdracht software 2023-2024
    </div>
