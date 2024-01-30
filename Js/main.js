const productos = [

    {
        id: "remera-1",
        titulo: "Remera 1",
        imagen: "https://www.dexter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-365-dabra-catalog/default/dw28b9b7c5/products/ADIV1929KIT/ADIV1929KIT-1.JPG?sw=400&sh=400",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio:5000,
        cantidad:1
    },
{
        id: "remera-2",
        titulo: "Remera 2",
        imagen: "https://www.dexter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-365-dabra-catalog/default/dw38c3dbea/products/UA1376921-638/UA1376921-638-1.JPG?sw=400&sh=400",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio:5000,
        cantidad:1
    },
    {
        id: "remera-3",
        titulo: "Remera 3",
        imagen: "https://www.dexter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-365-dabra-catalog/default/dwe1e4f9ab/products/LONISS230002/LONISS230002-1.JPG?sw=400&sh=400",
        categoria: {
            nombre: "Remeras",
            id: "remeras"
        },
        precio:5000,
        cantidad:1
    },

    {
        id: "pantalon-1",
        titulo: "Pantalon 1",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwcbe6bd3e/products/ADHF3932/ADHF3932-1.JPG",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio:5000,
        cantidad:1
    },
{
        id: "pantalon-2",
        titulo: "Pantalon 2",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw3eddc40d/products/NI_BV2679-010/NI_BV2679-010-1.JPG",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio:5000,
        cantidad:1
    },
    {
        id: "pantalon-3",
        titulo: "Pantalon 3",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwb225152b/products/LONIFW230028/LONIFW230028-1.JPG",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio:5000,
        cantidad:1
    },

    {
        id: "zapatillas-1",
        titulo: "Zapatillas 1",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw01eda722/products/NIDM0821-004/NIDM0821-004-1.JPG",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio:5000,
        cantidad:1
    },
{
        id: "zapatillas-2",
        titulo: "Zapatillas 2",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwc98386b1/products/NIDR2677-101/NIDR2677-101-1.JPG",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio:5000,
        cantidad:1
    },
    {
        id: "zapatillas-3",
        titulo: "Zapatillas 3",
        imagen: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwe61f1939/products/NIDO9381-200/NIDO9381-200-1.JPG",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio:5000,
        cantidad:1
    },
]


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonAgregar = document.querySelectorAll(".button-agree");
const numerito = document.querySelector(".numerito");


function cargarProductos(productosElegidos) {

contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("products-container");
        div.innerHTML =
            `
            <div>
            <img
            class="productos-imagen"
              src="${producto.imagen}"
              alt="${producto.titulo}"
            />
            <div class="producto-detalle">
              <h3>${producto.titulo}</h3>
               <b>${producto.precio}</b>
              <button class="button-agree" id="${producto.id}">Agregar al carrito</button>
            </div>
            </div>
       
           `;
           contenedorProductos.append(div);
    })
    actualizarBotones();

}
cargarProductos(productos);


botonesCategorias.forEach(boton=>{

boton.addEventListener("click", (e)=>{
botonesCategorias.forEach(boton=>boton.classList.remove("active"));

e.currentTarget.classList.add("active");


if(e.currentTarget.id != "inicio"){

    const titulos = productos.find(producto=>producto.categoria.id === e.currentTarget.id)
    tituloPrincipal.innerText=titulos.categoria.nombre;
    const productosBoton= productos.filter( producto=> producto.categoria.id === e.currentTarget.id);
    cargarProductos(productosBoton);
}
else{
tituloPrincipal.innerText= "Inicio"
cargarProductos(productos);

}}
)});



function actualizarBotones(){
    botonAgregar =  document.querySelectorAll(".button-agree");
    botonAgregar.forEach(boton=>{
        boton.addEventListener("click", agregarAlCarrito);
    })
};

let productosEnCarrito;

let productosEnCarritoLS= localStorage.getItem ("productos-en-carrito");

if (productosEnCarritoLS){
productosEnCarrito= JSON.parse(productosEnCarritoLS);
actualizarNumerito();
}
else{
    productosEnCarrito = []
}




function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id
    const productosAgregados = productos.find(producto=>producto.id === idBoton)

    if(productosEnCarrito.some (producto=>producto.id=== idBoton)){
        const index= productosEnCarrito.findIndex(producto=> producto.id === idBoton)
        productosEnCarrito[index].cantidad++

    }
    else{
        productosAgregados.cantidad= 1;  
        productosEnCarrito.push(productosAgregados);
    }
    actualizarNumerito()

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let numeritoActualizado = productosEnCarrito.reduce ((acc,producto)=>acc + producto.cantidad,0);
    numerito.innerText = numeritoActualizado;
    
}
