let carrito = [];

function cargarCarrito() {
  const guardado = localStorage.getItem("carrito");

  if (guardado) {
    carrito = JSON.parse(guardado);
  }
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(function(p) {
    return p.id === idProducto;
  });

  if (!producto) {
    return;
  }

  const existente = carrito.find(function(item) {
    return item.id === idProducto;
  });

  const cantidadEnCarrito = existente ? existente.cantidad : 0;
  if (cantidadEnCarrito >= producto.stock) {
    Toastify({
      text: "No hay mas stock disponible",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: { background: "#e74c3c" }
    }).showToast();
    return;
  }

  if (existente) {
    existente.cantidad = existente.cantidad + 1;
  } else {
    const { id, nombre, precio } = producto;
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();
  renderizarProductos(productos);

  Toastify({
    text: producto.nombre + " agregado al carrito",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: "#27ae60" }
  }).showToast();
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(function(item) {
    return item.id !== idProducto;
  });

  guardarCarrito();
  renderizarCarrito();
  renderizarProductos(productos);
}

function cambiarCantidad(idProducto, cambio) {
  const item = carrito.find(function(item) {
    return item.id === idProducto;
  });

  if (!item) {
    return;
  }

  item.cantidad = item.cantidad + cambio;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(idProducto);
    return;
  }

  guardarCarrito();
  renderizarCarrito();
}

function calcularTotal() {
  const total = carrito.reduce(function(sum, item) {
    return sum + (item.precio * item.cantidad);
  }, 0);

  return total;
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  const footer = document.getElementById("carrito-footer");
  const totalElemento = document.getElementById("carrito-total");

  if (carrito.length === 0) {
    contenedor.innerHTML = '<div class="carrito-vacio">El carrito esta vacio</div>';
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";

  contenedor.innerHTML = "";

  carrito.forEach(function(item) {
    const subtotal = item.precio * item.cantidad;

    contenedor.innerHTML += `
      <div class="carrito-item">
        <div class="info">
          <div class="nombre">${item.nombre}</div>
          <div class="subtotal">$${subtotal.toLocaleString("es-AR")} (${item.cantidad} x $${item.precio.toLocaleString("es-AR")})</div>
        </div>
        <div class="controles">
          <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span class="cantidad">${item.cantidad}</span>
          <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </div>
    `;
  });

  const texto = carrito.length === 1 ? "1 producto" : carrito.length + " productos";
  totalElemento.textContent = "Total: $" + calcularTotal().toLocaleString("es-AR") + " (" + texto + ")";
}

function vaciarCarrito() {
  Swal.fire({
    title: "Vaciar carrito",
    text: "Se eliminaran todos los productos del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e74c3c",
    cancelButtonColor: "#95a5a6",
    confirmButtonText: "Si, vaciar",
    cancelButtonText: "Cancelar"
  }).then(function(resultado) {
    const confirmado = resultado.isConfirmed || false;

    if (confirmado) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
      renderizarProductos(productos);

      Toastify({
        text: "Carrito vaciado",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "#e67e22" }
      }).showToast();
    }
  });
}

function confirmarCompra() {
  if (carrito.length === 0) {
    Toastify({
      text: "El carrito esta vacio",
      duration: 2000,
      gravity: "top",
      position: "right",
      style: { background: "#e74c3c" }
    }).showToast();
    return;
  }

  const total = calcularTotal();
  const cantidad = carrito.reduce(function(sum, item) {
    return sum + item.cantidad;
  }, 0);

  Swal.fire({
    title: "Confirmar compra",
    html: "<p>Estas por comprar <b>" + cantidad + " productos</b></p><p style='font-size:20px;margin-top:10px'><b>Total: $" + total.toLocaleString("es-AR") + "</b></p>",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#27ae60",
    cancelButtonColor: "#95a5a6",
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar"
  }).then(function(resultado) {
    const confirmado = resultado.isConfirmed || false;

    if (confirmado) {
      carrito = [];
      guardarCarrito();
      renderizarCarrito();
      renderizarProductos(productos);

      Swal.fire({
        title: "Compra realizada",
        text: "Gracias por tu compra",
        icon: "success",
        confirmButtonColor: "#27ae60"
      });
    }
  });
}
