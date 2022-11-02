# TuringChallenge

## URL del proyecto a pedido: https://luigi-coder.github.io/TuringChallenge/

El proyecto consistio en consumir la siguiente url "https://api.npoint.io/97d89162575a9d816661" ejecutando informacion de cuentas bancarias, se desarrollo una aplicacion web siguiendo los siguientes pasos:

1. Consumir desde una API informacion para luego mostrarlas mediantes cards la informacion de cada cuenta bancaria.

2. Mostrar cada cuenta cuya modena sea en pesos o en dolares.

3. Mostrar cada cuenta cuyo tipo de cuenta sea Caja de Ahorro y Cuenta Corriente.

4. Mostrar dentro de cada card(boton) el tipo de cuenta y el numero de la misma.
5. Mostramos maximo 6 botones por pantalla(vista), en la primera pantalla un maximo de 5 cards(botones) mas un boton de siguiente, en el caso de hacer click en siguiente, se debe de mostrar un boton anterior que permita volver a la anterior información de cuentas, si hay mas cuentas debe de mostrar el boton de siguiente, de lo contrario no.

6. Al hacer click en cualquiera de las cuentas se debe mostrar en pantalla la siguiente información:
    • Saldo
    • Tipo de Cuenta
    • Número de Cuenta

8. Finalmente test unitarios y toda la logica de JS se desarrollo sin ningun tipo de paquetes externos

## Explicacion de la aplicacion paso a paso

1. Primero contamos con una funcion getFetch() encargada de consumir la API, se utilizo el metodo fetch y promesas

2. Segundo contamos con una funcion renderCuentas() encargada de obtener la longitud del array principal(data) que es toda la informacion de la API tranformada, luego obtenemos el total de paginas mediante la division de la longitud del array principal entre la cantidad de items que se quiere mostra por vista(pantalla) para luego hacer un redondeo medinate el objeto Math mediante su metodo .round()

3. Tercero contamos con la funcion cortesAlArrayPrincipal() encargada de cortar el array principal realizando una logica con un for y un metodo de array llamado slice(), cortando el array en base a la cantidad de botones a mostrar en pantalla, aca realice una cosa sumamente arriesgada, la cual fue crear dos objetos uno llamado previo y otro siguiente, para meternos dentro de los arrays cortados, la logica seria la siguiente:

    • Si i que es cada paginacion es === 0, pusheo el objeto siguiente al pedazo del array principal que se llama arr, de esa manera al inicio de la aplicacion se muestra 5 botones con informacion de la cuenta y un boton de mas opciones.

    • Si i es === 1, uso el metodo unshift() para colocar el objeto previo al inicio del array arr, pero aca me encontre con el problema de que necesitaba de alguna manera cambiar el ultimo elemento del array arr por el objeto de siguiente, entonces lo que hice fue capturar el ultimo elemento en una variables que se llama const ultimo = arr[arr.length - 1], luego use pop() para borra ese elementos y luego use push para meter al final de array arr el boton de siguiente de esa manera en la segundo vista, se muestra un boton de Opciones Anteriores , cuatro cunetas y un boton de Mas Opciones.

    • Si i === 2, agrego al inicio del array arr con unshift la variable ultimoComodin que tiene dentro el elemento borrado en el array anterior, luego vuelvo a usar unshift para meter como nuevo primer elemento a el objeto previo, de esa manera cuando se muestre la tercera vista, si no hay mas cuentas no se mostra el boton de Mas Copciones, pero si el de Opciones Anteriores.

4. Cuarto contamos con la funcion getDataDePagina(), la cual recibe como parametro total de paginas variables creada en la funcion renderCuentas(), getDataDePagina(), realiza un forEach a arrayDePaginas[paginaActual], dentro del cual a su vez se llama a la funcion evaluacionTipoCuenta(tipoLetras, cuenta, index, div15, paginaActual), la cual se encarga de mostras las cards segun el tipo de cuneta "Cuenta Corriente o Caja de Ahorro" y tamibien llama a la funcion informacionDeLasCuentas(), la cual se encarga de mostrar las informacion de cada cuenta al hacer click en cada boton de cada cuenta.

5. Quinto contamos con una funcion evaluacionBtnSiguientePrevio() se encarga de la logica de los botones de Mas Opciones o Opciones Anteriores, aumentando o disminuyendo la variable paginaActual, y volviendo a llamar a la funcion getDataDePagina() para poder mostrar la informacion dependiendo del boton que se presione.

6. Sexto, contamos con la funcion evaluacionDelTipoDeMoneda() encargada de la logica de mostrar la informacion de cada cuenta, para poder saber si la moneda es tipo dolares, pesos uruguayos, pesos argentinos, etc.

7. Finalmente tenemos una funcion que se llama volverAlInicio(), la cual se encarga de digirirnos al index.html, la funcion es disparada por el boton salir, que no es el mismo boton de salir, cuando estamos dentro de la informacion de cada cuenta, por que ese boton de salir usa otra logica de mostrar y esconder vistas.

## Test Unitarios
### Para poder visualizar los test unitarios se debera hacer click derecho, luego inspeccionar, luego ir al apartado de consola, y luego presionar el boton que tenemos en la pantalla con el nombre de RUN TEST, el cual ejecuta a la funcion run_test()

Los test unitarios se realizaron en js puro, sin ningun tipo de libreria, ni paquete de tercero:

**Primero** tenemos una funcion que se llama un_test() que invoca dentro de la misma 3 funciones las cuales realizan los tests
    **revisar_titulos_cards_cuentas()** funcion encarga de evaluar que los titulos de todas las cards sean los correctos **"Caja de Ahorro"** y **"Cuenta Corriente"**.
    
    **revisar_numeros_cuentas()** funcion encarga de evaluar que los numeros de las cuentas tengan 12 digitos

    **revisar_paginacion()** funcion encarga de evauar que no se hagan mas click de los posibles.


Luis Salinas.