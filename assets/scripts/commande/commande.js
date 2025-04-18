function createDetailCard(detail) {
  const card = document.createElement("div");
  card.classList.add("col-10", "m-2", "card");

  card.innerHTML = `
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col-8">
          <h5 class="card-title">${detail.idPlat.nom} x${detail.quantite}</h5>
          <p class="card-text"><small class="text-body-secondary">${detail.idPlat.description}</small></p>
        </div>
        <div class="col-2">
          <p class="fs-3">${detail.idPlat.prix * detail.quantite}€</p>
        </div>
      </div>
    </div>
  `;

  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const commandeId = urlParams.get("id");

  if (!commandeId) {
    window.location.href = "restaurants.html";
    return;
  }

  fetch(`http://localhost:8080/api/commandeDetails/commande/${commandeId}`)
    .then(response => response.json())
    .then(details => {
      const detailsContainer = document.getElementById("details-list");
      detailsContainer.innerHTML = "";

      details.forEach(detail => {
        const detailCard = createDetailCard(detail);
        detailsContainer.appendChild(detailCard);
      });
    })
    .catch(error => console.error("Error fetching detail:", error));
});