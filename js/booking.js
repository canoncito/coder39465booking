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

displayProducts()
displayCategories()


//Traigo mis productos de la api
async function getProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error(error);
    }
  }

// Traigo los productos dependiendo la categoria

async function getProductsofCategory() {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${selectedCategories}`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
  }
}
  


  async function displayProducts() {
    const products = await getProducts();
    const productList = document.getElementById('lista');

    products.products.forEach(product => {
      const listItem = document.createElement('li');
      
    listItem.innerHTML = `
    
    <div class="accordion" id="accordionExample"  style="width: 600px;">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed boton-acordion" type="button" data-bs-toggle="collapse" data-bs-target="#${product.id}" aria-expanded="false" aria-controls="${product.id}">
        <div class="div-acordion"><img src=${product.images[0]}> <h5 class="card-header">${product.title}</h5> <p class="card-text">$${product.price}</p></div>
        </button>
      </h2>
      
      <div id="${product.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body accordion-shop">
          <h5 class="card-title">${product.description}</h5>
          <input type="number" class="form-control quantity-input" style="width: 100px; margin-right: 10px;" value="1" min="1" max=${product.stock}>
          <button type="button" class="btn btn-primary btn-add-cart">Comprar</button>
        </div>
      </div>
    </div>
    `;
      productList.appendChild(listItem);
    });
  }
  


let selectedCategories = []; // array global para guardar ids de las categorias

// Cargo las categorias que tienen los productos para los filtros
async function displayCategories(){
  const categories = await getProducts()
  const uniqueCategories = new Set(categories.products.map(categoria => categoria.category));
  console.log(categories)
  const categoriesList = document.getElementById('check-categories')
  uniqueCategories.forEach(category => {
    const categoryItem = document.createElement('div')
    categoryItem.innerHTML = `
                <div class="form-check" id="check-categories">
                  <input class="form-check-input checkbox-category" type="checkbox" value="" id="${category}" >
                  <label class="form-check-label label-category" for="flexCheckDefault">
                  ${category}
                  </label>
                </div>
    
    `;
    categoriesList.appendChild(categoryItem)
   // agrego evento 'click' a cada elemento 'input' del checkbox
   const checkbox = categoryItem.querySelector('input[type="checkbox"]');
  //  console.log(selectedCategories)
   checkbox.addEventListener('click', function() {
     if (this.checked) {
       selectedCategories.push(this.id); // si selecciono el checkbox lo guardo en el array global
       getProductsofCategory()
      //  console.log(selectedCategories)
     } else {
       const index = selectedCategories.indexOf(this.id);
       if (index > -1) {
         selectedCategories.splice(index, 1); // si lo deselecciono lo saco del array para la busqueda
       }
     }
     console.log(selectedCategories);
     
   });
   
  })
  
  }
 
  console.log(selectedCategories);
  // console.log(selectedCategories);
  
  // console.log(selectedCategories)

// function arraycheckbox(){
  
//por cada categoria que obtengo de la api los traspaso a mi objeto arraycheckbox para trabajarlos 
// for (let i = 0; i < checkbox.length; i++){
  
//     const pasajeCheckbox = {
//       id: checkbox[i].id
//     }
     
      
      
   
//    }
//    objectCheckbox.push(pasajeCheckbox)
//   //  console.log(objectCheckbox)
// }

 //creo un array temporal para guardar mis categorias
 



 
  // console.log(checkbox)

  // for (let i = 0; i < checkbox.length; i++){
  //   const chequeo = checkbox[i].id
    
  // return checkbox;
  // 
  // arraycheckbox()



  // console.log(arraycheckbox());


  // const objectCheckbox = []

  // function arraycheckbox(){
  // //   const checkbox = document.querySelectorAll('.checkbox-category')
  // //   for (let i = 0; i < checkbox.length; i++){
  
  // //          const pasajeCheckbox = {
  // //            id: checkbox[i].id
  // //          }

  // //          objectCheckbox.push(pasajeCheckbox);
    
  // // }
  // // return objectCheckbox;
  // console.log(categoryItem.innerText)
  // }


  // objectCheckbox.forEach(leer =>{
  //   console.log(leer.id)
  // })
  // console.log(objectCheckbox[])
  // console.log(pasajeCheckbox.id)
   
// const checkbox = document.getElementById('smartphones')
// console.log(checkbox)





// Traigo usuario y tambien la seccion para mostrar su contenido dependiendo el tipo de rol del usuario 
 const usuarioCliente = document.querySelector(".cliente");
 const usuarioAdmin = document.querySelector(".admin");
 const usuarioLogueado = document.querySelector(".user-login");

//  Traigo del storage el user logueado para colocarlo en el dashboard y comprobar el tipo de usuario

const user = localStorage.getItem('userLogueado')
const userParseado = JSON.parse(user)



usuarioLogueado.innerText = userParseado

console.log(usuarioLogueado.textContent)

// Mostrar seccion para permisos que tiene el usuario
if(usuarioLogueado.textContent === 'admin')
{
    console.log(usuarioLogueado.textContent)
    usuarioCliente.remove()
}else{
     usuarioAdmin.remove()
}


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



