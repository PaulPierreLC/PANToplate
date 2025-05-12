document.addEventListener("DOMContentLoaded", function () {
	let adresse = sessionStorage.adresse;
	let complement = sessionStorage.complement;
	let heure = sessionStorage.heure;

	const adresseNeededPages = ["/src/commande/restaurants.html", "/src/commande/restaurant.html", "/src/commande/commande.html"];

	if (adresseNeededPages.includes(window.location.pathname) && (!adresse || !heure)) {
		window.location.href = "adresse.html";
		sessionStorage.setItem("mauvaiseAdresse", "true");
	}

	if (adresse && heure) {
		let adresse_information = `${adresse}, ${heure}`
		if (complement) { adresse_information = complement.concat(", ", adresse_information) }
		
		document.getElementById("adresseHeader").textContent = adresse_information;
	}
});