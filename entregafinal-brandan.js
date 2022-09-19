let btnMostrar = document.getElementById('botonMostrar');
let tablaPedidos = document.getElementById('tabla')
let btnGuardar = document.getElementById('btnGuardar')
let btnBuscar = document.getElementById('btnBuscar')
let ingresoBusqueda = document.getElementById('ingresoBusqueda')
let cardBusqueda = document.getElementById('cardBusqueda')
let busquedaContainer = document.getElementById('busquedaContainer')


// CLASES Y CONSTRUCTOR //

class Pedidos {
    constructor(id, nombre, direccion, telefono, garantia) {
        this.id = id,
            this.nombre = nombre,
            this.direccion = direccion,
            this.telefono = telefono,
            this.garantia = garantia
    }
}

// LISTA DE PEDIDOS TRAIDAS DE ARCHIVO JSON VIA FETCH

let listaPedidos = [];
fetch("listadoPedidos.json")
    .then(pedidos => pedidos.json())
    .then(pedido => {
        let arrayStorage = localStorage.getItem("pedidoStorage") ? listaPedidos = JSON.parse(localStorage.getItem("pedidoStorage")) :
            listaPedidos.push(pedido)
        localStorage.setItem("pedidoStorage", JSON.stringify(listaPedidos))
        listaPedidos = pedido
    });

// AGREGAR NUEVOS ELEMENTOS AL ARRAY

function tomarPedido() {
    let nombreIngresado = document.getElementById("ingresoNombre")
    let dirIngresada = document.getElementById("ingresoDireccion")
    let telIngresado = document.getElementById("ingresoTelefono")
    let gtiaIngresada = document.getElementById("ingresoGarantia")
    let pedidoNuevo = new Pedidos(listaPedidos.length + 1, nombreIngresado.value, dirIngresada.value, telIngresado.value, gtiaIngresada.value)
    listaPedidos.push(pedidoNuevo)
    localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos))
}

// FUNCION DE GUARDADO DE ELEMENTOS A ARRAY

btnGuardar.addEventListener('click', () => {
    if (document.getElementById('ingresoNombre').value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No ha ingresado un nombre.',
            showConfirmButton: false,
            timer: 2000,
        })
    } else if (document.getElementById('ingresoDireccion').value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No ha ingresado una dirección.',
            showConfirmButton: false,
            timer: 2000,
        })
    }
    else if (document.getElementById('ingresoTelefono').value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No ha ingresado un Nro. Telefónico.',
            showConfirmButton: false,
            timer: 2000,
        })

    } else if (document.getElementById('ingresoGarantia').value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No indicó garantía.',
            showConfirmButton: false,
            timer: 2000,
        })

    } else {
        tomarPedido()
        Swal.fire({
            position: 'top',
            toast: 'true',
            icon: 'success',
            title: 'Su pedido ha sido ingresado exitosamente.',
            showConfirmButton: false,
            timer: 2500,
        })
    }
})

// MOSTRAR ARRAY COMPLETO EN TABLA 

const cabeceros = ["Id", "Nombre", "Dirección", "Telefono", "Garantía"];
function crearTabla() {
    let tabla = document.createElement('table')
    let filaCabecera = document.createElement('tr')
    tabla.setAttribute("class", "table table-striped")
    tablaPedidos.setAttribute("class", "table table-striped")

    cabeceros.forEach(textoCabecero => {
        let cabecera = document.createElement('th');
        let nodoTexto = document.createTextNode(textoCabecero);
        cabecera.appendChild(nodoTexto);
        filaCabecera.appendChild(cabecera);
        cabecera.setAttribute("class", "table-primary")
    });
    tabla.appendChild(filaCabecera);
    listaPedidos.forEach(caso => {
        let filaDatos = document.createElement('tr')
        Object.values(caso).forEach(dato => {
            let celdaDato = document.createElement('td');
            let nodoDato = document.createTextNode(dato);
            celdaDato.appendChild(nodoDato);
            filaDatos.appendChild(celdaDato);
            filaDatos.setAttribute("class", "table-striped")
        })
        tabla.appendChild(filaDatos);
    })
    tablaPedidos.appendChild(tabla);
}

// BOTON PARA MOSTRAR Y OCULTAR TABLA DE ARRAYS

btnMostrar.addEventListener('click', () => {
    tabla.innerText == "" ?
        (crearTabla(),
            btnMostrar.innerText = "Ocultar Pedidos") :
        (tabla.innerText = "",
            btnMostrar.innerText = "Mostrar Pedidos");
})

// BUSQUEDA DE ELEMENTOS EN ARRAY

function mostrarResultado(resultado) {
    busquedaContainer.innerHTML = ""
    resultado.forEach((busqueda) => {
        cardBusqueda.innerHTML = `<div class="card text-bg-light border-primary mb-3 " style="width: 35%;">
        <div class="card-body">
            <h4 class="card-title text-center text-bg-light mb-4">Resultado Busqueda</h4>
            <h6 class="card-subtitle">Id. Pedido</h6>
            <p class="card-text">${busqueda.id}</p>
            <h6 class="card-subtitle  ">Nombre</h6>
            <p class="card-text">${busqueda.nombre}</p>
            <h6 class="card-subtitle ">Dirección</h6>
            <p class="card-text">${busqueda.direccion}</p>
            <h6 class="card-subtitle ">Teléfono</h6>
            <p class="card-text">${busqueda.telefono}</p>
            <h6 class="card-subtitle ">Garantía</h6>
            <p class="card-text">${busqueda.garantia}</p>
        </div>
        </div>`
        busquedaContainer.appendChild(cardBusqueda)

    })
}

btnBuscar.addEventListener('click', () => {
    event.preventDefault()
    Swal.fire({
        title: 'Cargando...',
        html: 'Espere por favor.',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
    })
    let busquedaPedido = listaPedidos.filter(pedido => (pedido.telefono == ingresoBusqueda.value))
    if (ingresoBusqueda.value === "") {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'Inserte un valor de búsqueda correcto.',
            showConfirmButton: false,
            timer: 2400,
        })
    } else if (busquedaPedido.length == 0) {
        Swal.fire({
            position: 'top',
            toast: 'error',
            icon: 'error',
            title: 'No hay búsquedas coincidentes.',
            showConfirmButton: false,
            timer: 2400,
        })
    }
    else {
        console.log(busquedaPedido);
        mostrarResultado(busquedaPedido)
    }})




