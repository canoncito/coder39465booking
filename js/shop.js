

displayProducts()
displayCategories()
// creo carrito para almacenar globalmente mis productos agregados

const carrito = []


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
// let allProducts = []

async function getProductsofCategory() {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${selectedCategories}`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(error);
  }
}

// Muestro los productos de la api
  async function displayProducts() {
    
    // Limpio la lista por si ya realice algun filtro por categoria
    const listita = document.querySelectorAll('.list-products')
    listita.forEach(e => {
      e.remove()
    })
    const products = await getProducts();
    const productList = document.getElementById('lista');

    products.products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.className='list-products'
    listItem.innerHTML = `
    
    <div class="accordion" id="accordionExample"  style="width: 600px;">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#${product.id}" aria-expanded="false" aria-controls="${product.id}">
        <div class="div-acordion"><img src=${product.images[0]}> <h5 class="card-header">${product.title}</h5> <p class="card-text">$${product.price}</p></div>
        </button>
      </h2>
      
      <div id="${product.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body accordion-shop">
          <h5 class="card-title">${product.description}</h5>
          <input type="number" class="form-control quantity-input" style="width: 100px; margin-right: 10px;" value="1" min="1" max=${product.stock}>
          <button type="button" class="btn btn-primary btn-add-cart  data-product-id="${product.id}" data-product-id="${product.id}" data-product-title="${product.title}" data-product-price="${product.price}" data-product-image="${product.images[0]}" >Añadir</button>
        </div>
      </div>
    </div>
    `;
    // console.log(product.id)
      productList.appendChild(listItem);
    });
   
   
 

    const btnBuy = document.querySelectorAll('.btn-add-cart')
    // console.log(btnBuy)
    btnBuy.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const productTitle = btn.dataset.productTitle;
        const productPrice = btn.dataset.productPrice;
        const productImage = btn.dataset.productImage;
      const productQuantity = parseInt(btn.parentNode.querySelector('.quantity-input').value);

      const addCarrito = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: productQuantity
      };
      
      const productFound = carrito.find(prod=>prod.id === btn.dataset.productId)
    
      if (!productFound) {
        
        carrito.push(addCarrito);
        
      }
      else{
        
      

         const index = carrito.findIndex(prod => prod.id === productId);
         carrito[index].quantity += productQuantity;
        
       }
       localStorage.setItem('carrito', JSON.stringify(carrito));
     
      showCarrito()
      })
    })


  
  }


 let selectedCategories = []; // array global para guardar ids de las categorias
let checkboxes = [] //array para guardar el estado del checkbox
// Cargo las categorias que tienen los productos para los filtros
async function displayCategories(){
  const categories = await getProducts()
  const uniqueCategories = new Set(categories.products.map(categoria => categoria.category));
   console.log(categories) //compruebo que cargue todos los productos al principio
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
   
  checkboxes.push(checkbox)
    
   checkbox.addEventListener('click', function() {
  
    
    checkboxes.forEach(chk => {
      if(chk !== this)
      {
        chk.checked = false 
      }
    })

    
      if(this.checked){
        selectedCategories.push(this.id)
        displayProductsofCategory()
         console.log(selectedCategories)
        selectedCategories = [] //limpio el array despues de tocar una categoria porque esta api no permite mostrar mas de una categoria a la vez
        console.log(selectedCategories)
        //  console.log(selectedCategories)
      }else {
          displayProducts()
           const index = selectedCategories.indexOf(this.id);
           if (index > -1) {
             selectedCategories.splice(index, 1); // si lo deselecciono lo saco del array para la busqueda
           }
         }
      
    
     
   });
   
   

 

  })
 
  }
  
async function displayProductsofCategory(){
  
// traigo la clase list products que le agregue al principio cuando traigo todos los productos y asi los filtro sacandolos del dom para
// mostrarme el producto con la categoria correspondiente
  
  const listita = document.querySelectorAll('.list-products')
  listita.forEach(e => {
    e.remove()
  })
 
  //compruebo si estan todos los checkbox desactivados
  

  const productListofCategory = document.getElementById('lista');

  const products = await getProductsofCategory();
  console.log(products)
  
  
  products.products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.className='list-products'
  listItem.innerHTML = `
  
  <div class="accordion" id="accordionExample"  style="width: 600px;">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#${product.id}" aria-expanded="false" aria-controls="${product.id}">
      <div class="div-acordion"><img src=${product.images[0]}> <h5 class="card-header">${product.title}</h5> <p class="card-text">$${product.price}</p></div>
      </button>
    </h2>
    
    <div id="${product.id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body accordion-shop">
        <h5 class="card-title">${product.description}</h5>
        <input type="number" class="form-control quantity-input" style="width: 100px; margin-right: 10px;" value="1" min="1" max=${product.stock}>
        <button type="button" class="btn btn-primary btn-add-cart  data-product-id="${product.id}" data-product-id="${product.id}" data-product-title="${product.title}" data-product-price="${product.price}" data-product-image="${product.images[0]}" >Añadir</button>
      </div>
    </div>
  </div>
  `;
     productListofCategory.appendChild(listItem);
    
  });

const btnBuy = document.querySelectorAll('.btn-add-cart')
    
    btnBuy.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        const productTitle = btn.dataset.productTitle;
        const productPrice = btn.dataset.productPrice;
        const productImage = btn.dataset.productImage;
      const productQuantity = parseInt(btn.parentNode.querySelector('.quantity-input').value);

      const addCarrito = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: productQuantity
      };
      
      const productFound = carrito.find(prod=>prod.id === btn.dataset.productId)
    
      if (!productFound) {
        carrito.push(addCarrito);
      }
      else{
         const index = carrito.findIndex(prod => prod.id === productId);
         carrito[index].quantity += productQuantity;
       }
       localStorage.setItem('carrito', JSON.stringify(carrito));
     
      showCarrito()
      })
    })
}


 const carritoExistente = localStorage.getItem('carrito')
 const carritoParseado = JSON.parse(carritoExistente)

  const thead = document.querySelector('#thead')
  const tbody = document.querySelector('#tbody')
  const tfoot = document.querySelector('#tfoot')
  const parrafoTotal = document.querySelector('#total')

 //Muestro el carrito
 function showCarrito(){

  tbody.innerHTML = ''
            thead.innerHTML = 
            `<tr>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
            </tr>`
        
        let totalCompra = 0
        carrito.forEach(compra => {
            totalCompra+= compra.quantity*compra.price
            tbody.innerHTML +=
            `<tr>
              <td><img class="product-miniatura" src="${compra.image}"></td>
              <td class= "text-center">${compra.title}</td>
              <td class= "text-center">${compra.quantity}</td>
              <td class= "text-center">${compra.quantity*compra.price}</td>
            </tr>
            `
            
        })
        
        parrafoTotal.innerText = `El total de la compra es:    USD ${totalCompra}`
        tfoot.innerHTML =
        `<button type="button" class="btn btn-success btn-compra">Comprar</button>
        <button type="button" class="btn btn-success btn-vaciar">Vaciar carrito</button>`
        //Accedo al boton compra
        const compra = document.querySelector('.btn-compra')
        const vaciar = document.querySelector('.btn-vaciar')
        compra.addEventListener("click",alertaCompra)
        vaciar.addEventListener("click",vacio)
        // window.location.reload()
 }


 //pongo alerta para la compra de productos
function alertaCompra(){
  
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Gracias por su compra',
    showConfirmButton: false,
  timer: 2000
}).then(() => {
    thead.innerHTML = ''
    tbody.innerHTML = ''
    parrafoTotal.innerHTML= ''
    tfoot.innerHTML = ''
    localStorage.removeItem('carrito')
      window.location.reload();
  });
  // Elimino la clave del carrito del localstorage
 
// Limpio la informacion que pueda contener todavia el carrito
 
 
  
  console.log(carrito)
 displayProducts()

}

//Vacio lo que hay en el carrito y recargo la pagina
function vacio()
{
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: 'Carrito vaciado con exito',
    showConfirmButton: false,
  timer: 2000
}).then(() => {
    thead.innerHTML = ''
    tbody.innerHTML = ''
    parrafoTotal.innerHTML= ''
    tfoot.innerHTML = ''
    localStorage.removeItem('carrito')
      window.location.reload();
  });
}



// Traigo usuario y tambien la seccion para mostrar su contenido dependiendo el tipo de rol del usuario 
 const usuarioCliente = document.querySelector(".cliente");
 const usuarioLogueado = document.querySelector(".user-login");

//  Traigo del storage el user logueado para colocarlo en el dashboard y comprobar el tipo de usuario

const user = localStorage.getItem('userLogueado')
const userParseado = JSON.parse(user)

usuarioLogueado.innerText = userParseado






