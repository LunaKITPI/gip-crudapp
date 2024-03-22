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
  #DB0 {
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
    height: 28px;
  }
.containerFlex button:hover {
    background: #293136;
    color: #DBBC7F;
  }
.containerFlex button:active {
    background: #e67e80;
    color: #293136;
  }
</style>



<html lang="english">
  <body>
    <h1> Admin Panel</h1>
      <div class="sep"></div> <br>
      selecteer een databank :  <br>
      selecteer een record adhv primaire sleutel
      <select name="dabatabses" id="DB0">
      <option value="none">  </option>
        <option value="tblleerlingen"> leerlingen </option>
        <option value="tblwoonplaats"> woonplaats </option>
        <option value="tblklas"> klas </option>
        <option value="tblouders"> ouders </option>
        <option value="tblzit_plaatsen"> zit plaatsen </option>
        <option value="tblzitplaats_type"> zit plaats types</option>
      </select> <br><br>
      <div class="scroll">
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
        <button>primary key</button><br>
      </div>        <br><br>
      <div class="sep"></div>
    <br>
      record data : <br> <br>
    <div class="stats">
    <strong> primaire sleutel </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
    <strong> voorbeeld waarde </strong> <br> <input value="waarde" type="text" readonly> <br>
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

    </div>
  </body>
</html>
