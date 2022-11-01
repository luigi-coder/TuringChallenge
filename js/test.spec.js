function run_test(){

    revisar_titulos_cards_cuentas()
    revisar_numeros_cuentas()
    
    if(revisar_paginacion()){
        console.error("ERROR: El test no permite leer mas paginas de las posibles");
    }else {
        console.info("El test permite leer mas paginas de las posibles");
    }
}


// FUNCION ENCARGADA DE REVISAR LOS TITULOS DE CADA TARJETA DE CADA CUENTA
function revisar_titulos_cards_cuentas() {

    const titulo = document.querySelectorAll(".tituloTipoCuenta");

    console.log("TESTEANDO LOS TITULOS DE LAS CARDS CUENTAS");

    titulo.forEach(element => {
        let cuentaTipo = element.innerHTML;
        if (cuentaTipo === "Caja de Ahorro") console.log("Caja de Ahorro - Titulo correcto");
        if (cuentaTipo === "Cuenta Corriente") console.log("Cuenta Corriente - Titulo correcto");
    });
}

// FUNCION ENCARGADA DE REVISAR QUE LOS NUMEROS DE LAS CUENTAS TENGAS 12 DIGITOS
function revisar_numeros_cuentas() {

    const nroCuentas = document.querySelectorAll(".nroCuentas");
    console.log("TESTEANDO LOS NUMEROS DE LAS CUENTAS");

    nroCuentas.forEach((element) => {

        let cuentaNro = element.innerHTML;
        cuentaNro = cuentaNro.substring(4);

        if (cuentaNro.length === 12) {
            console.log("Numero de cuenta correcto")
        } else {
            console.log("Se encontro una cuenta sin numero de cuenta");
        }
    })
}

// FUNCION ENCARGADA DE NO PERMITIR LEER MAS PAGINAS DE LAS POSIBLES
function revisar_paginacion() {

    const btnSiguiente = document.getElementById("h3B");

    try{
        for(let i = 0; i < 100; i++){
            btnSiguiente.click();
            console.log("Click" + (i+1));
        }
        return true;
    }
    catch(err){
        console.log("No se puede seguir paginando");
        return false;
    }
}
