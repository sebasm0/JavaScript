# Proyecto Final - Tienda Online

Un simulador de tienda online donde podes ver productos, buscarlos, agregarlos al carrito y comprar.

## Que hace la pagina

- Muestra 6 productos con imagen y precio
- Tenes un buscador para filtrar por nombre
- Podes agregar productos al carrito
- Se pueden sumar o restar cantidades
- Se puede borrar productos del carrito
- Muestra el total de todo lo que elegiste
- Cuando confirmas la compra te sale un cartel con SweetAlert2
- Muestra notificaciones con Toastify cuando haces algo
- El stock se va descontando cuando agregas y vuelve si vacias el carrito
- El carrito se guarda en localStorage asi que si recargas la pagina no se pierde

## Archivos

```
index.html          La pagina principal
data.json           Los productos con sus imagenes
css/style.css       Los estilos de la pagina
js/productos.js     Carga los productos y los muestra
js/carrito.js       Todo lo del carrito
js/app.js           Arranca todo cuando carga la pagina
```

## Herramientas que use

- JavaScript comun, sin frameworks
- SweetAlert2 para las alertas
- Toastify para las notificaciones
- localStorage para guardar el carrito
- Fetch para leer el data.json
