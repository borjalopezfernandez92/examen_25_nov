////////////////////////////////////////////////////////////////////////// Mostrar 10 productos con su información y permitir que el usuario señale de alguna forma los que quiere comprar.

function init() {                                                       // Función que pasa de la pantalla inicial a la pantalla que muestra los productos y el carrito.
    let getDiv = document.getElementById("contenedorPrincipalIndex");
    getDiv.innerHTML = "";
    getDiv.id = "contenedorPrincipal"
    getDiv.removeAttribute("onclick");
    let divProductos = document.createElement("div");
    divProductos.id ="contenedorProductos";

    let h3 = document.createElement("h3");
    h3.innerText = "Productos disponibles";

    getDiv.appendChild(h3);
    getDiv.appendChild(divProductos);

    let cartDiv = document.createElement("div");
    cartDiv.id = "divCarrito";
    let cartDivTxt = document.createElement("h3");
    cartDivTxt.innerText = "Carrito";
    cartDiv.appendChild(cartDivTxt);
    document.body.appendChild(cartDiv);
    getProducts();
}

function getProducts() {                                                // Función que hace fetch a la api, se trae 10 productos (los 10 primeros).
    fetch(`https://fakestoreapi.com/products?limit=10`)
    .then(res => res.json())
    .then(json => showList(json))
}

function showList(fetch) {                                              // Función que recorre todos los elementos que trae el fetch y llama a la función que pinta los productos.
    fetch.forEach(element =>{
        paintProduct(element);
    })
}

function paintProduct(product) {                                        // Función que pinta los productos
    let getDiv = document.getElementById("contenedorProductos");        // div que contiene todos los productos

    let divProducto = document.createElement("div");                    // Div de cada producto individual
    divProducto.className = "productoIndividual";
    divProducto.id = "productoId"+product.id;
    divProducto.setAttribute("onclick", `selectProduct('${product.id}')`);

    //Descripcion de cada producto
    let tituloProducto = document.createElement("h3");
    tituloProducto.innerText = "Producto ID"+ product.id;
    let txtDescripcion = document.createElement("p");
    txtDescripcion.id = "tituloProducto"+ product.id;
    let h4Titulo = document.createElement("h4");
    h4Titulo.innerText = "Titulo";
    txtDescripcion.innerText =product.title;
    divProducto.appendChild(tituloProducto);
    divProducto.appendChild(h4Titulo);
    divProducto.appendChild(txtDescripcion);

    // Imagen de cada producto
    let imgProducto = document.createElement("img");
    imgProducto.src = product.image;
    divProducto.appendChild(imgProducto);

    // Precio de cada producto
    let precioProducto = document.createElement("p");
    let h4Precio = document.createElement("h4");
    h4Precio.innerText = "Precio";
    precioProducto.innerText = product.price + "€";
    divProducto.appendChild(h4Precio);
    divProducto.appendChild(precioProducto);

    // Descripción de cada producto
    let descProducto = document.createElement("p");
    descProducto.innerText = product.description;
    let h4descripcion = document.createElement("h4");
    h4descripcion.innerText = "Descripción"
    divProducto.appendChild(h4descripcion);
    divProducto.appendChild(descProducto);

    // Categoría de cada producto
    let categProducto = document.createElement("p");
    categProducto.innerText = product.category;
    let h4Categoria = document.createElement("h4");
    h4Categoria.innerText = "Categoria";
    divProducto.appendChild(h4Categoria);
    divProducto.appendChild(categProducto);

    // Rate de cada producto 
    let rateProducto = document.createElement("p");
    rateProducto.innerText = product.rating.rate;
    let h5Rate = document.createElement("h5");
    h5Rate.innerText="Rate";
    divProducto.appendChild(h5Rate);
    divProducto.appendChild(rateProducto);

    // Count de cada producto
    let countProducto = document.createElement("p");
    countProducto.innerText = product.rating.count;
    let h5count = document.createElement("h5");
    h5count.innerText="Count";
    divProducto.appendChild(h5count);
    divProducto.appendChild(countProducto);

    // Append de toda la información de cada producto.
    getDiv.appendChild(divProducto);
}

function selectProduct(selectedProduct) {                               // Función que pinta los productos en el carrito.
    let getdivCarrito = document.getElementById("divCarrito");
    let divTotal = document.createElement("div");
    divTotal.id = "divTotal";
    let divProductoCarrito = document.createElement("div");
    divProductoCarrito.classList.add("productoCarrito");
    divProductoCarrito.id = "cart"+selectedProduct;
    let getProd = document.getElementById("tituloProducto"+selectedProduct);
    let prodTxt = document.createElement("p");
    prodTxt.innerText = getProd.innerText;
    divProductoCarrito.appendChild(prodTxt);
    divProductoCarrito.setAttribute(`onclick`, `removeProduct("${selectedProduct}")`);
    

    getdivCarrito.appendChild(divProductoCarrito);
}

function removeProduct(product) {                                       // Función que elimina los productos del carrito si son clickados.
    let cleaner = document.getElementById("cart"+product);
    cleaner.remove();
}