document.addEventListener("DOMContentLoaded", function () {
  const addressInput = document.getElementById("addressInput");
  const addressResults = document.getElementById("addressResults");
  const addressSelected = document.getElementById("addressSelected");
  const submitBtn = document.getElementById("submitBtn");
  let isAddressSelected = false;

  async function fetchAddresses(query) {
    if (!query.trim()) {
      addressResults.style.display = "none";
      return;
    }

    try {
      const response = await fetch(`https://data.geopf.fr/geocodage/search?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();

      if (!data.features || data.features.length === 0) {
        addressResults.style.display = "none";
        return;
      }

      populateAddressResults(data.features);
    } catch (error) {
      console.error("Erreur lors de la récupération des adresses:", error);
      addressResults.style.display = "none";
    }
  }

  function populateAddressResults(addresses) {
    if (!Array.isArray(addresses)) {
      console.error("Invalid address data:", addresses);
      return;
    }

    addressResults.innerHTML = ""

    addresses.forEach(address => {
      const item = document.createElement("div");
      item.className = "p-2 border-bottom";
      item.style.cursor = "pointer";
      item.textContent = address.properties.label;
      addressSelected.value = address.properties.label;
      isAddressSelected = true;
      console.log(isAddressSelected)

      item.addEventListener("click", function () {
        addressInput.value = address.properties.label;
        addressResults.style.display = "none";
      });

      item.addEventListener("mouseover", function () {
        this.style.backgroundColor = "#f0f0f0";
      });

      item.addEventListener("mouseout", function () {
        this.style.backgroundColor = "transparent";
      });

      addressResults.appendChild(item);
    });

    addressResults.style.display = "block";
  }

  addressInput.addEventListener("input", function () {
    isAddressSelected = false;
    addressSelected.value = "";
    console.log(isAddressSelected)
    if (this.value.length >= 4) {
      fetchAddresses(this.value);
    } else {
      addressResults.style.display = "none";
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target !== addressInput && event.target !== addressResults) {
      addressResults.style.display = "none";
    }
  });
});



function getCurrentHour() {
  const options = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const cetTime = formatter.format(new Date());

  return parseInt(cetTime); // Convert to an integer
}

function getCurrentMinute() {
  const options = {
    timeZone: 'Europe/Paris',
    minute: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const cetTime = formatter.format(new Date());

  return parseInt(cetTime); // Convert to an integer
}

function generateTimeDropdownItems() {
  const timeDropdown = document.getElementById('timeDropdown');
  const btnTime = document.getElementById('btnTime');

  const curr_hour = getCurrentHour();
  const curr_minute = getCurrentMinute();


  for (let hour = curr_hour; hour < 24; hour++) {
    start_minute = 0;
    if (hour === curr_hour) {
      start_minute = Math.ceil(curr_minute / 15) * 15;
    }

    for (let minutes = start_minute; minutes < 60; minutes += 15) {
      const li = document.createElement('li');
      const a = document.createElement('a');

      const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

      a.className = 'dropdown-item btn';
      a.textContent = time;

      a.addEventListener('click', function () {
        btnTime.textContent = time; // Change button text
      });

      li.appendChild(a);

      timeDropdown.appendChild(li)
    }
  }
}

window.onload = generateTimeDropdownItems;