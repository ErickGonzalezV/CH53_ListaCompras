const txtName = document.getElementById("Name");   //Nombre
const txtNumber = document.getElementById("Number");  //Cantidad
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const btnClear = document.getElementById("btnClear"); //Declaramos el boton clear.

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");


//Numeración de la primera columna de la tabla
let cont = 0; // Contador que se usa para la tabla y para la badge roja
let costoTotal =0; //Variable que muestra el total de productos ya sumado
let totalEnProductos = 0; //Variable que mostrara el total de productos
let datos = new Array(); // Almacena los elementos de la tabla


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
    let elemento = {
                    "cont" : cont,
                    "nombre" : txtName.value,
                    "cantidad" : txtNumber.value,
                    "precio" : precio
                    }; //crea el elemento JSON con el contador, nombre, cantidad y precio

    datos.push(elemento); 

    localStorage.setItem("datos", JSON.stringify(datos)); //guarda como string el json en el localstorage


    cuerpoTabla.insertAdjacentHTML("beforeend", row); //Esto agrega la fila al final de los elementos actuales de la tabla
    costoTotal += precio * Number(txtNumber.value);
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
    
    let resumen = {
        "cont" : cont,
        "totalEnProductos" : totalEnProductos,
        "costoTotal" : costoTotal,
                    }; //crea el elemento JSON con los totales y el contador

        localStorage.setItem("resumen", JSON.stringify(resumen)); //Guarda como string el json en el localStorage NOTA: se hace despues de asignados los valores, ya que sino nos daria 0
    
    txtName.value = "";
    txtNumber.value ="";
    txtName.focus();
}//if isValid
});//btnAgregar.addEventListener

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos") !=null){
    datos = JSON.parse(this.localStorage.getItem("datos"));
}//datos != null
datos.forEach((d) =>{
    let row = `<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>    
                </tr>`;
    cuerpoTabla.insertAdjacentHTML("beforeend", row);
})


    if(this.localStorage.getItem("resumen") !=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;
}//resumen != null
precioTotal.innerText = "$ " + costoTotal.toFixed(2);
productosTotal.innerText = totalEnProductos;
contadorProductos.innerText = cont;
}); //window.addEventListenet load

//Agregar la funcionalidad del botón limpiar
// Borrar local storage
// Borrar alertas
// Borrar productos en tablas
// Borrar campos
// Borrar Resumen



btnClear.addEventListener("click", function(event){
    event.preventDefault();
        //uso remove Item en lugar de clear porque no se si despues se agregara mas informacion que no querramos borrar
        // Solo queremos borrar datos y resumen del local storage
        localStorage.removeItem("datos");
        localStorage.removeItem("resumen");
    
        cuerpoTabla.innerHTML = ""; //Re asigno esta variable para que muestre un espacio vacio
        datos = [];//Re asignamos el arreglo para que se muestre vacio
        cont = 0;//Reseteo contador a 0
        costoTotal = 0;//Reseteo costo total a 0
        totalEnProductos = 0;//Reseteo total en productos a 0.
        //Estas 6 lineas limpian el borde y la alerta, asi como el nombre y numero.
        alertValidacionesTexto.innerHTML = "";
        alertValidaciones.style.display = "none"; // Pa que no se muestre la alerta en caso de haber.
        txtName.style.border = ""; //Quita borde de Name.
        txtNumber.style.border = ""; //Quita borde de cantidad.
        txtName.value = ""; //Quita nombre si estuvieran escritos
        txtNumber.value = ""; //Quita el valor si estuviera escrito

        // Redefino precio, productosTotal y contadorProductos para que see muestren en 0
        precioTotal.innerText = "$ ";
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;

});
