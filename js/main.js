// Contantes
const url = 'https://api.npoint.io/97d89162575a9d816661';
const d = document;
const ITEMS_POR_PAGINA = 5;

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
const $previo = d.getElementById('previo');
const $siguiente = d.getElementById('siguiente');


let arrayDePaginas = [];
let paginaActual = 0;
let total_de_paginas = 0;


function renderCuentas(data){

    // div de opciones anteriores
    const div = d.createElement('div');
   
    div.classList.add('col-md-4');
    div.classList.add('bg-white');
    div.innerHTML = `
    <div class="contendedorBotones">
        <div hidden id="h3A" class="contenedorOpciones bg-green text-light">
            <h3 class="bg-green"> << Opciones anteriores</h3>            
        </div>
    </div>

    
    `

    //$padreCuentas.appendChild(div);
    $previo.appendChild(div);

    // addEventListener para boton anterior 
    const h3 = div.querySelector('#h3A');
    console.log(h3);
    h3.addEventListener('click', () => {
        
        if(paginaActual - 1 < 0) return;
        paginaActual--;
        console.log(paginaActual);

        getDataDePagina(paginaActual);
        
        if(paginaActual === 0){
            console.log("Verdadero")
            h3.hidden = true;
            h32.hidden = false;

        }else {
            console.log("Falso");
            h3.hidden = false;
        }

        d.querySelector('#cuentas').innerHTML = "";
        getDataDePagina(paginaActual);
    });

    
    const totalElementos = data.cuentas.length;
    const totalPaginas = Math.round(totalElementos / ITEMS_POR_PAGINA);
    total_de_paginas = totalPaginas;

    for(let i = 0; i < totalPaginas; i++){


        const arr = data.cuentas.slice(
            i * ITEMS_POR_PAGINA,
            i * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
        );

        arrayDePaginas.push(arr);


    }

    // div de las cuentas
    getDataDePagina(paginaActual);

    
    // div de mas opciones
    const div2 = d.createElement('div');
    div2.classList.add('col-md-4');
    div2.classList.add('bg-white');
    div2.innerHTML = `
    <div>
        <div id="h3B" class="contenedorOpciones bg-green text-light">
            <h3 class="bg-green"> Mas <br> opciones >> </h3>            
        </div>
    </div>
    
    `
    $siguiente.appendChild(div2);

    // addEventListener para el boton siguiente
    const h32 = div2.querySelector('#h3B');
    h32.addEventListener('click', () => {
        
        if((paginaActual + 1) >= total_de_paginas) return;
        paginaActual++;
        console.log(paginaActual);
        
        getDataDePagina(paginaActual);

        if((paginaActual + 1) === total_de_paginas){
            console.log("Verdadero")
            h32.hidden = true;


        }else {
            console.log("Falso");
            h32.hidden = false;
            h3.hidden = false;

            
        }

        d.querySelector('#cuentas').innerHTML = "";

            getDataDePagina(paginaActual);

    });

    

}

function getDataDePagina(indexPagina){

    arrayDePaginas[indexPagina].forEach((cuenta, index) => {
        console.log(cuenta);
        console.log(cuenta.tipo_letras.toUpperCase());
        let tipoLetras = cuenta.tipo_letras.toUpperCase();
        let moneda = cuenta.moneda
        console.log(moneda);
        const div15 = d.createElement('div');
        div15.classList.add('col-md-4');

        if(tipoLetras === "CC"){
            div15.innerHTML = `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3>Cuenta Corriente</h3>
            <h4>Nro:${cuenta.n}</h4>
            </div>
            `
        }else {
            div15.innerHTML = `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3>Caja de Ahorro</h3>
            <h4>Nro:${cuenta.n}</h4>
            </div>
            `
        }    
        
        $cuentas.appendChild(div15);

        const $divCadaCuenta = d.getElementById(`cadaCuenta${index}`);
        const $infoCuentas = d.getElementById('infoCuentas');
        const $cardsCuentas = d.getElementById('cardsCuentas');
        const $btnSalir = d.getElementById('btnSalir');
        console.log($btnSalir);
        
        $infoCuentas.hidden = true;
        $btnSalir.hidden = true;
        $divCadaCuenta.addEventListener('click', () => {
            $infoCuentas.hidden = false;
            $cardsCuentas.hidden = true;
            $btnSalir.hidden = false;

            $btnSalir.addEventListener('click', () => {
                $infoCuentas.hidden = true;
                $cardsCuentas.hidden = false;
                $btnSalir.hidden = true;
            });

            if(tipoLetras === "CC"){
                if(moneda === "u$s"){
                    $infoCuentas.innerHTML = `
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
                    $infoCuentas.innerHTML = `
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
                    $infoCuentas.innerHTML = `
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
                    $infoCuentas.innerHTML = `
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
            }else if(tipoLetras === "CA"){
                if(moneda === "u$s"){
                    $infoCuentas.innerHTML = `
                    <div class="bg-green logo">
                        <img src="img/logo.png" alt="">
                    </div>
                    <div class="col-md-12">
                        <div class="text-center infoCuentas">
                            <h3 class="">Consulta tu saldo</h3>
                            <h1 class="">Este es tu saldo actual</h1>
                            <h4>Saldo de la cuenta: ${cuenta.saldo}u$s</h4>
                            <h4>Tipo de cuenta: Caja de Ahorro en Dolares</h4>
                            <h4>Número de cuenta:${cuenta.n}</h4>
                        </div>
                    </div>
                    `
                }else if(moneda === "$"){
                    $infoCuentas.innerHTML = `
                    <div class="bg-green logo">
                        <img src="img/logo.png" alt="">
                    </div>
                    <div class="col-md-12">
                        <div class="text-center infoCuentas">
                            <h3 class="">Consulta tu saldo</h3>
                            <h1 class="">Este es tu saldo actual</h1>
                            <h4>Saldo de la cuenta: ${cuenta.saldo}$</h4>
                            <h4>Tipo de cuenta: Caja de Ahorro en Pesos</h4>
                            <h4>Número de cuenta:${cuenta.n}</h4>
                        </div>
                    </div>
                    `
                }else if(moneda === "$uy"){
                    $infoCuentas.innerHTML = `
                    <div class="bg-green logo">
                        <img src="img/logo.png" alt="">
                    </div>
                    <div class="col-md-12">
                        <div class="text-center infoCuentas">
                            <h3 class="">Consulta tu saldo</h3>
                            <h1 class="">Este es tu saldo actual</h1>
                            <h4>Saldo de la cuenta: ${cuenta.saldo}$uy</h4>
                            <h4>Tipo de cuenta: Caja de Ahorro en Pesos Uruguayos</h4>
                            <h4>Número de cuenta:${cuenta.n}</h4>
                        </div>
                    </div>
                    `
                }else if(moneda === "bs"){
                    $infoCuentas.innerHTML = `
                    <div class="bg-green logo">
                        <img src="img/logo.png" alt="">
                    </div>
                    <div class="col-md-12">
                        <div class="text-center infoCuentas">
                            <h3 class="">Consulta tu saldo</h3>
                            <h1 class="">Este es tu saldo actual</h1>
                            <h4>Saldo de la cuenta: ${cuenta.saldo}bs</h4>
                            <h4>Tipo de cuenta: Caja de Ahorro en Bolivares</h4>
                            <h4>Número de cuenta:${cuenta.n}</h4>
                        </div>
                    </div>
                    `
                }
            }

        });

    }); 

}

