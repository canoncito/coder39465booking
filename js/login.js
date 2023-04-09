// Creo usuarios en formato json
const usuarios = [
    {
        "id" : 1,
        "nombre": "admin",
        "password": "admin123",
        "tipo": "admin"
    },
    {
        "id" : 2,
        "nombre": "roberto",
        "password": "rober123",
        "tipo": "cliente"
    },
    {
        "id" : 3,
        "nombre": "pepito",
        "password": "pepito123",
        "tipo": "cliente"
    },
    {
        "id" : 4,
        "nombre": "norma",
        "password": "norma123",
        "tipo": "cliente"
    },
    {
        "id" : 5,
        "nombre": "eduardo",
        "password": "edu123",
        "tipo": "cliente"
    }
]

// Guardo el json de usuarios en localstorage
 localStorage.setItem('usuarios',JSON.stringify(usuarios))


const formLogin = document.querySelector('#formLogin')
const userLogin = document.querySelector('#user')
const passLogin = document.querySelector('#password')

  // Recupero los usuarios registrados
const userRegister = localStorage.getItem('usuarios')
const consUsers = JSON.parse(userRegister)

formLogin.addEventListener("submit", validateUser)

//funcion que verifico el usuario si es correcto o no

function validateUser(e)
{
    
    e.preventDefault()

    const user = userLogin.value
    const pass = passLogin.value
    
    if(verificarUsuario(user,pass)){
        window.location.href = 'dashboard.html'
        console.log('user correcto')
    }else{
        alert('user o pass incorrectos, verifique los datos ingresados')
    }
}




// Funcion para verificar si user y pass son correctos
function verificarUsuario(user,pass){
    const foundUser = consUsers.find(u => u.nombre === user)
    const foundPass = consUsers.find(p => p.password === pass)
    console.log(foundUser)
     if(foundUser && foundPass){
        // Los traigo separado porque no quiero que me traiga la clave ya que se veria en el storage en un proyecto con base de datos
         localStorage.setItem('userLogueado',JSON.stringify(foundUser.nombre))
          //    VER SI HACE FALTA PASAR EL TIPO DE USUARIO TAMBIEN O NO    
         //  localStorage.setItem('userTipo', JSON.stringify(foundUser.tipo))
         console.log(foundUser)
         return true
     }else{
         return false
     }
    
}


