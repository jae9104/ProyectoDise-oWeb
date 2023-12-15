const NUM_RESULTS = 4;
let loadMoreRequests = 0;

async function loadMore(){

    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;

    const response = await fetch(`/coches?from=${from}&to=${to}`);
    const newCoches = await response.text();
  
    const cochesDiv = document.getElementById("coches");

    cochesDiv.innerHTML += newCoches;

    loadMoreRequests++;
}
    
