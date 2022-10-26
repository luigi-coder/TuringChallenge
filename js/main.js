
const url = 'https://api.npoint.io/97d89162575a9d816661';
const d = document;
const data = fetch(url)
.then(response => response.json())
.then(data => {
    renderCuentas(data);
});

const $padreCuentas = d.getElementById('padreCuentas');
const $cuentas = d.getElementById('cuentas');


let arrayDePaginas = [];
let paginaActual = 0;
let total_de_paginas = 0;

// constantes
const ITEMS_POR_PAGINA = 5;

function renderCuentas(data){

    // div de opciones anteriores
    const div = d.createElement('div');
    div.classList.add('col-md-4');
    div.classList.add('bg-white');
    div.innerHTML = `
    <div id="h3A" class="bg-green text-light">
        <h3 class="p-3 bg-green"> << Opciones anteriores</h3>            
    </div>
    `

    $padreCuentas.appendChild(div);

    // addEventListener para el h3  
    const h3 = div.querySelector('#h3A');
    h3.addEventListener('click', () => {
        
        if(paginaActual - 1 < 0) return;
        paginaActual--;
        console.log(paginaActual);

        getDataDePagina(paginaActual);
        
        /* if(paginaActual === 0){
            h3.style.display = 'none';
        }else {
            h3.style.display = 'block';
        } */


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
    <div id="h3B" class="bg-green text-light">
        <h3 class="p-3 bg-green"> Mas opciones >> </h3>            
    </div>
    
    `
    $padreCuentas.appendChild(div2);

    // addEventListener para el h3
    const h32 = div2.querySelector('#h3B');
    h32.addEventListener('click', () => {
        
        if((paginaActual + 1) >= total_de_paginas) return;
        paginaActual++;
        console.log(paginaActual);
        
        getDataDePagina(paginaActual);

        /* if((paginaActual + 1) === total_de_paginas){
            h32.style.display = 'none';
        }else {
            h32.style.display = 'block';
        } */

    });

    

}

function getDataDePagina(indexPagina){

    arrayDePaginas[indexPagina].forEach(cuenta => {

        const div15 = d.createElement('div');
        div15.classList.add('col-md-4');
        div15.classList.add('bg-white');
        div15.innerHTML = `
        <div class="col-md-4bg-white">
            <div class="bg-green text-light">
                <h3>Cuenta Corriente</h3>
                <h4>Nro:${cuenta.n}</h4>
            </div>
        </div>
        `
        $padreCuentas.appendChild(div15);
    }); 
}

