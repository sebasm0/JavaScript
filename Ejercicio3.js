let saldo = 1000;
let opcion = '';

const formatearSaldo = (saldo) => "$" + saldo;

const consultarSaldo = function (saldo) {
    alert("Su saldo es: " + formatearSaldo(saldo));
}

function depositar(saldo, monto) {
    if (monto > 0) {
        saldo = saldo + monto;
        alert("Su nuevo saldo es: " + formatearSaldo(saldo));
        console.log("Deposito realizado: $" + monto);
    } else {
        alert("Monto invalido, intente nuevamente.");
    }
    return saldo;
}

function retirar(saldo, monto) {
    if (monto > saldo) {
        alert("Fondos insuficientes, su saldo es de: " + formatearSaldo(saldo));
    } else if (monto > 0) {
        saldo = saldo - monto;
        alert("Su nuevo saldo es: " + formatearSaldo(saldo));
        console.log("Retiro realizado: $" + monto);
    } else {
        alert("Monto invalido, intente nuevamente.");
    }
    return saldo;
}

alert("Bienvenido a mi Banco !!!")

while (opcion !== "4" && opcion.toUpperCase() !== "ESC") {
    opcion = prompt(
        "Seleccione una opción:\n" +
        "1 Consultar Saldo\n" +
        "2 Depositar Dinero\n" +
        "3 Retirar Dinero\n" +
        "4 Salir o escriba ESC."
    )

    switch (opcion.toUpperCase()) {
        case "1":
            consultarSaldo(saldo);
            break;
        case "2":
            let deposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));
            saldo = depositar(saldo, deposito);
            break;
        case "3":
            let retiro = parseFloat(prompt("Ingrese la cantidad a retirar:"));
            saldo = retirar(saldo, retiro);
            break;
        case "4":
        case "ESC":
            alert("Gracias por utilizar nuestros servicios, lo/la esperamos nuevamente.");
            break;
        default:
            alert("Opción no valida seleccione una opcion del 1 al 4 o escriba ESC, para salir");
            break;
    }
}