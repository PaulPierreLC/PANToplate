function getCurrentHour() {
  const options = {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat([], options);
  const cetTime = formatter.format(new Date());

  return cetTime
}

function generateTimeOptions() {
    const select = document.getElementById('heure');
    
    const curr_hour = getCurrentHour();

    for (let hour = curr_hour; hour < 24; hour++) {
        for (let minutes = 0; minutes < 60; minutes += 15) {
            const option = document.createElement('option');
            
            const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            
            option.value = time;
            option.textContent = time;
            
            select.appendChild(option);
        }
    }
}

window.onload = generateTimeOptions;