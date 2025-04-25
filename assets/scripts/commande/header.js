document.addEventListener("DOMContentLoaded", function () {
	let adresse = sessionStorage.adresse;
	let complement = sessionStorage.complement;
	let heure = sessionStorage.heure;

	const adresseNeededPages = ["/src/commande/restaurants.html", "/src/commande/restaurant.html", "/src/commande/commande.html"];

	console.log(window.location.pathname);

	if (adresseNeededPages.includes(window.location.pathname) && (!adresse || !heure)) {
		window.location.href = "adresse.html";
		sessionStorage.setItem("mauvaiseAdresse", "true");
	}

	if (adresse && heure) {
		document.getElementById("adresseHeader").textContent = `${complement} ${adresse} , ${heure}`;
	}
});