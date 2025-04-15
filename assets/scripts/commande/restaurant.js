const shoppingCart = {};
const platElements = {};

function renderCart() {
  const cartSummary = document.getElementById("cart-summary");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  const items = Object.entries(shoppingCart).filter(([_, data]) => data.quantity > 0);

  cartSummary.style.display = items.length > 0 ? "block" : "none";
  if (items.length === 0) return;

  items.forEach(([name, data]) => {
    const li = document.createElement("li");
    li.classList.add("d-flex", "align-items-center", "mb-2");
    
    const cartSubBtn = document.createElement("button");
    cartSubBtn.innerText = "-";
    cartSubBtn.classList.add("btn", "btn-sm", "btn-outline-danger", "me-2");
    cartSubBtn.addEventListener("click", () => updateCart(name, -1));

    const span = document.createElement("span");
    span.textContent = `${name} x ${data.quantity}`;

    li.append(cartSubBtn, span);
    cartItems.appendChild(li);
  });
}

function updateCart(platNom, change) {
  if (!shoppingCart[platNom] && change > 0) {
    shoppingCart[platNom] = { quantity: 0 };
  }

  if (shoppingCart[platNom]) {
    shoppingCart[platNom].quantity += change;
    
    if (shoppingCart[platNom].quantity <= 0) {
      delete shoppingCart[platNom];
    }
  }

  updateAllPlatCardsUI();
  
  renderCart();
}

function updateAllPlatCardsUI() {
  Object.keys(platElements).forEach(platNom => {
    const el = platElements[platNom];
    const inCart = shoppingCart[platNom] && shoppingCart[platNom].quantity > 0;
    
    if (el) {
      el.subBtn.style.display = inCart ? "inline" : "none";
      el.quantitySpan.style.display = inCart ? "inline" : "none";
      
      if (inCart) {
        el.quantitySpan.textContent = shoppingCart[platNom].quantity;
      } else {
        el.quantitySpan.textContent = "0";
      }
    }
  });
}

function createPlatCard(plat) {
  const card = document.createElement("div");
  card.classList.add("col-5", "m-3", "card");
  
  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${plat.nom}</h5>
      <p class="card-text">${plat.prix}€ ${plat.note ? `- ${plat.note}★` : ''}</p>
      <p class="card-text"><small class="text-body-secondary">${plat.description || ''}</small></p>
      <div class="d-grid gap-2 d-flex justify-content-end">
        <button class="btn btn-sm btn-outline-dark rounded-3 sub-btn" style="display: none;">-</button>
        <span class="quantity-label" style="display: none;">0</span>
        <button class="btn btn-sm btn-outline-dark rounded-3 add-btn">+</button>
      </div>
    </div>
  `;
  
  const subBtn = card.querySelector(".sub-btn");
  const addBtn = card.querySelector(".add-btn");
  const quantitySpan = card.querySelector(".quantity-label");
  
  platElements[plat.nom] = { subBtn, addBtn, quantitySpan };
  
  addBtn.addEventListener("click", () => updateCart(plat.nom, 1));
  subBtn.addEventListener("click", () => updateCart(plat.nom, -1));
  
  return card;
}

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get("id");

  if (!restaurantId) {
    window.location.href = "restaurants.html";
    return;
  }

  fetch(`http://localhost:8080/api/restaurants/${restaurantId}`)
    .then(response => response.json())
    .then(restaurant => {
      document.getElementById("restaurant-name").textContent = restaurant.nom;
      document.getElementById("restaurant-image").src = `/assets/images/restaurant/${restaurant.photo}`;
      document.getElementById("restaurant-capacite").textContent = `Capacité: ${restaurant.capacite} personnes`;
      document.getElementById("restaurant-telephone").textContent = `Téléphone: ${restaurant.telephone}`;
    })
    .catch(error => console.error("Error fetching restaurant details:", error));

  fetch(`http://localhost:8080/api/plats/restaurant/${restaurantId}`)
    .then(response => response.json())
    .then(plats => {
      const platsContainer = document.getElementById("plats-list");
      platsContainer.innerHTML = "";
      
      plats.forEach(plat => {
        const platCard = createPlatCard(plat);
        platsContainer.appendChild(platCard);
      });
    })
    .catch(error => console.error("Error fetching plats:", error));
});