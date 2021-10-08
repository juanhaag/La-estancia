document.addEventListener('DOMContentLoaded', traerDatos);
const carrito= [];

function traerDatos() {
    const url = 'assets/data/product.json'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHTML(resultado))
        .then(resultado => console.log(resultado));
}

function mostrarHTML(productos) {

    const listCard = $('#list-card')

    Object.values(productos).forEach(producto => {
        const { stock, titulo, precio, imagen } = producto;

        listCard.append(`<div class="card">
        <img class="card-img-top" src=${producto.imagen} alt="Card image cap">
        <div class="card-body">
            <h4 class="card-title text-dark">${producto.titulo}</h4>
            <p class="card-text">$${producto.precio}</p>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary m-1" dataset-id=${producto.id}>
                Comprar
            </button>
            <button class="btn btn-secondary m-1" dataset-id=${producto.id}>
                Agregar al carrito
            </button>
        </div>
    </div>`)
    })

}