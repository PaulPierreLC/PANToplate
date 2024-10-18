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

            a.addEventListener('click', function() {
                btnTime.textContent = time; // Change button text
            });
            
            li.appendChild(a);

            timeDropdown.appendChild(li)
        }
    }
}

window.onload = generateTimeDropdownItems;