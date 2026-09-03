let saldo = 1000;
let opcion = '';

alert("Bienvenido a mi Banco !!!")

while(opcion !== "4" && opcion.toUpperCase() !== "ESC")
{
    opcion=prompt(
        "Seleccione una opción:\n" +
        "1 Consultar Saldo\n"  +
        "2 Depositar Dinero\n" +
        "3 Retirar Dinero\n"   +
        "4 Salir o escriba ESC."
    )

    switch(opcion.toUpperCase())
    {
        case "1":
            alert("Su saldo es: " + saldo);
            break;
        case "2":
            let deposito=parseFloat(prompt("Ingrese la cantidad a depositar:"));
            if(deposito>0)
            {
                saldo += deposito;
                alert("Su nuevo saldo es: " + saldo);
            }else{
                alert("Monto invalido, intente nuevamente.");
            }
            break;

        case "3":
            let retiro=prompt("Ingrese la cantidad a retirar:");
            
            if(retiro>saldo)
            {
                alert("Fondos insuficientes, su saldo es de: " + saldo)
            }
            else if(retiro>0)
            {
                saldo -= retiro;
                alert("Su nuevo saldo es: " + saldo);
            }else{
                alert("Monto invalido, intente nuevamente.");
            }
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