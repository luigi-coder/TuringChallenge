const url = 'https://api.npoint.io/97d89162575a9d816661';
const d = document;
const ITEMS_POR_PAGINA = 5;

const test = d.getElementById('btnTest');
test.addEventListener('click', () => {
    run_test();
});

d.addEventListener('DOMContentLoaded', () => {
    getFetch(url)
})

function getFetch(url){

    fetch(url)
    .then(res => res.json())
    .then(data => {
        renderCuentas(data);
    })
    .catch(err => console.log(err));
}

// Contantes del DOM
const $padreCuentas = d.getElementById('padreCuentas');
const $cuentas = d.getElementById('cuentas');

let arrayDePaginas = [];
let paginaActual = 0;
let total_de_paginas = 0;


function renderCuentas(data){
    
    const totalElementos = data.cuentas.length;
    const totalPaginas = Math.round(totalElementos / ITEMS_POR_PAGINA);
    total_de_paginas = totalPaginas;
    
    cortesAlArrayPrincipal(totalPaginas, ITEMS_POR_PAGINA, arrayDePaginas, data);

}

// funcion encargada de cortar el array(API)
function cortesAlArrayPrincipal(totalPaginas, ITEMS_POR_PAGINA, arrayDePaginas, data){

    const previo = {
        "e": "",
        "n": "<< Opciones anteriores",
        "t": "",
        "saldo": "",
        "moneda": "",
        "tipo_letras": "Previo"
    }
    const siguiente = {
        "e": "",
        "n": " Mas <br> opciones >>",
        "t": "",
        "saldo": "",
        "moneda": "",
        "tipo_letras": "Siguiente"
    }
    let ultimoComodin;

    for(let i = 0; i < totalPaginas; i++){

        if(i === 0){
            //console.log('entro en la cero');
            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 
                
            arr.push(siguiente);

            arrayDePaginas.push(arr); 
            //console.log(arr)
        }else if(i === 1){
            //console.log('entro en la uno');
            
            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 

            // Agregar previo al inicio del arr
            arr.unshift(previo);
            // capturar el ultimo elemento del arr
            const ultimo = arr[arr.length - 1];
            
            ultimoComodin = ultimo;
            // cambiar el ultimo elemento del arr por el siguiente
            arr.pop();
            arr.push(siguiente);

            arrayDePaginas.push(arr);
        }else if(i === 2){
            //console.log(ultimoComodin);
            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 
            // Agregar el elemento de la cuenta 872378326710
            arr.unshift(ultimoComodin);
            // Agrear el elemento que quitamos en el anterior
            arr.unshift(previo);
                
            arrayDePaginas.push(arr); 
            
        }

    }

    getDataDePagina(paginaActual);
}

function getDataDePagina(paginaActual){
    console.log('paginaActual', paginaActual);

    arrayDePaginas[paginaActual].forEach((cuenta, index) => {
        
        let tipoLetras = cuenta.tipo_letras.toUpperCase();
        let moneda = cuenta.moneda
        const div15 = d.createElement('div');
        div15.classList.add('col-md-4');

        evaluacionTipoCuenta(tipoLetras, cuenta, index, div15, paginaActual);

        const $infoCuentas = d.getElementById('infoCuentas');
        const $cardsCuentas = d.getElementById('cardsCuentas');        
        const $btnSalir2 = d.getElementById('btnSalir2');

        $btnSalir2.hidden = true;
      
        informacionDeLasCuentas(tipoLetras, $infoCuentas, $cardsCuentas, $btnSalir2, moneda, cuenta, div15)
                  
        $cuentas.appendChild(div15); 
    });

    volverAlInicio()

}

// funcion encargada mostrar las cards al inicio evaluando en tipo de cuenta
function evaluacionTipoCuenta(tipoLetras, cuenta, index, div15, paginaActual){

    if(tipoLetras === "CC"){
        div15.innerHTML = `
        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
        <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
        <h4 class="nroCuentas" >Nro:${cuenta.n}</h4>
        </div>
        `
    }else if(tipoLetras === "CA"){
        div15.innerHTML = `
        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
        <h3 class="tituloTipoCuenta">Caja de Ahorro</h3>
        <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
        </div>
        `
    }else if(tipoLetras === "CCP"){
        div15.innerHTML = `
        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
        <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
        <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
        </div>
        `
    }else if(tipoLetras === "SIGUIENTE" || tipoLetras === "PREVIO"){
        evaluacionBtnSiguientePrevio(tipoLetras, div15, paginaActual, index);
    }
}

function evaluacionBtnSiguientePrevio(tipoLetras, div15, paginaActual, index){

    if(tipoLetras === "SIGUIENTE"){

        //console.log("Existe esta cuenta");
        div15.innerHTML = `
        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
        <h3 class="tituloTipo">Mas <br> Opciones >> </h3>`

        // addEventListener al boton siguiente
        div15.addEventListener('click', () => {
            d.querySelector('#cuentas').innerHTML = "";
            paginaActual++;
            getDataDePagina(paginaActual);
        });
    }else if(tipoLetras === "PREVIO"){

        //console.log("Existe esta cuenta");
        div15.innerHTML = `
        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
        <h3 class="tituloTipo"><< Opciones <br> anteriores</h3>`

        // addEventListener al boton anterior
        div15.addEventListener('click', () => {
            d.querySelector('#cuentas').innerHTML = "";
            paginaActual--;
            getDataDePagina(paginaActual);
        });
    }
}

// funcion encargada de mostrar la informacion de cada cuenta
function informacionDeLasCuentas(tipoLetras, infoCuentas, cardsCuentas, btnSalir2, moneda, cuenta, div15){

    // addEventListener a cada cuenta, menos a los botones de siguiente y previo
    if(tipoLetras !== "SIGUIENTE" && tipoLetras !== "PREVIO"){
        div15.addEventListener('click', () => {
            console.log('click en la cuenta');
            console.log(cuenta);
            infoCuentas.hidden = false;
            cardsCuentas.hidden = true;
            btnSalir2.hidden = false;

            btnSalir2.addEventListener('click', () => {
                infoCuentas.hidden = true;
                cardsCuentas.hidden = false;
                btnSalir2.hidden = true;
            });

            if(tipoLetras === "CC"){
                evaluacionDelTipoDeMoneda(moneda, cuenta);
            }else if(tipoLetras === "CA"){
                evaluacionDelTipoDeMoneda(moneda, cuenta);
            }else if(tipoLetras === "CCP"){
                evaluacionDelTipoDeMoneda(moneda, cuenta);
            }
        })
    }
}

function evaluacionDelTipoDeMoneda(moneda, cuenta){
    if(moneda === "u$s"){
        infoCuentas.innerHTML = `
        <div class="bg-green logo">
            <img src="img/logo.png" alt="">
        </div>
        <div class="col-md-12">
            <div class="text-center infoCuentas">
                <h3 class="">Consulta tu saldo</h3>
                <h1 class="">Este es tu saldo actual</h1>
                <h4>Saldo de la cuenta: ${cuenta.saldo}u$s</h4>
                <h4>Tipo de cuenta: Cuenta Corriente en Dolares</h4>
                <h4>Número de cuenta:${cuenta.n}</h4>
            </div>
        </div>
        `
    }else if(moneda === "$"){
        infoCuentas.innerHTML = `
        <div class="bg-green logo">
            <img src="img/logo.png" alt="">
        </div>
        <div class="col-md-12">
            <div class="text-center infoCuentas">
                <h3 class="">Consulta tu saldo</h3>
                <h1 class="">Este es tu saldo actual</h1>
                <h4>Saldo de la cuenta: ${cuenta.saldo}$</h4>
                <h4>Tipo de cuenta: Cuenta Corriente en Pesos</h4>
                <h4>Número de cuenta:${cuenta.n}</h4>
            </div>
        </div>
        `
    }else if(moneda === "$uy"){
        infoCuentas.innerHTML = `
        <div class="bg-green logo">
            <img src="img/logo.png" alt="">
        </div>
        <div class="col-md-12">
            <div class="text-center infoCuentas">
                <h3 class="">Consulta tu saldo</h3>
                <h1 class="">Este es tu saldo actual</h1>
                <h4>Saldo de la cuenta: ${cuenta.saldo}$uy</h4>
                <h4>Tipo de cuenta: Cuenta Corriente en Pesos Uruguayos</h4>
                <h4>Número de cuenta:${cuenta.n}</h4>
            </div>
        </div>
        `
    }else if(moneda === "bs"){
        infoCuentas.innerHTML = `
        <div class="bg-green logo">
            <img src="img/logo.png" alt="">
        </div>
        <div class="col-md-12">
            <div class="text-center infoCuentas">
                <h3 class="">Consulta tu saldo</h3>
                <h1 class="">Este es tu saldo actual</h1>
                <h4>Saldo de la cuenta: ${cuenta.saldo}bs</h4>
                <h4>Tipo de cuenta: Cuenta Corriente en Bolivares</h4>
                <h4>Número de cuenta:${cuenta.n}</h4>
            </div>
        </div>
        `
    }
}

function volverAlInicio(){

    const $btnSalir1 = d.getElementById('btnSalir1');

    $btnSalir1.addEventListener('click', (e) => {
        
        e.preventDefault();
        location.href = "index.html";
     
    });

}


