document.addEventListener("DOMContentLoaded", async () => {
    console.log("session.js chargé");
    const connexionDiv = document.querySelector(".connexion");
    const profilDiv = document.querySelector(".profil");
    const profilLink = document.getElementById("profil-link");
    const profilSessionInfo = document.getElementById("profil-session-info");

    let sessionData = null;

    try {
        const response = await fetch("http://localhost:8080/api/session", {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            sessionData = await response.json();
            if (connexionDiv) connexionDiv.style.display = "none";
            if (profilDiv) profilDiv.style.display = "block";
        } else {
            if (connexionDiv) connexionDiv.style.display = "block";
            if (profilDiv) profilDiv.style.display = "none";
        }
    } catch (error) {
        if (connexionDiv) connexionDiv.style.display = "block";
        if (profilDiv) profilDiv.style.display = "none";
    }

    if (profilLink) {
        profilLink.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (sessionData) {
                profilSessionInfo.innerHTML = `
                    <div style="text-align:center;">
                        <b>${sessionData.username}</b><br>
                        <button id="logout-btn" class="btn btn-danger btn-sm mt-2">Déconnexion</button>
                    </div>
                `;
                profilSessionInfo.style.display = profilSessionInfo.style.display === "block" ? "none" : "block";

                // Positionne la popup sous l'icône
                const rect = profilLink.getBoundingClientRect();
                const popupWidth = 200;
                let left = window.scrollX + rect.left;
                let top = window.scrollY + rect.bottom + 5;

                if (left + popupWidth > window.innerWidth) {
                    left = window.innerWidth - popupWidth - 10;
                }

                profilSessionInfo.style.top = `${top}px`;
                profilSessionInfo.style.left = `${left}px`;
                profilSessionInfo.style.width = `${popupWidth}px`;

                // Gestion du bouton de déconnexion
                document.getElementById("logout-btn").onclick = async function() {
                    await fetch("http://localhost:8080/api/logout", {
                        method: "POST",
                        credentials: "include"
                    });
                    window.location.reload();
                };
            }
        });
        document.addEventListener("click", function(e) {
            if (profilSessionInfo && profilSessionInfo.style.display === "block" &&
                e.target !== profilLink && !profilSessionInfo.contains(e.target)) {
                profilSessionInfo.style.display = "none";
            }
        });
    }
});