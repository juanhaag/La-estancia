const cardContainer = document.getElementById("list-card")

document.addEventListener('DOMContentLoaded', traerDatos);
//Variable global que acumula los productos
let productoGlobal=[];

const carrito= [];

cardContainer.addEventListener('click', e => {
    ingresarCarrito(e);
});

function ingresarCarrito(e){
    let setBtnComprarWp = document.getElementById("enviar-carrito");
    if(e.target.classList.contains('btn-secondary')){
        console.log(productoGlobal[e.target.dataset.id])
        carrito.push(productoGlobal[e.target.dataset.id]);
        //Genenerar btn comprar por wp
        setBtnComprarWp.innerHTML= `<a href="https://api.whatsapp.com/send?phone=5492262301420&text=Hola, Quisiera comprar estos productos!
        ${carrito[0].titulo}
        ">
        <button class="btn btn-primary" >Enviar carrito por wp
        </button></a>`
    }
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