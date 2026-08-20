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
let producto3 = new Producto(3, "Arroz", 1200, 0);
let productos = [producto1, producto2, producto3];
let opcion = '';

function listarProductos(productos) {
    alert("Lista de productos:");
    for (const p of productos) {
        console.log(p.id + " - " + p.nombre + " - $" + p.precio + " - stock: " + p.stock);
    }
}

function buscarPorNombre(productos, nombre) {
    return productos.find(p => p.nombre === nombre);
}

function listarDisponibles(productos) {
    let disponibles = productos.filter(p => p.stock > 0);
    alert("Productos disponibles:");
    if (disponibles.length === 0) {
        alert("No hay productos con stock.");
    } else {
        for (const p of disponibles) {
            console.log(p.id + " - " + p.nombre + " - $" + p.precio + " - stock: " + p.stock);
        }
    }
}

function totalEnStock(productos) {
    let total = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
    return total;
}

function listarConIva(productos) {
    let conIva = productos.map(p => p.nombre + " - $" + Math.round(p.precio * 1.21));
    alert("Precios con IVA:");
    for (const linea of conIva) {
        console.log(linea);
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

alert("Bienvenido a tu tienda !!!")

while (opcion !== "7" && opcion.toUpperCase() !== "ESC") {
    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 Listar Productos\n" +
        "2 Buscar por Nombre\n" +
        "3 Productos Disponibles\n" +
        "4 Total en Stock\n" +
        "5 Precios con IVA\n" +
        "6 Vender un Producto\n" +
        "7 Salir o escriba ESC."
    )

    switch (opcion.toUpperCase()) {
        case "1":
            listarProductos(productos);
            break;
        case "2":
            let nombre = prompt("Ingrese el nombre del producto:");
            let encontrado = buscarPorNombre(productos, nombre);
            if (encontrado) {
                alert("Producto encontrado: " + encontrado.nombre + " - $" + encontrado.precio + " - stock: " + encontrado.stock);
            } else {
                alert("No se encontro ningun producto con ese nombre");
            }
            break;
        case "3":
            listarDisponibles(productos);
            break;
        case "4":
            alert("Total en stock: $" + totalEnStock(productos));
            break;
        case "5":
            listarConIva(productos);
            break;
        case "6":
            let idVenta = parseInt(prompt("Ingrese el id del producto:"));
            let cantidad = parseInt(prompt("Ingrese la cantidad:"));
            venderProducto(productos, idVenta, cantidad);
            break;
        case "7":
        case "ESC":
            alert("Gracias por usar tu tienda. Hasta la proxima!");
            break;
        default:
            alert("Opción no valida seleccione una opcion del 1 al 7 o escriba ESC, para salir");
            break;
    }
}