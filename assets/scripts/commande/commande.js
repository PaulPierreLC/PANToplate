function createDetailCard(detail) {
  const card = document.createElement("div");
  card.classList.add("col-10", "m-2", "card");

  card.innerHTML = `
    <div class="card-body">
      <div class="row">
        <div class="col-8">
          <h5 class="card-title">${detail.idPlat.nom} x${detail.quantite}</h5>
          <p class="card-text"><small class="text-body-secondary">${detail.idPlat.description}</small></p>
        </div>
        <div class="col-4">
          <p class="fs-3 text-end">${detail.idPlat.prix * detail.quantite}€</p>
        </div>
      </div>
    </div>
  `;

  return card;
}

async function validateCommande(commandeId) {
  try {
    const response = await fetch('http://localhost:8080/api/commandeStatuts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idCommande: commandeId,
        idStatut: 2
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    window.location.href = `livraison.html?id=${commandeId}`;
  } catch (error) {
    console.error('Failed to validate order:', error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(location.search);
  const commandeId = urlParams.get("id");
  let commandeTotal = 0;

  if (!commandeId) {
    location.href = "restaurants.html";
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
        commandeTotal += detail.idPlat.prix * detail.quantite;
        console.log(commandeTotal)

      });

      console.log(commandeTotal)
      var commandeTotalDiv = document.getElementById("commandeTotal");
      var commandeTotalContent = document.createTextNode(`${commandeTotal}€`);
      commandeTotalDiv.appendChild(commandeTotalContent);

      var validate_btn = document.getElementById("validate_btn");
      validate_btn.addEventListener("click", () => validateCommande(commandeId));
    })
    .catch(error => console.error("Error fetching detail:", error));
});