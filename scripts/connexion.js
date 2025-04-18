document.getElementById("loginButton").addEventListener("click", async function(event) {
    event.preventDefault();

    const login = document.getElementById("pseudonyme").value;
    const motDePasse = document.getElementById("password").value;

    const userLogin = {
      "login": login,
      "motDePasse": motDePasse
    }

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
        // window.location.href = "/src/index.html"; // redirection vers page d'accueil si connexion réussi 
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });