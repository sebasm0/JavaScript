class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let productos = [
    new Producto(1, "Teclado mecanico", 45000),
    new Producto(2, "Mouse inalambrico", 22000),
    new Producto(3, "Monitor 24", 180000)
];
let proximoId = 4;

const lista = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");

function renderizar() {
    lista.innerHTML = "";
    const filtro = document.getElementById("inputFiltro").value.toLowerCase();
    for (const p of productos) {
        if (filtro && !p.nombre.toLowerCase().includes(filtro)) continue;
        lista.innerHTML += `
            <li>
                ${p.nombre} - $${p.precio.toLocaleString("es-AR")}
                <button class="eliminar" data-id="${p.id}">Eliminar</button>
            </li>`;
    }
}

document.getElementById("formProducto").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("inputNombre").value.trim();
    const precio = parseInt(document.getElementById("inputPrecio").value);
    if (!nombre || !precio) {
        mensaje.textContent = "Completa nombre y precio";
        return;
    }
    productos.push(new Producto(proximoId, nombre, precio));
    proximoId++;
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputPrecio").value = "";
    mensaje.textContent = "Producto agregado!";
    renderizar();
});

lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const id = parseInt(e.target.dataset.id);
        const index = productos.findIndex(p => p.id === id);
        if (index !== -1) {
            productos.splice(index, 1);
            mensaje.textContent = "Producto eliminado";
            renderizar();
        }
    }
});

document.getElementById("inputFiltro").addEventListener("keyup", renderizar);

renderizar();