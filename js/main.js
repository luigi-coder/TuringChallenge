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
        // Colocar un boton en el HTML
        //revisar_titulos_cards_cuentas();

    })
    .catch(err => console.log(err));
}

// Contantes del DOM
const $padreCuentas = d.getElementById('padreCuentas');
const $cuentas = d.getElementById('cuentas');
//const $previo = d.getElementById('previo');
//const $siguiente = d.getElementById('siguiente');


let arrayDePaginas = [];
let paginaActual = 0;
let total_de_paginas = 0;


function renderCuentas(data){
    
    const totalElementos = data.cuentas.length;
    const totalPaginas = Math.round(totalElementos / ITEMS_POR_PAGINA);
    total_de_paginas = totalPaginas;
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

        // Mostrame 6 items por pagina siempre
        
        //arrayDePaginas[i] = data.cuentas.slice(i * ITEMS_POR_PAGINA, (i * ITEMS_POR_PAGINA) + ITEMS_POR_PAGINA);
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
            //console.log('entro en la dos');
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

    // div de las cuentas
    getDataDePagina(paginaActual);

}


function getDataDePagina(paginaActual){
    console.log('paginaActual', paginaActual);

    arrayDePaginas[paginaActual].forEach((cuenta, index) => {
        
        //console.log(cuenta);
        
        let tipoLetras = cuenta.tipo_letras.toUpperCase();
        //console.log(tipoLetras);
        let moneda = cuenta.moneda
        const div15 = d.createElement('div');
        div15.classList.add('col-md-4');

        
        if(tipoLetras === "CC"){
            //console.log("Existe esta cuenta");
            div15.innerHTML = `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
            <h4 class="nroCuentas" >Nro:${cuenta.n}</h4>
            </div>
            `
        }else if(tipoLetras === "CA"){
            //console.log("Existe esta cuenta");
            div15.innerHTML = `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3 class="tituloTipoCuenta">Caja de Ahorro</h3>
            <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
            </div>
            `
        }else if(tipoLetras === "CCP"){
            div15.innerHTML += `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
            <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
            </div>
            `
        }else if(tipoLetras === "SIGUIENTE" || tipoLetras === "PREVIO"){

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

        //const $divCadaCuenta = d.getElementById(`cadaCuenta${index}`);
        const $infoCuentas = d.getElementById('infoCuentas');
        console.log($infoCuentas);
        const $cardsCuentas = d.getElementById('cardsCuentas');
        
        const $btnSalir2 = d.getElementById('btnSalir2');

        
        //$infoCuentas.hidden = true;
        $btnSalir2.hidden = true;

        // addEventListener a cada cuenta, menos a los botones de siguiente y previo
        if(tipoLetras !== "SIGUIENTE" && tipoLetras !== "PREVIO"){
            div15.addEventListener('click', () => {
                console.log('click en la cuenta');
                console.log(cuenta);
                $infoCuentas.hidden = false;
                $cardsCuentas.hidden = true;
                $btnSalir2.hidden = false;

                $btnSalir2.addEventListener('click', () => {
                    $infoCuentas.hidden = true;
                    $cardsCuentas.hidden = false;
                    $btnSalir2.hidden = true;
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
                }else if(tipoLetras === "CCP"){
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
                }
            })
        }
        

        

        // addEventListener para el boton siguiente
        /* const h3 = div15.querySelector(`#cadaCuenta${index}`);
        h3.addEventListener('click', () => {

            // Borra cuando suceda el evento
            d.querySelector('#cuentas').innerHTML = "";

            paginaActual = paginaActual + 1;
            console.log('paginaActual', paginaActual); */
            
            
            /*getDataDePagina(paginaActual); */

            /* arrayDePaginas[paginaActual].forEach((cuenta, index) => {

                console.log(cuenta);
                
                //d.querySelector('#cuentas').innerHTML = "";
                
                let tipoLetras = cuenta.tipo_letras.toUpperCase();
                //console.log(tipoLetras);
                let moneda = cuenta.moneda
                const div15 = d.createElement('div');
                div15.classList.add('col-md-4');

                
                if(tipoLetras === "CC"){
                    //console.log("Existe esta cuenta");
                    div15.innerHTML += `
                    <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                    <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
                    <h4 class="nroCuentas" >Nro:${cuenta.n}</h4>
                    </div>
                    `
                }else if(tipoLetras === "CA"){
                    //console.log("Existe esta cuenta");
                    div15.innerHTML += `
                    <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                    <h3 class="tituloTipoCuenta">Caja de Ahorro</h3>
                    <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
                    </div>
                    `
                }else if(tipoLetras === "CCP"){
                    div15.innerHTML += `
                    <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                    <h3 class="tituloTipoCuenta">Caja de Ahorro en Pesos</h3>
                    <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
                    </div>
                    `
                }else if(tipoLetras === "SIGUIENTE" || tipoLetras === "PREVIO"){

                    if(tipoLetras === "SIGUIENTE"){

                        //console.log("Existe esta cuenta");
                        div15.innerHTML += `
                        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                        <h3 class="tituloTipo">Mas <br> Opciones >> </h3>`
                    }else if(tipoLetras === "PREVIO"){

                        //console.log("Existe esta cuenta");
                        div15.innerHTML += `
                        <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                        <h3 class="tituloTipo"><< Opciones <br> anteriores</h3>`
                    }
                }

                const h3 = div15.querySelector(`#cadaCuenta${index}`);
                h3.addEventListener('click', () => {
                    
                    d.querySelector('#cuentas').innerHTML = "";

                    paginaActual = paginaActual + 1;
                    console.log('paginaActual', paginaActual);

                    arrayDePaginas[paginaActual].forEach((cuenta, index) => {

                        console.log(cuenta);

                        let tipoLetras = cuenta.tipo_letras.toUpperCase();
                        let moneda = cuenta.moneda
                        const div15 = d.createElement('div');
                        div15.classList.add('col-md-4');
                        
                        if(tipoLetras === "CC"){
                            //console.log("Existe esta cuenta");
                            div15.innerHTML += `
                            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                            <h3 class="tituloTipoCuenta">Cuenta Corriente</h3>
                            <h4 class="nroCuentas" >Nro:${cuenta.n}</h4>
                            </div>
                            `
                        }else if(tipoLetras === "CA"){
                            //console.log("Existe esta cuenta");
                            div15.innerHTML += `
                            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                            <h3 class="tituloTipoCuenta">Caja de Ahorro</h3>
                            <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
                            </div>
                            `
                        }else if(tipoLetras === "CCP"){
                            div15.innerHTML += `
                            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                            <h3 class="tituloTipoCuenta">Caja de Ahorro en Pesos</h3>
                            <h4 class="nroCuentas">Nro:${cuenta.n}</h4>
                            </div>
                            `
                        }else if(tipoLetras === "SIGUIENTE" || tipoLetras === "PREVIO"){

                            if(tipoLetras === "SIGUIENTE"){
        
                                //console.log("Existe esta cuenta");
                                div15.innerHTML += `
                                <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                                <h3 class="tituloTipo">Mas <br> Opciones >> </h3>`
                            }else if(tipoLetras === "PREVIO"){
        
                                //console.log("Existe esta cuenta");
                                div15.innerHTML += `
                                <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
                                <h3 class="tituloTipo"><< Opciones <br> anteriores</h3>`
                            }
                        }

                        $cuentas.appendChild(div15);

                    })



                })

                $cuentas.appendChild(div15);

            }); */
            
           $cuentas.appendChild(div15); 
        });


        /* const $divCadaCuenta = d.getElementById(`cadaCuenta${index}`);
        const $infoCuentas = d.getElementById('infoCuentas');
        const $cardsCuentas = d.getElementById('cardsCuentas');
        const $btnSalir2 = d.getElementById('btnSalir2');

        
        $infoCuentas.hidden = true;
        $btnSalir2.hidden = true; */
        /*$divCadaCuenta.addEventListener('click', () => {
            $infoCuentas.hidden = false;
            $cardsCuentas.hidden = true;
            $btnSalir2.hidden = false;

            $btnSalir2.addEventListener('click', () => {
                $infoCuentas.hidden = true;
                $cardsCuentas.hidden = false;
                $btnSalir2.hidden = true;
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

        });*/


    

    const $btnSalir1 = d.getElementById('btnSalir1');

    $btnSalir1.addEventListener('click', (e) => {
        
        e.preventDefault();
        location.href = "index.html";
     
    });

}

/* function getDataDePagina(indexPagina){

    arrayDePaginas[indexPagina].forEach((cuenta, index) => {
       
        let tipoLetras = cuenta.tipo_letras.toUpperCase();
        console.log(tipoLetras);
        let moneda = cuenta.moneda
        const div15 = d.createElement('div');
        div15.classList.add('col-md-4');

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
        }else {
            div15.innerHTML = `
            <div id="cadaCuenta${index}" class="bg-green text-light contenedorCuentas">
            <h3 class="tituloTipo">Mas <br> Opciones >> </h3>`
        } 
        
        $cuentas.appendChild(div15);

        const $divCadaCuenta = d.getElementById(`cadaCuenta${index}`);
        const $infoCuentas = d.getElementById('infoCuentas');
        const $cardsCuentas = d.getElementById('cardsCuentas');
        
        const $btnSalir2 = d.getElementById('btnSalir2');

        
        $infoCuentas.hidden = true;
        $btnSalir2.hidden = true;
        $divCadaCuenta.addEventListener('click', () => {
            $infoCuentas.hidden = false;
            $cardsCuentas.hidden = true;
            $btnSalir2.hidden = false;

            $btnSalir2.addEventListener('click', () => {
                $infoCuentas.hidden = true;
                $cardsCuentas.hidden = false;
                $btnSalir2.hidden = true;
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

    const $btnSalir1 = d.getElementById('btnSalir1');

    $btnSalir1.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = "indexPrueba.html";
    });
}
 */
