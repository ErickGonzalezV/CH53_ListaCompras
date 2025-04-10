const txtName = document.getElementById("Name");   //Nombre
const txtNumber = document.getElementById("Number");  //Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal =0;
let totalEnProductos = 0;



function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN
    if(Number(txtNumber.value)<=0){
            return false;
    }//Mayor de 0

    return true;
}//validarCantidad

function getPrecio(){
    return Math.round(Math.random()*10000) / 100; //obtiene un numero random, lo multiplica para que los primeros 4 
    // numeros sean enteros, despues lo redondea y esa cantidad la divide entre 100 para que sean dos numeros enteros
    // y 2 decimales.

}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    let isValid = true; //Validacion Bandera, al ser true permite pasar los datos a la tabla


    //Estas 4 lineas limpian el borde y la alerta, asi como el nombre y numero.
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none"; 
    txtName.style.border="";  //Limpia nombre al dar click a agregar
    txtNumber.style.border=""; //Limpia numero al dar click a agregar


    txtName.value = txtName.value.trim();  //Quita espacios en blancos de name.
    txtNumber.value = txtNumber.value.trim(); //Quita espacios en blanco de number.

    if(txtName.value.length <3){ //cuando la longitud del campo name es menor que 3.
        txtName.style.border="solid medium red"; //cambia el borde a un rojo, solido y mediano.
        alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto.</strong>"; //Este es el mensaje que se muestra en negritas
        alertValidaciones.style.display="block"; //Esto hace que se muestre el cuadro del mensaje de arriba.
        isValid = false;
    }//length >=3

    if(! validarCantidad()){ //Valida si la funcion de cantidad arriba da falso
        txtNumber.style.border="solid medium red"; //Cambia el borde a rojo
        alertValidacionesTexto.innerHTML+="<br/>La cantidad no es correcta.</strong>"; //Muestra este mensaje en negritas (Ojo tiene un += por si ya se estaba mostrando el mensaje de nombre)
        alertValidaciones.style.display="block"; //Muestra el cuadro de arriba.
        isValid = false;
    }//Cuando la cantidad  es menor o igual a cero. 

if(isValid){ //si pasó las validaciones de nombre y numero, hace esto
    cont++; //Aumenta en 1 al contador para cada que se agregue un producto.
    let precio = getPrecio(); //Funcion para llamar el precio random
    let row = `<tr>
                <td>${cont}</td>
                <td>${txtName.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>
                </tr>`; //se toma el contador, el name, number y el precio
    cuerpoTabla.insertAdjacentHTML("beforeend", row); //Esto agrega la fila al final de los elementos actuales de la tabla
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    
    
    
    
    
    txtName.value = "";
    txtNumber.value ="";
    txtName.focus();
}//if isValid


});//btnAgregar