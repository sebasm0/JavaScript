class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let productos = JSON.parse(localStorage.getItem("productos")) ?? [
    new Producto(1, "Teclado mecanico", 45000),
    new Producto(2, "Mouse inalambrico", 22000),
    new Producto(3, "Monitor 24", 180000)
];
let proximoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
let precioDolar = 1200;

const lista = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");
const aviso = document.getElementById("aviso");

function guardar() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function renderizar() {
    lista.innerHTML = "";
    const filtro = document.getElementById("inputFiltro").value.toLowerCase();
    for (const p of productos) {
        const { id, nombre, precio } = p;
        if (filtro && !nombre.toLowerCase().includes(filtro)) continue;
        lista.innerHTML += `
            <li>
                ${nombre} - $${precio.toLocaleString("es-AR")}
                <button class="eliminar" data-id="${id}">Eliminar</button>
            </li>`;
    }
}

setTimeout(() => {
    aviso.textContent = "Cotizacion del dolar hoy: $" + precioDolar.toLocaleString("es-AR");
}, 3000);

document.getElementById("formProducto").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("inputNombre").value.trim();
    const precio = parseInt(document.getElementById("inputPrecio").value);
    if (!nombre || !precio) {
        mensaje.textContent = nombre ? "Precio invalido" : "Falta el nombre";
        return;
    }
    productos.push(new Producto(proximoId, nombre, precio));
    proximoId++;
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputPrecio").value = "";
    mensaje.textContent = "Producto agregado!";
    guardar();
    renderizar();
});

lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const id = parseInt(e.target.dataset?.id);
        try {
            const index = productos.findIndex(p => p.id === id);
            if (index === -1) throw new Error("producto no encontrado");
            productos.splice(index, 1);
            guardar();
            mensaje.textContent = "Producto eliminado";
        } catch (error) {
            mensaje.textContent = "No se pudo procesar la operacion, intenta de nuevo";
        } finally {
            renderizar();
        }
    }
});

document.getElementById("inputFiltro").addEventListener("keyup", renderizar);

renderizar();