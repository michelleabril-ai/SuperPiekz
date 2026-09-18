document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.lista');
    
    const contenedorCarrito = document.createElement('div');
    contenedorCarrito.className = 'contenedor-carrito-menu';
    
    const iconoCarrito = document.createElement('span');
    iconoCarrito.className = 'icono-carrito';
    iconoCarrito.innerHTML = '🛒';
    
    const contador = document.createElement('span');
    contador.className = 'contador-carrito';
    contador.textContent = '0';
    
    contenedorCarrito.appendChild(iconoCarrito);
    contenedorCarrito.appendChild(contador);
    menu.appendChild(contenedorCarrito);

    const lateralCarrito = document.createElement('div');
    lateralCarrito.className = 'lateral-carrito';
    lateralCarrito.innerHTML = `
        <div class="lateral-header">
            <h3>Tu Carrito</h3>
            <button class="lateral-cerrar">&times;</button>
        </div>
        <div class="lateral-cuerpo">
            <p class="carrito-vacio">El carrito está vacío</p>
        </div>
        <div class="lateral-footer">
            <div class="lateral-total">Total: <span>$0</span></div>
            <button class="btn-finalizar">Finalizar Compra</button>
            <button class="btn-vaciar">Vaciar Carrito</button>
        </div>
    `;
    document.body.appendChild(lateralCarrito);

    const fondoOscuro = document.createElement('div');
    fondoOscuro.className = 'carrito-fondo-oscuro';
    document.body.appendChild(fondoOscuro);

    const botonesCarrito = document.querySelectorAll('.btn-carrito');
    const cuerpoCarrito = lateralCarrito.querySelector('.lateral-cuerpo');
    const textoTotal = lateralCarrito.querySelector('.lateral-total span');
    let listaProductos = [];

    function actualizarInterfazCarrito() {
        cuerpoCarrito.innerHTML = '';
        if (listaProductos.length === 0) {
            cuerpoCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
            contador.textContent = '0';
            textoTotal.textContent = '\$0';
            return;
        }

        let total = 0;
        listaProductos.forEach((prod, indice) => {
            const item = document.createElement('div');
            item.className = 'carrito-item';
            item.innerHTML = `
                <div>
                    <h4>${prod.nombre}</h4>
                    <span>${prod.precio}</span>
                </div>
                <button class="btn-eliminar-item" data-indice="${indice}">&times;</button>
            `;
            cuerpoCarrito.appendChild(item);
            
            const valorNumerico = parseInt(prod.precio.replace(/[^0-9]/g, ''), 10);
            total += valorNumerico;
        });

        contador.textContent = listaProductos.length;
        textoTotal.textContent = `$${total.toLocaleString('es-CO')}`;

        cuerpoCarrito.querySelectorAll('.btn-eliminar-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-indice'), 10);
                listaProductos.splice(idx, 1);
                actualizarInterfazCarrito();
            });
        });
    }

    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const botonActual = evento.target;
            const tarjetaProducto = botonActual.closest('.producto');
            const nombre = tarjetaProducto.querySelector('h3').textContent;
            const precio = tarjetaProducto.querySelector('.precio').textContent;

            listaProductos.push({ nombre, precio });
            actualizarInterfazCarrito();
            
            contenedorCarrito.classList.add('animar-carrito');
            setTimeout(() => contenedorCarrito.classList.remove('animar-carrito'), 300);

            const textoOriginal = botonActual.textContent;
            botonActual.textContent = '¡Añadido! ✓';
            botonActual.style.backgroundColor = 'var(--azul-verdoso)';
            botonActual.style.color = 'white';
            botonActual.disabled = true;

            setTimeout(() => {
                botonActual.textContent = textoOriginal;
                botonActual.style.backgroundColor = 'transparent';
                botonActual.style.color = 'var(--azul-verdoso)';
                botonActual.disabled = false;
            }, 1500);
        });
    });

    contenedorCarrito.addEventListener('click', () => {
        lateralCarrito.classList.add('activo');
        fondoOscuro.classList.add('activo');
    });

    lateralCarrito.querySelector('.lateral-cerrar').addEventListener('click', () => {
        lateralCarrito.classList.remove('activo');
        fondoOscuro.classList.remove('activo');
    });

    fondoOscuro.addEventListener('click', () => {
        lateralCarrito.classList.remove('activo');
        fondoOscuro.classList.remove('activo');
    });

    lateralCarrito.querySelector('.btn-vaciar').addEventListener('click', () => {
        listaProductos = [];
        actualizarInterfazCarrito();
    });

    lateralCarrito.querySelector('.btn-finalizar').addEventListener('click', () => {
        if (listaProductos.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
            return;
        }
        alert('📦 ¡Gracias por tu compra en SuperPiezak!\nTu pedido está siendo procesado.');
        listaProductos = [];
        actualizarInterfazCarrito();
        lateralCarrito.classList.remove('activo');
        fondoOscuro.classList.remove('activo');
    });
});
