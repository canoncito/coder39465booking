//creo clase pasaje

class Pasaje{
    constructor(id,nombre,precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
}

// Agrego datos a mi objeto pasaje
const miami = new Pasaje(1,'miami',550)
const madrid = new Pasaje(2,'madrid',830)
const mexico = new Pasaje(3,'mexico',147)
const japon = new Pasaje(4,'japon',940)


// Guardo los pasajes en su respectivo arreglo
const pasajes = [miami,madrid,mexico,japon]
console.log(pasajes)


let pasajeElegido = prompt('Seleccione la opcion deseada a donde quiera viajar: \n\n                    1.- Miami \n                    2.- Madrid \n                    3.- Mexico\n                    4.- Japon \n\n Escriba exit si desea salir del programa')

let seguirComprando = true
// Creo un array vacio para ir almacenando los pasajes comprados
const carritoPasaje = [] 


while(seguirComprando === true){
    const pasaje = pasajes.find(pasaje=>pasaje.nombre === pasajeElegido.toLowerCase().trim())
    
    //GUARDAR PRODUCTO EN CARRITO O PREGUNTARLE AL USUARIO UN VUELO EXISTENTE
    if(pasaje){ //Comparo si la variable es undefined
        carritoPasaje.push(pasaje)
    }else{
        pasajeElegido = prompt('Seleccione la opcion correcta: \n\n                    1.- Miami \n                    2.- Madrid \n                    3.- Mexico\n                    4.- Japon \n\n Escriba exit si desea salir del programa')
        continue
    }
    
    let cantPasajes = parseInt(prompt('Ingrese la cantidad de pasajes que desea comprar para ' +pasaje.nombre))
    if(cantPasajes >0){
        alert('Seleccionaste comprar '+cantPasajes+ ' para viajar a '+pasaje.nombre)
        pasaje.cantidad = cantPasajes
        const sigueComprando = prompt('Desea seguir comprando? si-no').toLowerCase().trim()
        if (sigueComprando === 'si'){
            pasajeElegido = prompt('Seleccione la opcion deseada a donde quiera viajar: \n\n                    1.- Miami \n                    2.- Madrid \n                    3.- Mexico\n                    4.- Japon \n\n Escriba exit si desea salir del programa')
        }else{
            seguirComprando = false
        }
    }else{
        alert('Ingrese una cantidad valida de pasajes mayores o iguales a 1')
    }
    
}

console.log(carritoPasaje)
let totalCompra =0

for (const pasaje of carritoPasaje) {
    totalCompra = totalCompra + pasaje.precio * pasaje.cantidad
}

alert('El total de su compra es:    ' + totalCompra + ' USD')


