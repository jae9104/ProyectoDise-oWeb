const NUM_RESULTS = 4;
let loadMoreRequests = 0;
let faltanAun = true;

async function loadMore() {
    if (faltanAun) {
        const from = (loadMoreRequests + 1) * NUM_RESULTS;
        const to = from + NUM_RESULTS;

        const response = await fetch(`/coches?from=${from}&to=${to}`);
        const newCoches = await response.text();

        const cochesDiv = document.getElementById("coches");

        cochesDiv.innerHTML += newCoches;

        if (newCoches.trim() === '') {
            faltanAun = false;
            document.getElementById("CargarMas").style.display = "none";
        }

        loadMoreRequests++;

    }
}
