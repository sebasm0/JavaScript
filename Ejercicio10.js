class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let productos = [];
let proximoId = 1;
let precioDolar = 1200;

const lista = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");
const aviso = document.getElementById("aviso");

function renderizar() {
    lista.innerHTML = "";
    const filtro = document.getElementById("inputFiltro").value.toLowerCase();
    for (const p of productos) {
        const { id, nombre, precio, stock } = p;
        if (filtro && !nombre.toLowerCase().includes(filtro)) continue;
        lista.innerHTML += `
            <li>
                ${nombre} - $${precio.toLocaleString("es-AR")} (stock ${stock})
                <button class="eliminar" data-id="${id}">Eliminar</button>
            </li>`;
    }
}

async function cargarProductos() {
    lista.innerHTML = "<li>Cargando productos...</li>";
    try {
        const respuesta = await fetch("./data.json");
        if (!respuesta.ok) throw new Error("respuesta fallida");
        const datos = await respuesta.json();
        productos = datos;
        proximoId = productos[productos.length - 1].id + 1;
        renderizar();
        Toastify({ text: "Productos cargados con exito", duration: 2000, gravity: "bottom", style: { background: "#4CAF50" } }).showToast();
    } catch (error) {
        lista.innerHTML = "<li>No se pudieron cargar los productos</li>";
        Toastify({ text: "Error al cargar los productos", duration: 2000, gravity: "bottom", style: { background: "red" } }).showToast();
    }
}

setTimeout(() => {
    aviso.textContent = "Cotizacion del dolar hoy: $" + precioDolar.toLocaleString("es-AR");
}, 3000);

document.getElementById("formProducto").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("inputNombre").value.trim();
    const precio = parseInt(document.getElementById("inputPrecio").value);
    const stock = parseInt(document.getElementById("inputStock").value);
    if (!nombre || !precio || !stock) {
        mensaje.textContent = !nombre ? "Falta el nombre" : (!precio ? "Precio invalido" : "Stock invalido");
        return;
    }
    productos.push(new Producto(proximoId, nombre, precio, stock));
    proximoId++;
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputPrecio").value = "";
    document.getElementById("inputStock").value = "";
    Toastify({ text: "Producto agregado", duration: 2000, gravity: "bottom", style: { background: "#4CAF50" } }).showToast();
    renderizar();
});

lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const id = parseInt(e.target.dataset?.id);
        try {
            const index = productos.findIndex(p => p.id === id);
            if (index === -1) throw new Error("producto no encontrado");
            productos.splice(index, 1);
            Toastify({ text: "Producto eliminado", duration: 2000, gravity: "bottom", style: { background: "#4CAF50" } }).showToast();
            renderizar();
        } catch (error) {
            Toastify({ text: "No se pudo procesar la operacion", duration: 2000, gravity: "bottom", style: { background: "red" } }).showToast();
        }
    }
});

document.getElementById("inputFiltro").addEventListener("keyup", renderizar);

cargarProductos();