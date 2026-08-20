class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    sumarIva() {
        return this.precio * 1.21;
    }

    vender(cantidad) {
        if (cantidad <= this.stock) {
            this.stock = this.stock - cantidad;
            alert("Vendido: " + cantidad + " de " + this.nombre);
        } else {
            alert("Stock insuficiente de " + this.nombre);
        }
    }

    info() {
        alert(this.nombre + " - precio: $" + this.precio + " - stock: " + this.stock);
    }
}

let producto1 = new Producto(1, "Coca Cola", 1500, 10);
let producto2 = new Producto(2, "Harina", 800, 20);
let producto3 = new Producto(3, "Arroz", 1200, 15);
let productos = [producto1, producto2, producto3];
let opcion = '';

function listarProductos(productos) {
    alert("Lista de productos:");
    for (const p of productos) {
        console.log(p.id + " - " + p.nombre + " - $" + p.precio + " - stock: " + p.stock);
    }
}

function buscarProducto(productos, id) {
    for (const p of productos) {
        if (p.id === id) {
            return p;
        }
    }
    return null;
}

function venderProducto(productos, id, cantidad) {
    let p = buscarProducto(productos, id);
    if (p !== null) {
        p.vender(cantidad);
    } else {
        alert("No existe un producto con id " + id);
    }
}

function precioConIva(productos, id) {
    let p = buscarProducto(productos, id);
    if (p !== null) {
        alert("El precio con IVA de " + p.nombre + " es: $" + Math.round(p.sumarIva()));
    } else {
        alert("No existe un producto con id " + id);
    }
}

alert("Bienvenido a tu tienda !!!")

while (opcion !== "5" && opcion.toUpperCase() !== "ESC") {
    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 Listar Productos\n" +
        "2 Vender un Producto\n" +
        "3 Precio con IVA\n" +
        "4 Ver Info de un Producto\n" +
        "5 Salir o escriba ESC."
    )

    switch (opcion.toUpperCase()) {
        case "1":
            listarProductos(productos);
            break;
        case "2":
            let idVenta = parseInt(prompt("Ingrese el id del producto:"));
            let cantidad = parseInt(prompt("Ingrese la cantidad:"));
            venderProducto(productos, idVenta, cantidad);
            break;
        case "3":
            let idIva = parseInt(prompt("Ingrese el id del producto:"));
            precioConIva(productos, idIva);
            break;
        case "4":
            let idInfo = parseInt(prompt("Ingrese el id del producto:"));
            let pInfo = buscarProducto(productos, idInfo);
            if (pInfo !== null) {
                pInfo.info();
            } else {
                alert("No existe un producto con id " + idInfo);
            }
            break;
        case "5":
        case "ESC":
            alert("Gracias por usar tu tienda. Hasta la proxima!");
            break;
        default:
            alert("Opción no valida seleccione una opcion del 1 al 5 o escriba ESC, para salir");
            break;
    }
}