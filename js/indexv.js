// Recupero del DOM
const divPasajes = document.getElementById('divPasajes');

// Datos de pasajes en formato json

const pasajes = [
    {
        "id" : 1,
        "img": "./img/miami.jpg",
        "nombre": "Miami",
        "precioxpersona": 400,
        "stock": 35
    },
    {
        "id" : 2,
        "img": "./img/mexico.jpg",
        "nombre": "Cancun",
        "precioxpersona": 147,
        "stock": 25
    },
    {
        "id" : 3,
        "img": "./img/japon.jpg",
        "nombre": "Tokio",
        "precioxpersona": 940,
        "stock": 5
    },
    {
        "id" : 4,
        "img": "./img/japon.jpg",
        "nombre": "Madrid",
        "precioxpersona": 125,
        "stock": 10
    },
    {
        "id" : 5,
        "img": "./img/japon.jpg",
        "nombre": "Sichuan",
        "precioxpersona": 1873,
        "stock": 3
    },
    {
        "id" : 6,
        "img": "./img/japon.jpg",
        "nombre": "Shenzen",
        "precioxpersona": 956,
        "stock": 40
    },
    {
        "id" : 7,
        "img": "./img/japon.jpg",
        "nombre": "Punta del este",
        "precioxpersona": 1055,
        "stock": 55
    },
    {
        "id" : 8,
        "img": "./img/japon.jpg",
        "nombre": "Toronto",
        "precioxpersona": 1630,
        "stock": 4
    },
    {
        "id" : 9,
        "img": "./img/japon.jpg",
        "nombre": "Budapest",
        "precioxpersona": 830,
        "stock": 15
    }
]

pasajes.forEach(vuelo=>{

    divPasajes.innerHTML += `<div class="card cardVuelo text-center">
    <div class="card-body">
    <img class="vuelo-img rounded mx-auto d-block" src="${vuelo.img}" alt="imagen de vuelo ${vuelo.nombre}">
    <h5 class="card-title">${vuelo.nombre}</h5>
    <p class="card-text">USD ${vuelo.precioxpersona}</p>
    <button id=${vuelo.id} class='btn btn-info'>AGREGAR</button>
    </div>
    </div>`
})


// Guardo productos en el carrito
const carrito= []
// Creo la funcion guardar en cada boton
const botonesAgregar = document.querySelectorAll('.btn-info')
botonesAgregar.forEach(boton=>{
    boton.onclick = ()=>{
        // const pasaje = pasajes.find(v=v.id===boton.id)
         const pasaje = pasajes.find(vuelo=>vuelo.id ===parseInt(boton.id))
         
         const pasajeCarrito = {
            id: pasaje.id,
            nombre: pasaje.nombre,
            img: pasaje.img,
            precioxpersona: pasaje.precioxpersona,
            cantidad: 1
         }

         const vueloEnCarrito = carrito.find(vuelo=>vuelo.id === pasajeCarrito.id)
         if(!vueloEnCarrito)
         {
            carrito.push(pasajeCarrito)
         } else{
            vueloEnCarrito.cantidad++
         }

        //  
         console.log(carrito)
        
    }
})


// Boton finalizar la compra

const botonFinalizar = document.querySelector('#finalizar')

const thead = document.querySelector('#thead')
const tbody = document.querySelector('#tbody')
const parrafoTotal = document.querySelector('#total')


botonFinalizar.onclick = ()=>{
    thead.innerHTML = 
    `<tr>
        <th scope="col"></th>
        <th scope="col">Destino</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
    </tr>`

let totalCompra = 0
carrito.forEach(vuelo => {
    totalCompra+= vuelo.cantidad*vuelo.precioxpersona
    tbody.innerHTML +=
    `<tr>
      <td><img class="vuelo-miniatura" src="${vuelo.img}" alt="imagen de vuelo ${vuelo.nombre}"></td>
      <td class= "text-center">${vuelo.nombre}</td>
      <td class= "text-center">${vuelo.cantidad}</td>
      <td class= "text-center">${vuelo.cantidad*vuelo.precioxpersona}</td>
    </tr>`
})
 localStorage.setItem('carrito', JSON.stringify(carrito));
 parrafoTotal.innerText = `El total de la compra es:    USD ${totalCompra}`
 
}

const recuperarCarrito = localStorage.getItem('carrito')
const carritoMostrar = JSON.parse(recuperarCarrito) 

console.log(recuperarCarrito)
// Prueba para ver si muestra en vivo
   
        verCarrito.onclick = ()=>{
            thead.innerHTML = 
            `<tr>
                <th scope="col"></th>
                <th scope="col">Destino</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
            </tr>`
        
        let totalCompra = 0
        carritoMostrar.forEach(vuelo => {
            totalCompra+= vuelo.cantidad*vuelo.precioxpersona
            tbody.innerHTML +=
            `<tr>
              <td><img class="vuelo-miniatura" src="${vuelo.img}" alt="imagen de vuelo ${vuelo.nombre}"></td>
              <td class= "text-center">${vuelo.nombre}</td>
              <td class= "text-center">${vuelo.cantidad}</td>
              <td class= "text-center">${vuelo.cantidad*vuelo.precioxpersona}</td>
            </tr>`
        })
        
         parrafoTotal.innerText = `El total de la compra es:    USD ${totalCompra}`    
        }
    
    

    
    // document.addEventListener("DOMContentLoaded", () => {
    //     carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    //     mostrarCarrito();
    //     document.querySelector("#activarFuncion").click(procesarPedido);
    //   });



