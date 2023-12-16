document.addEventListener("DOMContentLoaded", function() {
    const AñadidoOK = document.getElementById("Añadido");//Ya esta añadido al carrito
    const carritoButton = document.getElementById("carrito");//Añadir al carrito

    const compra = carritoButton.getAttribute("data-compra") === "true";

    if (compra) {
        AñadidoOK.style.display = "block";
        carritoButton.style.display = "none";
    } else {
        AñadidoOK.style.display = "none";
        carritoButton.style.display = "block";
    }
});
async function addToCarrito(postId) {
    const response = await fetch(`/addToCart?postId=${postId}`);

    if (response.ok) {
        document.getElementById("carrito").style.display = "none";
        document.getElementById("Añadido").style.display = "block";
    }
}
