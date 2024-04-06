<style>
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
  #plan {
    width: 600px;
    border-radius:8px;
    border: 2px solid #7FBBB3;
  }
input {
  background:#293136;
  color:#d3c6aa;
  border:0px;
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

<html lang="english">
  <head>
  </head>
    <body>
      <h1>ticketree</h1>
    <div class="sep"></div> <br />
      welcome to ticketry : <br>
    CC de Werf - Proclamatie SMI

    <br> <br>
      <h2>Zitplaatsen</h2>
    <br>

    <div class="container">
      <div class="available">
        <strong>beschikbaare plaatsen </strong><br>
        filter ( rijnum.stoelnum ) <br />
        <input> <button id="confirm"> Zoek </button>
        <br /> <br />
      <div class="scroll">
        <button>seat 11.12 </button> <br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
        <button>seat 11.12 </button><br />
      </div>
      </div>

<div class="virtSep"></div>
<div class="unavailable">
        <strong>onbeschikbaare plaatsen </strong><br>
      filter ( rijnum.stoelnum ) <br />
        <input> <button id="confirm"> Zoek </button>
        <br /> <br />

      <div class="scroll">
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />
        <button>seat 11.13 </button><br />

      </div>
    </div>
    </div>
<br />
<div class="sep">

    </div> <br>
<h2>bestell nu</h2>
    <br>
  <div class="mailForm">
    <form action="">
        <span class="left"><label for="fnameParent"> voornaam ouder   </label></span>  <span class="right"><input type="text"></span><br>
        <span class="left"><label for="nameParent"> achternaam ouder  </label></span>  <span class="right"><input type="text"></span><br>
        <span class="left"><label for="emailParent"> email ouder      </label></span>  <span class="right"><input type="email"></span><br>
        <span class="left"><label for="fnameChild"> voornaam kind     </label></span>  <span class="right"><input type="text"></span><br>
        <span class="left"><label for="nameChild"> achternaam kind    </label></span>  <span class="right"><input type="text"></span><br>
        <span class="left"><label for="date"> datum                           </label></span> <span class="right"> <select class="selectBox"><option value="eenDatum"> een datum </option><option value="eenDatum"> een datum </option><option value="eenDatum"> een datum </option>
    </form>
        <br/>
  </div>

        <br/>
      uw ticket zal verstuurd worden via mail
    <br><br>
<div class="sep">  </div>
 <h2> zaal planning</h2>
      <div class="plan-venue"> <img id="plan" src="https://www.ccdewerf.be/files/download/zaalplan-schouwburg-2019-2020-website.jpg" alt=""></div>
    <br /><br />
    </body>
</html>
<div class="bottomBar">
Gemaakt door : Joshua De Wannemaeker | 6nit | nr 6 | voor GIP opdracht software 2023-2024
    </div>
