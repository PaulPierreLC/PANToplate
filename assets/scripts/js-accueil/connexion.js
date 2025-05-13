document.getElementById("loginButton").addEventListener("click", async function(event) {
    event.preventDefault();

    const login = document.getElementById("pseudonyme").value;
    const motDePasse = document.getElementById("password").value;

    const userLogin = {
        "login": login,
        "motDePasse": motDePasse
    };

    try {
        const response = await fetch("http://localhost:8080/api/connexion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin),
            credentials: "include"
        });

        if (response.ok) {
            alert("Connexion réussie !");
            window.location.href = "/src/index.html";
        } else if (response.status === 401) {
            alert("Identifiants incorrects. Veuillez réessayer.");
        } else {
            const errorMessage = await response.text();
            alert(`Erreur : ${errorMessage}`);
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});

function updateHeaderForLoggedInUser(username) {
    const connexionDiv = document.querySelector(".connexion");
    const profilDiv = document.querySelector(".profil");
    const header = document.querySelector("header");

    if (!connexionDiv || !profilDiv || !header) {
        console.error("Éléments DOM introuvables pour mettre à jour le header.");
        return;
    }

    // Modifier le contenu de la section "Connexion"
    connexionDiv.innerHTML = `
        <span class="text-light">Bienvenue, ${username}</span>
        <button class="btn btn-danger ms-2" id="logoutButton">Déconnexion</button>
    `;

    // Ajouter des classes Bootstrap pour styliser le header
    header.classList.add("bg-success", "text-light");

    // Ajouter un gestionnaire pour le bouton de déconnexion
    document.getElementById("logoutButton").addEventListener("click", async () => {
        try {
            await fetch("http://localhost:8080/api/logout", {
                method: "POST",
                credentials: "include",
            });
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    });

    // Afficher l'icône de profil
    profilDiv.style.display = "block";
}

function updateHeaderForGuest() {
    const connexionDiv = document.querySelector(".connexion");
    const profilDiv = document.querySelector(".profil");
    const header = document.querySelector("header");

    if (!connexionDiv || !profilDiv || !header) {
        console.error("Éléments DOM introuvables pour réinitialiser le header.");
        return;
    }

    // Modifier le contenu de la section "Connexion"
    connexionDiv.innerHTML = `
        <a href="connexion/connexion.html">
            <button class="btn btn-primary">Connexion
                <i class="bi bi-box-arrow-in-right"></i>
            </button>
        </a>
    `;

    // Réinitialiser les classes Bootstrap du header
    header.classList.remove("bg-success", "text-light");

    // Masquer l'icône de profil
    profilDiv.style.display = "none";
}

