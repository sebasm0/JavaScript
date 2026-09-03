const nombre =  prompt("Nombre?")
const edad_input   =  prompt("¿Cuántos años tienes?")
const nacionalidad =  prompt("Nacionalidad? ")

const edad = parseInt(edad_input)
const calculo_edad = edad * 12

alert("Hola " + nombre + " bienvenido")
console.log("Tu edad en meses es: " + calculo_edad)
console.log("Tu nacionalidad es: " + nacionalidad)