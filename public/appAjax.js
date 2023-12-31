const NUM_RESULTS = 4;
let loadMoreRequests = 0;

async function loadMore() {
    const from = (loadMoreRequests + 1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/coches?from=${from}&to=${to}`);
    const newCoches = await response.text();

    const cochesDiv = document.getElementById("coches");

    cochesDiv.innerHTML += newCoches;

    loadMoreRequests++;

    // Verificar si los siguientes 4 coches están vacíos
    const nextFrom = from + NUM_RESULTS;
    const nextTo = nextFrom + NUM_RESULTS;

    const nextResponse = await fetch(`/coches?from=${nextFrom}&to=${nextTo}`);
    const nextCochesHTML = await nextResponse.text();

    if (nextCochesHTML.trim() === '') {
        document.getElementById("CargarMas").style.display = "none";
    }

}

async function loadBudget() {
    const response = await fetch("/compra");
    const allCompras = await response.text();

    const comprasDiv = document.getElementById("compra");

    comprasDiv.innerHTML = allCompras;

    comprasDiv.classList.add("mostrar");//le ponemos la clase para que el css lo ponga para mostrar

    document.getElementById("mostrarCompra").style.display = "none";
}

async function eliminarTodos() {
    const response = await fetch("/deleteCompra");
    const mensajeOk = await response.text();

    const ok = document.getElementById("compra");

    ok.innerHTML = mensajeOk;
}

async function cerrarCarrito(){
    const comprasDiv = document.getElementById("compra");

    comprasDiv.classList.remove("mostrar");

    document.getElementById("mostrarCompra").style.display = "block";
}

////busqueda coches

async function buscarCoches(){
    const searchTerm = document.getElementById("searchInput").value;
    
    if (searchTerm.trim() != ""){
        const response = await fetch(`/buscarCoches?searchTerm=${searchTerm}`);
        const coches = await response.text();
        
        const cochesDiv = document.getElementById("coches");
        cochesDiv.innerHTML = coches;
        console.log("coches", coches);       

        document.getElementById("CargarMas").style.display = "none";
    }
    else{
        loadMoreRequests = 0;

        const response = await fetch(`/coches?from=${0}&to=${4}`);
        const newCoches = await response.text();

        const cochesDiv = document.getElementById("coches");

        cochesDiv.innerHTML = newCoches;
        console.log("coches", coches);

        document.getElementById("CargarMas").style.display = "block";

    }
}

