const btnSimular = document.querySelector("#btnSimular");

const simulador = document.querySelector(".content");

const output = document.querySelector(".output");

const btnNovamente  = document.querySelector("#btnNovamente");

btnSimular.addEventListener('click', function(){


	getApi();


});


async function getApi(){

    var nome = document.querySelector("#nome").value;

    var mensalidade = document.querySelector("#mensalidade").value;

    var taxaDeJuros = document.querySelector("#taxaDeJuros").value;

    var tempo = document.querySelector("#tempo").value;

    data = {
    expr: [
      `${mensalidade} * (((1 + ${taxaDeJuros}) ^ ${tempo} - 1) / ${taxaDeJuros})`
    ],
    "precision": "14"
    
    }

    dataString = JSON.stringify(data);

  
    try{

    let response = await fetch("https://api.mathjs.org/v4/", {
     method:'POST',
     body: dataString,
     contentType: 'text/plain',

        
    });

    var dados = {};

    dados = await response.json()
 
  }catch(err){
            
        console.log('fetch failed', err);
              
         
  }finally{
      
     console.log(dados);

     let nomeOutput = document.querySelector("#nomeOutput");

     let dinheiroOutput = document.querySelector("#dinheiro");

     let resultadoOutput = document.querySelector("#result");

     let tempoOutput = document.querySelector("#tempoOutput");

     nomeOutput.innerText = nome;

     dinheiroOutput.innerText = `R$${mensalidade}`;
    
     resultadoOutput.innerText = `R$${dados.result}`;

     tempoOutput.innerText = `${tempo} Mesês.`;

      fadeOut(simulador); 

    
      fadeIn(output); 

 }

}


btnNovamente.addEventListener('click', function(){


	   fadeOut(output); 

     fadeIn(simulador); 


});








function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
