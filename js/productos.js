let productos = [];

async function cargarProductos() {
  const contenedor = document.getElementById("productos-grid");

  try {
    const respuesta = await fetch("data.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los productos");
    }

    productos = await respuesta.json();
    renderizarProductos(productos);

  } catch (error) {
    contenedor.innerHTML = '<div class="error-mensaje">Error al cargar los productos. Verifica que el archivo data.json existe.</div>';

  } finally {
    document.getElementById("cargando").style.display = "none";
  }
}

function renderizarProductos(lista) {
  const contenedor = document.getElementById("productos-grid");

  if (lista.length === 0) {
    contenedor.innerHTML = '<div class="error-mensaje">No se encontraron productos</div>';
    return;
  }

  contenedor.innerHTML = "";

  const htmlProductos = lista.map(function(producto) {
    const enCarrito = carrito.find(function(item) {
      return item.id === producto.id;
    });
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;
    const stockRestante = producto.stock - cantidadEnCarrito;

    return `
      <div class="producto-card">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
        <h3>${producto.nombre}</h3>
        <div class="precio">$${producto.precio.toLocaleString("es-AR")}</div>
        <div class="stock">Stock: ${stockRestante}</div>
        <button onclick="agregarAlCarrito(${producto.id})" ${stockRestante <= 0 ? "disabled" : ""}>Agregar al carrito</button>
      </div>
    `;
  }).join("");

  contenedor.innerHTML = htmlProductos;
}

function filtrarProductos(texto) {
  const resultado = productos.filter(function(producto) {
    const nombre = producto.nombre.toLowerCase();
    const busqueda = texto.toLowerCase();
    return nombre.includes(busqueda);
  });

  renderizarProductos(resultado);
}
