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


async function postData() {
    console.log("On entre dans la fonction postData");
    const newnumero = document.getElementById("newNumero").value;
    const newrue = document.getElementById("newRue").value;
    const newcomplement = document.getElementById("newComplement").value;
    const estDefaut = document.getElementById("defaultCheckbox").checked; 
    const nomVille = document.getElementById("newNomVille").value;
    const codePostal = document.getElementById("newCodePostal").value;
  
    const adresseData = {
        "numero": newnumero,
        "rue": newrue,
        "complement": newcomplement,
        "estDefaut": estDefaut,
        "idVille": {
            "id": "3",
            "nom": "Brest",
            "codePostal": "29200"
        }
    };
  
    console.log("Objet adresse envoyé :", JSON.stringify(adresseData));
  
    fetch("http://localhost:8080/api/adresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adresseData)
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  document.getElementById("addNewAdresse").addEventListener("click", postData);
  