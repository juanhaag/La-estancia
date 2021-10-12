const cardContainer = document.getElementById("list-card")

document.addEventListener('DOMContentLoaded', traerDatos);
//Variable global que acumula los productos
let productoGlobal = [];

const carrito = [];

let acumularTitulosCarrito = '';

cardContainer.addEventListener('click', e => {
    ingresarCarrito(e);
});

function ingresarCarrito(e) {
    let targetEvento = e.target;
    if (targetEvento.classList.contains('btn-secondary')) {
        console.log(productoGlobal[targetEvento.dataset.id])
        carrito.push(productoGlobal[targetEvento.dataset.id]);
    }
    if (targetEvento.classList.contains('btn-primary')) {
        comprar();
    }
}

function comprar() {
    let targetEvento = document.getElementById('comprar-btn');
    if (targetEvento.classList.contains('comprar-btn')) {
        recorrerCarrito();
        generarWp(acumularTitulosCarrito);
    }
}
//Agrega en un string los titulos de los productos para despues pasarlo a generarWp()
function recorrerCarrito() {
    carrito.forEach(producto => {
        acumularTitulosCarrito = acumularTitulosCarrito  + '  ' + producto.titulo + ',';
    });
}
//recive los titulos y abre la ventana de wp
function generarWp(acumularTitulosCarrito) {
    let setBtnComprarWp = document.getElementById("enviar-carrito");
    setBtnComprarWp.innerHTML = `<a target="blank" href="https://api.whatsapp.com/send?phone=5492262301420&text=Hola, Quisiera comprar estos productos!
        ${acumularTitulosCarrito}
        ">
        <button class="btn btn-primary" >Enviar carrito por wp
        </button></a>`
}

function traerDatos() {
    const url = 'assets/data/product.json'
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHTML(resultado))
}

function mostrarHTML(productos) {
    const listCard = $('#list-card');
    Object.values(productos).forEach(producto => {
        //const { stock, titulo, precio, imagen } = producto;
        listCard.append(`<div class="card">
        <img class="card-img-top" src=${producto.imagen} alt="Card image cap">
        <div class="card-body">
            <h4 class="card-title text-dark">${producto.titulo}</h4>
            <p class="card-text">$${producto.precio}</p>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary m-1" data-id=${producto.id}>
                Comprar
            </button>
            <button class="btn btn-secondary m-1" data-id=${producto.id}>
                Agregar al carrito
            </button>
        </div>
    </div>`)
    })
    productoGlobal = productos;
}