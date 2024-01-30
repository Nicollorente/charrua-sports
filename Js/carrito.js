let productosEnCarrito = (localStorage.getItem ("productos-en-carrito"));
productosEnCarrito= JSON.parse(productosEnCarrito);

const contenedorCarritoVacio= document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#contenedor-productos-carrito");
const eliminarProductos= document.querySelector("#eliminar-productos");
const finalizarCompra= document.querySelector("#compra-total");
const compraFinalizada = document.querySelector("#compra-exitosa")
const contenedorBotones= document.querySelector("#boton-eliminar-comprar")
const total= document.querySelector("#total")
let botonEliminar = document.querySelectorAll(".icon-eliminar")


function cargarProductosEnCarrito(){
    if (productosEnCarrito && productosEnCarrito.length >0 ){
        contenedorCarritoVacio.classList.add("disabled")
        contenedorProductos.classList.remove("disabled")
        eliminarProductos.classList.remove("disabled")
        contenedorBotones.classList.remove("disabled")
        compraFinalizada.classList.add("disabled")
    
        contenedorProductos.innerHTML = "";
    
    productosEnCarrito.forEach(producto=>{
    
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML=
    `<img src="${producto.imagen}"
    alt="${producto.titulo}" class="img-carrito">
    <div>
    <small>Titulo</small>
    <p class="titulo">${producto.titulo}</p>
    </div>
    <div>
    <small class="precio" >Precio</small>
    <p class="precio-carrito-img">${producto.precio}</p>
    </div>
    <div class="cantidad-carrito">
    <small>Cantidad</small>
    <p class="cantidad-carrito-num">${producto.cantidad}</p>
    </div>
    
    <div  class="sub-total">
    <small>Subtotal</small>
    <p>${producto.precio * producto.cantidad}</p>
    </div>
    <div>
    <button class="icon-eliminar" id="${producto.id}"> <i class="bi bi-trash-fill"></i></button>
    </div>`;
    
    contenedorProductos.append(div);
    
    })
    
    }
    else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        eliminarProductos.classList.remove("disabled");
        contenedorBotones.classList.add("disabled");
        compraFinalizada.classList.add("disabled");
    }
actualizarBotonesEliminar();
actualizarTotal();


}
cargarProductosEnCarrito();



function actualizarBotonesEliminar(){
    botonEliminar =  document.querySelectorAll(".icon-eliminar");
    botonEliminar.forEach(boton=>{
        boton.addEventListener("click", eliminarDelCarrito);
    })}


function eliminarDelCarrito(e){

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto=> producto.id === idBoton);
    productosEnCarrito.splice(index,1);
    cargarProductosEnCarrito();
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito) )
    
}

eliminarProductos.addEventListener("click",vaciarCarrito);

function vaciarCarrito(){
productosEnCarrito.length = 0; 
localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
cargarProductosEnCarrito();
}

function actualizarTotal(){
const totalCarrito = productosEnCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad),0);
total.innerText = `Total: $${totalCarrito} `
}


finalizarCompra.addEventListener("click", comprarCarrito)

function comprarCarrito (){
productosEnCarrito.length = 0;
localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito) );

contenedorCarritoVacio.classList.add("disabled");
contenedorProductos.classList.add("disabled");
eliminarProductos.classList.add("disabled");
contenedorBotones.classList.add("disabled");
compraFinalizada.classList.remove("disabled");


}


