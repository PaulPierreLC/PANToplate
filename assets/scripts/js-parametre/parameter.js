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

    var address = document.getElementById('nomVille').value;
    console.log("Adresse à envoyer : ", address); 

    const xhr1 = new XMLHttpRequest();
    xhr1.open("PUT", "http://localhost:8080/api/villes", true);
    xhr1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr1.onload = function() {
        console.log("Réponse du serveur : ", xhr1.responseText);
        if (xhr1.status === 200) {
            try {
                var response = JSON.parse(xhr1.responseText);
                alert("Ville mise à jour avec succès !");
            } catch (e) {
                alert("Erreur de traitement de la réponse du serveur.");
            }
        } else {
            alert("Erreur lors de la mise à jour de la ville.");
        }
    };

    var data = JSON.stringify({ "nom": address });
    console.log("Données envoyées : ", data);
    xhr1.send(data);
});



const villeNomContainer = document.getElementById('nomVille');
const adresseContainer = document.getElementById('numero');
const codePostalContainer = document.getElementById('code_postal');
const complementContainer = document.getElementById('complement');
const prenomContainer = document.getElementById('prenom');
const nomContainer = document.getElementById('nom');
const telmobileContainer = document.getElementById('tel_mobile');
const mailContainer = document.getElementById('mail');
    
function fetchParameter() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/villes", true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                const villes = JSON.parse(xhr.responseText);
                if (villes.length > 0) {
                    const firstVille = villes[0];
                    villeNomContainer.value = firstVille.nom;
                } else {
                    villeNomContainer.value = "Aucun ville trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                villeNomContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des villes. Statut :", xhr.status);
            villeNomContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr.onerror = function () {
        console.error("Échec de la requête");
        villeNomContainer.value = "Échec de la requête";
    };

    xhr.send();

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

    const xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "http://localhost:8080/api/villes", true);

    xhr3.onload = function() {
        if (xhr3.status === 200) {
            try {
                const villes = JSON.parse(xhr3.responseText);
                if (villes.length > 0) {
                    const firstVille = villes[0];
                    codePostalContainer.value = firstVille.codePostal;
                } else {
                    codePostalContainer.value = "Aucun ville trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                codePostalContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des villes. Statut :", xhr3.status);
            codePostalContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr3.onerror = function () {
        console.error("Échec de la requête");
        codePostalContainer.value = "Échec de la requête";
    };

    xhr3.send();


    const xhr4 = new XMLHttpRequest();
    xhr4.open("GET", "http://localhost:8080/api/adresses", true);

    xhr4.onload = function() {
        if (xhr4.status === 200) {
            try {
                const adresses = JSON.parse(xhr4.responseText);
                if (adresses.length > 0) {
                    const firstAdresse = adresses[0];
                    complementContainer.value = firstAdresse.complement;
                } else {
                    complementContainer.value = "Aucun adresse trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                complementContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des adresses. Statut :", xhr.status);
            complementContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr4.onerror = function () {
        console.error("Échec de la requête");
        complementContainer.value = "Échec de la requête";
    };

    xhr4.send();

    const xhr5 = new XMLHttpRequest();
    xhr5.open("GET", "http://localhost:8080/api/utilisateurs", true);

    xhr5.onload = function() {
        if (xhr5.status === 200) {
            try {
                const users = JSON.parse(xhr5.responseText);
                if (users.length > 0) {
                    const firstUser = users[0];
                    prenomContainer.value = firstUser.prenom;
                } else {
                    prenomContainer.value = "Aucun utilisateur trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                prenomContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des adresses. Statut :", xhr.status);
            prenomContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr5.onerror = function () {
        console.error("Échec de la requête");
        prenomContainer.value = "Échec de la requête";
    };

    xhr5.send();


    const xhr6 = new XMLHttpRequest();
    xhr6.open("GET", "http://localhost:8080/api/utilisateurs", true);

    xhr6.onload = function() {
        if (xhr6.status === 200) {
            try {
                const users = JSON.parse(xhr6.responseText);
                if (users.length > 0) {
                    const firstUser = users[0];
                    nomContainer.value = firstUser.nom;
                } else {
                    nomContainer.value = "Aucun utilisateur trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                nomContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des adresses. Statut :", xhr.status);
            nomContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr6.onerror = function () {
        console.error("Échec de la requête");
        nomContainer.value = "Échec de la requête";
    };

    xhr6.send();

    const xhr7 = new XMLHttpRequest();
    xhr7.open("GET", "http://localhost:8080/api/utilisateurs", true);

    xhr7.onload = function() {
        if (xhr7.status === 200) {
            try {
                const users = JSON.parse(xhr7.responseText);
                if (users.length > 0) {
                    const firstUser = users[0];
                    telmobileContainer.value = firstUser.telMobile;
                } else {
                    telmobileContainer.value = "Aucun utilisateur trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                telmobileContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des adresses. Statut :", xhr.status);
            telmobileContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr7.onerror = function () {
        console.error("Échec de la requête");
        telmobileContainer.value = "Échec de la requête";
    };

    xhr7.send();

    const xhr8 = new XMLHttpRequest();
    xhr8.open("GET", "http://localhost:8080/api/utilisateurs", true);

    xhr8.onload = function() {
        if (xhr8.status === 200) {
            try {
                const users = JSON.parse(xhr8.responseText);
                if (users.length > 0) {
                    const firstUser = users[0];
                    mailContainer.value = firstUser.mail;
                } else {
                    mailContainer.value = "Aucun utilisateur trouvé";
                }
            } catch (error) {
                console.error("Erreur lors de l'analyse de la réponse de l'API :", error);
                mailContainer.value = "Erreur lors de l'analyse des données";
            }
        } else {
            console.error("Échec de la récupération des utilisateurs. Statut :", xhr.status);
            mailContainer.value = "Erreur lors de la récupération des données";
        }
    };

    xhr8.onerror = function () {
        console.error("Échec de la requête");
        mailContainer.value = "Échec de la requête";
    };

    xhr8.send();


}


fetchParameter();
