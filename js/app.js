document.addEventListener("DOMContentLoaded", function() {
  cargarCarrito();
  renderizarCarrito();

  cargarProductos();

  const inputBuscar = document.getElementById("buscar");
  inputBuscar.addEventListener("input", function() {
    filtrarProductos(this.value);
  });

  document.getElementById("btn-vaciar").addEventListener("click", function() {
    vaciarCarrito();
  });

  document.getElementById("btn-confirmar").addEventListener("click", function() {
    confirmarCompra();
  });
});
