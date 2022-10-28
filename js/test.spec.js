// realizar test unitarios para la respuesta del fecth
function revisar_sintaxis_titulo(){

    const data = document.getElementById("titulo").innerHTML
    const regex = /^[a-zA-Z0-9 ]{3,30}$/;
    const result = regex.test(data);
    console.log(result);
    if (typeof data === 'string') console.log("El titulo es un string");

    if(data == "Consulta de saldo") console.log("Titulo correcto");
    
}

//revisar_sintaxis_titulo();

function revisar_titulos_cards_cuentas(){

    const titulo = document.querySelectorAll("#tituloTipoCuenta");
    console.log(titulo);
    
    for (let i = 0; i < titulo.length; i++) {
        const element = titulo[i].innerHTML;
        console.log(element);
    } 


}

revisar_titulos_cards_cuentas();