const URL = 'https://api.npoint.io/97d89162575a9d816661';
const D = document;
const ITEMS_POR_PAGINA = 5;


const test = D.getElementById('btnTest');
test.addEventListener('click', () => {
    run_test();
});

D.addEventListener('DOMContentLoaded', () => {
    getFetch(URL)
})

function getFetch(URL){

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        renderCuentas(data);
    })
    .catch(err => console.log(err));
}

// Contantes del DOM
const $padreCuentas = D.getElementById('padreCuentas');
const $cuentas = D.getElementById('cuentas');

let arrayDePaginas = [];
let paginaActual = 0;
let total_de_paginas = 0;

const FIRST_PAGE = 0;
const LAST_PAGE = total_de_paginas - 1;


function renderCuentas(data){
    
    const totalElementos = data.cuentas.length;
    const totalPaginas = Math.round(totalElementos / ITEMS_POR_PAGINA);
    total_de_paginas = totalPaginas;
    
    cortesAlArrayPrincipal(totalPaginas, ITEMS_POR_PAGINA, arrayDePaginas, data);

}

// funcion encargada de cortar el array(API), mediante una logica usando for y slice
// segun la cantidad de elementos que se quiere mostrar en la pantalla o vista
function cortesAlArrayPrincipal(totalPaginas, ITEMS_POR_PAGINA, arrayDePaginas, data){
    // Creacion de dos objetos, para tratarlos como elementos en el array principal, para
    // poder jugar con ellos metiendo y sacando al principio o al final de los pedazos de
    // array
    const BTN_ANTERIOR = {
        "e": "",
        "n": "<< Opciones anteriores",
        "t": "",
        "saldo": "",
        "moneda": "",
        "tipo_letras": "Previo"
    }
    const BTN_SIGUIENTE = {
        "e": "",
        "n": " Mas <br> opciones >>",
        "t": "",
        "saldo": "",
        "moneda": "",
        "tipo_letras": "Siguiente"
    }
    
    let ultimoComodin;
    console.log(ultimoComodin);

    for(let i = 0; i < totalPaginas; i++){

        // Precargamos los botones siguiente y anterior
        if(i === FIRST_PAGE){
            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 
                
            arr.push(BTN_SIGUIENTE);

            arrayDePaginas.push(arr);
            
        }else if(i === LAST_PAGE){

            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 
            // Agregar el elemento de la cuenta 872378326710
            //arr.unshift(ultimoComodin);
            // Agrear el elemento que quitamos en el anterior
            arr.unshift(BTN_ANTERIOR);
                
            arrayDePaginas.push(arr);
        }else {
            const arr = data.cuentas.slice(
                i * ITEMS_POR_PAGINA,
                i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
            ); 

            // Agregar BTN_ANTERIOR al inicio del arr
            arr.unshift(BTN_ANTERIOR);
            // capturar el ultimo elemento del arr
            const ultimo = arr[arr.length - 1];
            
            ultimoComodin = ultimo;
            // cambiar el ultimo elemento del arr por el BTN_SIGUIENTE
            arr.pop();
            arr.push(BTN_SIGUIENTE);

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
        const div15 = D.createElement('div');
        div15.classList.add('col-md-4');

        evaluacionTipoCuenta(tipoLetras, cuenta, index, div15, paginaActual);

        const $infoCuentas = D.getElementById('infoCuentas');
        const $cardsCuentas = D.getElementById('cardsCuentas');        
        const $btnSalir2 = D.getElementById('btnSalir2');

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

        // addEventListener al boton BTN_SIGUIENTE
        div15.addEventListener('click', () => {
            D.querySelector('#cuentas').innerHTML = "";
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
            D.querySelector('#cuentas').innerHTML = "";
            paginaActual--;
            getDataDePagina(paginaActual);
        });
    }
}

// funcion encargada de mostrar la informacion de cada cuenta
function informacionDeLasCuentas(tipoLetras, infoCuentas, cardsCuentas, btnSalir2, moneda, cuenta, div15){

    // addEventListener a cada cuenta, menos a los botones de BTN_SIGUIENTE y BTN_ANTERIOR
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

    const $btnSalir1 = D.getElementById('btnSalir1');

    $btnSalir1.addEventListener('click', (e) => {
        
        e.preventDefault();
        location.href = "index.html";
     
    });

}


