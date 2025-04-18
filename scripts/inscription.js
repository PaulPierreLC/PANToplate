document.getElementById("genreOptions").addEventListener("click", function(event) {
    if (event.target.tagName === "A") {
        event.preventDefault();
        const selectedGenre = event.target.getAttribute("data-value");
        document.getElementById("selectedGenre").value = selectedGenre;
        document.getElementById("genre").textContent = selectedGenre;
    }
});

document.getElementById("registrationForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const mail = document.getElementById("mail").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("passwordConfirmation").value;
    const genre = document.getElementById("selectedGenre").value;

    if (password !== passwordConfirmation) {
        document.getElementById("passwordError").style.display = "block";
        return;
    } else {
        document.getElementById("passwordError").style.display = "none";
    }

    const userData = {
        "prenom": prenom,
        "nom": nom,
        "telMobile": phonenumber,
        "telFix": null,
        "mail": mail,
        "parametre": "{}",
        "pointsFidelite": 0,
        "idRole": { "id": 2 },
        "idVehicule": null,
        "dateCreer": new Date().toISOString(), 
    };

    try {
        const userResponse = await fetch("http://localhost:8080/api/utilisateurs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!userResponse.ok) {
            const userError = await userResponse.json();
            throw new Error("Erreur lors de la création de l'utilisateur : " + userError.message);
        }

        const userResult = await userResponse.json();
        const utilisateurId = userResult.id;
        console.log("Utilisateur créé avec succès :", userResult);

        const loginData = {
            "utilisateur": { "id": utilisateurId },
            "login": mail,
            "motDePasse": password
        };

        const loginResponse = await fetch("http://localhost:8080/api/logins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!loginResponse.ok) {
            const loginError = await loginResponse.json();
            throw new Error("Erreur lors de la création du login : " + loginError.message);
        }

        const loginResult = await loginResponse.json();
        console.log("Login créé avec succès :", loginResult);

        alert("Inscription réussie !");
        window.location.href = "/src/connexion/connexion.html";
    } catch (error) {
        console.error("Erreur :", error.message);
        alert(error.message);
    }
});