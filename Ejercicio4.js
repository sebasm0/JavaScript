let lista = ["Pan", "Leche", "Huevos"];
let opcion = '';

const formatearLista = (lista) => "La lista tiene " + lista.length + " productos.";

function listarCompras(lista) {
    alert("Lista de compras:");
    for (const item of lista) {
        console.log("- " + item);
    }
    alert(formatearLista(lista));
}

function agregarAlFinal(lista, item) {
    lista.push(item);
    return lista;
}

function agregarAlInicio(lista, item) {
    lista.unshift(item);
    return lista;
}

function eliminarUltimo(lista) {
    if (lista.length > 0) {
        let eliminado = lista.pop();
        alert("Se elimino: " + eliminado);
    } else {
        alert("La lista esta vacia.");
    }
    return lista;
}

function eliminarPrimero(lista) {
    if (lista.length > 0) {
        let eliminado = lista.shift();
        alert("Se elimino: " + eliminado);
    } else {
        alert("La lista esta vacia.");
    }
    return lista;
}

function cambiarPorPosicion(lista, posicion, item) {
    if (posicion >= 0 && posicion < lista.length) {
        lista[posicion] = item;
        alert("Posicion " + posicion + " ahora es: " + item);
    } else {
        alert("Posicion invalida. La lista tiene " + lista.length + " productos.");
    }
    return lista;
}

function existeItem(lista, item) {
    return lista.includes(item);
}

function buscarItem(lista, item) {
    let pos = lista.indexOf(item);
    return pos;
}

alert("Bienvenido a tu lista de compras !!!")

while (opcion !== "8" && opcion.toUpperCase() !== "ESC") {
    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 Listar Compras\n" +
        "2 Agregar al Final\n" +
        "3 Agregar al Inicio\n" +
        "4 Eliminar el Ultimo\n" +
        "5 Eliminar el Primero\n" +
        "6 Cambiar por Posicion\n" +
        "7 Buscar un Producto\n" +
        "8 Salir o escriba ESC."
    )

    switch (opcion.toUpperCase()) {
        case "1":
            listarCompras(lista);
            break;
        case "2":
            let nuevo = prompt("Ingrese el producto:");
            lista = agregarAlFinal(lista, nuevo);
            break;
        case "3":
            let nuevoInicio = prompt("Ingrese el producto:");
            lista = agregarAlInicio(lista, nuevoInicio);
            break;
        case "4":
            lista = eliminarUltimo(lista);
            break;
        case "5":
            lista = eliminarPrimero(lista);
            break;
        case "6":
            let pos = parseInt(prompt("Ingrese la posicion:"));
            let nuevoValor = prompt("Ingrese el nuevo producto:");
            lista = cambiarPorPosicion(lista, pos, nuevoValor);
            break;
        case "7":
            let buscar = prompt("Ingrese el producto a buscar:");
            if (existeItem(lista, buscar)) {
                alert("El producto esta en la posicion " + buscarItem(lista, buscar));
            } else {
                alert("El producto no existe en la lista.");
            }
            break;
        case "8":
        case "ESC":
            alert("Gracias por usar tu lista de compras. Hasta la proxima!");
            break;
        default:
            alert("Opción no valida seleccione una opcion del 1 al 8 o escriba ESC, para salir");
            break;
    }
}