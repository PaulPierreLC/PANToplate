const villeNomContainer = document.getElementById('nomVille');
const adresseContainer = document.getElementById('numero');
const codePostalContainer = document.getElementById('codePostal');
const complementContainer = document.getElementById('complement');
const prenomContainer = document.getElementById('prenom');
const nomContainer = document.getElementById('nom');
const telmobileContainer = document.getElementById('telMobile');
const mailContainer = document.getElementById('mail');
const parameterContainer = document.getElementById('birthDate'); // bizarre mais on verra plus tard !!!!!!!!!!!!!!!!!!!!!!!!!!
    
function fetchParameter() {

    function fetchUserData(apiEndpoint, field, container) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:8080/api/${apiEndpoint}`, true);
        
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const users = JSON.parse(xhr.responseText);
                    if (users.length > 0) {
                        const firstUser = users[0];
                        container.value = field === "parametre" ? 
                            JSON.parse(firstUser.parametre)?.date_naissance || "Date de naissance non trouvée dans les paramètres" :
                            firstUser[field] || "";
                    } else {
                        container.value = "Aucun utilisateur trouvé";
                    }
                } catch (error) {
                    console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                    container.value = "Erreur lors de l'analyse des données";
                }
            } else {
                console.error("Échec de la récupération des utilisateurs. Statut :", xhr.status);
                container.value = "Erreur lors de la récupération des données";
            }
        };
    
        xhr.onerror = function () {
            console.error("Échec de la requête");
            container.value = "Échec de la requête";
        };
    
        xhr.send();
    }
    
    // Utilisation de la fonction pour chaque champ
    fetchUserData("utilisateurs", "prenom", prenomContainer);
    fetchUserData("utilisateurs", "nom", nomContainer);
    fetchUserData("utilisateurs", "telMobile", telmobileContainer);
    fetchUserData("utilisateurs", "mail", mailContainer);
    fetchUserData("utilisateurs", "parametre", parameterContainer);
    fetchUserData("villes", "nom", villeNomContainer);
    fetchUserData("villes", "codePostal", codePostalContainer);
    fetchUserData("adresses", "complement", complementContainer);
 
    const xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "http://localhost:8080/api/adresses", true);

    xhr2.onload = function() {
        if (xhr2.status === 200) {
            try {
                const adresses = JSON.parse(xhr2.responseText);
                if (adresses.length > 0) {
                    const firstAdresse = adresses[0];
                    adresseContainer.value = firstAdresse.numero + " " + firstAdresse.rue;
                } else {
                    adresseContainer.value = "Aucun adresse trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                adresseContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des adresses. Statut :", xhr.status);
            adresseContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr2.onerror = function () {
        console.error("Échec de la requête");
        adresseContainer.value = "Échec de la requête";
    };

    xhr2.send();
}


document.addEventListener("DOMContentLoaded", function() {
    fetchParameter();
});

document.getElementById('edit-button').addEventListener('click', function() {
    document.querySelectorAll('.info input').forEach(input => {
        input.disabled = false; 
    });

    document.getElementById('edit-button').disabled = true; 
    document.getElementById('save-button').disabled = false; 
});

document.getElementById('save-button').addEventListener('click', function() {
    document.querySelectorAll('.info input').forEach(input => {
        input.disabled = true; 
    });

    document.getElementById('edit-button').disabled = false; 
    document.getElementById('save-button').disabled = true; 

    const userData = {};
    const addressData = {};
    const parametreData = {};
    const villeData = {};

    // Trier les champs selon leur table
    document.querySelectorAll('.info input').forEach(input => {
        if (["prenom", "nom", "mail", "telMobile"].includes(input.id)) {
            userData[input.id] = input.value;
        } else if (["numero", "rue" , "complement"].includes(input.id)) {
            addressData[input.id] = input.value;
        } else if (input.id === "nomVille" && input.value.trim() !== ""){
                villeData["nom"] = input.value;
                } else if (["codePostal"].includes(input.id)) {
                villeData[input.id] = input.value;
        } else if (input.id === "birthDate") {
            // Récupérer `parametre` existant et le modifier
            let existingParametre = userData["parametre"] ? JSON.parse(userData["parametre"]) : {};
            existingParametre.date_naissance = input.value; // Ajout de la date de naissance
            parametreData["parametre"] = JSON.stringify(existingParametre);
        }
    });

    // Envoyer chaque requête PATCH à la bonne table , ID à adapter !!!!!!!!!
    if (Object.keys(userData).length > 0) patchData("utilisateurs", 1, userData);
    if (Object.keys(addressData).length > 0) patchData("adresses", 5, addressData);
    if (Object.keys(addressData).length > 0) patchData("villes", 1, villeData);
    if (Object.keys(parametreData).length > 0) patchData("utilisateurs", 1, parametreData);

    console.log("Données envoyées :", JSON.stringify(userData));
    console.log("Données envoyées :", JSON.stringify(addressData));
    console.log("Données envoyées :", JSON.stringify(parametreData));
    console.log("Données envoyées :", JSON.stringify(villeData));

});



function patchData(apiEndpoint, id, updatedFields) {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `http://localhost:8080/api/${apiEndpoint}/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(updatedFields));
}

function getVilleId(nomVille, codePostal, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:8080/api/villes?nom=${encodeURIComponent(nomVille)}&codePostal=${encodeURIComponent(codePostal)}`, true);
    
    xhr.onload = function () {
        if (xhr.status === 200) {
            const villes = JSON.parse(xhr.responseText);
            if (villes.length > 0) {
                callback(villes[0].id); // La ville existe, on récupère son ID
            } else {
                callback(null); // Ville non trouvée, on devra la créer
            }
        } else {
            console.error("Erreur lors de la recherche de la ville. Statut :", xhr.status);
            callback(null);
        }
    };

    xhr.onerror = function () {
        console.error("Échec de la requête");
        callback(null);
    };

    xhr.send();
}

function createVille(nomVille, codePostal, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/villes", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 201 || xhr.status === 200) {
            const ville = JSON.parse(xhr.responseText);
            callback(ville.id); // On récupère l'ID de la ville créée
        } else {
            console.error("Échec de la création de la ville. Statut :", xhr.status);
            callback(null);
        }
    };

    xhr.onerror = function () {
        console.error("Échec de la requête");
        callback(null);
    };

    const villeData = { nom: nomVille, codePostal: codePostal };
    xhr.send(JSON.stringify(villeData));
}

function sendUserData(apiEndpoint, data, container) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:8080/api/${apiEndpoint}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            container.textContent = "Données envoyées avec succès";
        } else {
            console.error("Échec de l'envoi des données. Statut :", xhr.status);
            container.textContent = "Erreur lors de l'envoi des données";
        }
    };

    xhr.onerror = function () {
        console.error("Échec de la requête");
        container.textContent = "Échec de la requête";
    };

    xhr.send(JSON.stringify(data));
}


document.getElementById("addNewAdresse").addEventListener("click", function() {
    console.log("Bouton cliqué !");
    
    const nomVille = document.getElementById("newNomVille").value;
    const codePostal = document.getElementById("newCodePostal").value;

    getVilleId(nomVille, codePostal, function(idVille) {
        if (idVille) {
            // La ville existe, on peut créer l'adresse
            sendAdresse(idVille);
        } else {
            // La ville n'existe pas, on la crée d'abord
            createVille(nomVille, codePostal, function(newVilleId) {
                if (newVilleId) {
                    sendAdresse(newVilleId);
                } else {
                    console.error("Impossible de récupérer l'ID de la ville.");
                }
            });
        }
    });
});

function sendAdresse(idVille) {
    const newAdresse = {
        numero: document.getElementById("newNumero").value,
        rue: document.getElementById("newRue").value,
        complement: document.getElementById("newComplement").value,
        estDefaut: document.getElementById("defaultCheckbox").checked,
        ville: { id: idVille } // Associer correctement l'ID de la ville
    };

    const container = document.createElement("p");
    document.body.appendChild(container);

    console.log("Objet adresse envoyé :", JSON.stringify(newAdresse));
    sendUserData("adresses", newAdresse, container);
}

