document.addEventListener("DOMContentLoaded", function() {
    const AñadidoOK = document.getElementById("Añadido");//Ya esta añadido al carrito
    const carritoButton = document.getElementById("carrito");//Añadir al carrito
    const QuitarButton = document.getElementById("Quitarcarrito");//Quitar del carrito

    const compra = carritoButton.getAttribute("data-compra") === "true";

    if (compra) {
        AñadidoOK.style.display = "block";
        QuitarButton.style.display = "block";
        carritoButton.style.display = "none";
    } else {
        AñadidoOK.style.display = "none";
        QuitarButton.style.display = "none";
        carritoButton.style.display = "block";
    }
});
async function addToCarrito(postId) {
    const response = await fetch(`/addToCart?postId=${postId}`);

    if (response.ok) {
        document.getElementById("carrito").style.display = "none";
        document.getElementById("Añadido").style.display = "block";
        document.getElementById("Quitarcarrito").style.display = "block";
    }
}

async function deleteToCarrito(postId) {
    const response = await fetch(`/deleteToCarrito?postId=${postId}`);

    if (response.ok) {
        document.getElementById("carrito").style.display = "block";
        document.getElementById("Añadido").style.display = "none";
        document.getElementById("Quitarcarrito").style.display = "none";
    }
}
