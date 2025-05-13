function createDetailRow(detail) {
	const row = document.createElement("div");
	row.classList.add("row", "border-bottom", "mx-2", "mb-2");
	const rowContent = document.createElement("div");
	rowContent.classList.add("row");

	rowContent.innerHTML = `
    <p class="col mb-1">${detail.idPlat.nom} x${detail.quantite}</p>
		<p class="col text-end mb-1">${detail.idPlat.prix}€</p>
  `;

	row.appendChild(rowContent);

	return row;
}

document.addEventListener("DOMContentLoaded", function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bC1sYyIsImEiOiJjbTJvZzB4eTMwZW9iMmtzZm4zcjZuNzNjIn0.8yGpL3rOkEp7mTSdXOeM6A';
	const urlParams = new URLSearchParams(location.search);
	const commandeId = urlParams.get("id");
	longitude = sessionStorage.longitude;
	latitude = sessionStorage.latitude;
	prixCommande = 0;

	const map = new mapboxgl.Map({
		container: 'map',
		center: [longitude, latitude],
		zoom: 14
	});

	const marker1 = new mapboxgl.Marker()
		.setLngLat([longitude, latitude])
		.addTo(map);


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
				const detailRow = createDetailRow(detail);
				detailsContainer.appendChild(detailRow);

				prixCommande += detail.idPlat.prix * detail.quantite;
			});

			fetch(`http://localhost:8080/api/commandeStatuts/commande/${commandeId}`)
			.then(response => response.json())
			.then(commandeStatuts => {
				const dernierStatut = commandeStatuts.reduce((dernier, actuel) => {
					return new Date(actuel.dateCreer) > new Date(dernier.dateCreer) ? actuel : dernier;
				}).idStatut;
	
				var commandeStatutDiv = document.getElementById("statutCommande");
				var statut = document.createTextNode(dernierStatut.nom);
				commandeStatutDiv.appendChild(statut);
	
				var commandePrixDiv = document.getElementById("prixCommande");
				var prix = document.createTextNode(`${prixCommande}€`);
				commandePrixDiv.appendChild(prix);
			})
		})
		.catch(error => console.error("Error fetching detail:", error));

});