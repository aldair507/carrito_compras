const contenidoCard = document.querySelector(".contenedor-card");
const carritocompra = document.querySelector(".contenido-carrito");
const vaciarCarrito = document.querySelector(".boton-vaciar");
let quitar = [];
let cantidadTotalCarrito = 0;
let totalpagar = 0;

if (localStorage.getItem("productosCarrito")) {
  quitar = JSON.parse(localStorage.getItem("productosCarrito"));
  calcularCantidadTotalCarrito();
  mostrarProducto();
}

registrarProducto();

function registrarProducto() {
  contenidoCard.addEventListener("click", agregarAlcarrito);
}

function agregarAlcarrito(e) {
  if (e.target.classList.contains("añadir-al-carro")) {
    const Pseleccionado = e.target.parentElement;
    leerInfo(Pseleccionado);

    localStorage.setItem("productosCarrito", JSON.stringify(quitar));
    mostrarProducto();
  }
}

function leerInfo(producto) {
  const info = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector(".descripcion").textContent,
    precio: parseFloat(producto.querySelector(".precio").textContent),
    id: producto.querySelector("input").getAttribute("data-id"),
    cantidad: 1,
  };
  const productoExistente = quitar.find((item) => item.id === info.id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
    productoExistente.total =
      productoExistente.cantidad * productoExistente.precio;
  } else {
    info.total = info.cantidad * info.precio;
    quitar.push(info);
  }

  calcularCantidadTotalCarrito();
}

function calcularCantidadTotalCarrito() {
  cantidadTotalCarrito = quitar.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
}

function mostrarProducto() {
  carritocompra.innerHTML = "";
  totalpagar = 0;

  quitar.forEach((producto) => {
    const btn = document.createElement("button");
    btn.classList.add("eliminar");
    btn.textContent = "Eliminar";
    btn.addEventListener("click", () => {
      borrarcont(producto.titulo);
    });

    const mostrar = document.createElement("div");
    mostrar.classList.add("tarjetas");

    totalpagar += producto.total;

    mostrar.innerHTML = `
            <img src="${producto.imagen}" style="width: 100px; height: auto;">
            <h4>${producto.titulo}</h4>
            <h4>${producto.precio}</h4>
            <h4> 
                <span class="cantidadtotal">${producto.cantidad} </span>  
            </h4>
            <h4>SubTotal: $${producto.total}</h4>`;

    mostrar.appendChild(btn);
    carritocompra.appendChild(mostrar);
  });

  const pelemento = document.createElement("h3");
  pelemento.textContent = `Total pagar: $${totalpagar}`;
  carritocompra.appendChild(pelemento);
}

function borrarcont(titulo) {
  quitar = quitar.filter((tal) => tal.titulo !== titulo);
  localStorage.setItem("productosCarrito", JSON.stringify(quitar));
  mostrarProducto();
  console.log(titulo);
}

const iconoCarrito = document.querySelector(".icono-carro");
const contenidoCarrito = document.querySelector("#contenidoCarrito");
const cerrarModal = document.getElementById("cerrarModal");

iconoCarrito.addEventListener("click", () => {
  contenidoCarrito.classList.toggle("desaparecer");
});

cerrarModal.addEventListener("click", () => {
  contenidoCarrito.classList.add("desaparecer");
});

vaciarCarrito.addEventListener("click", () => {
  quitar.length = 0;

  -mostrarProducto();
  console.log("Carrito vaciado");
});
