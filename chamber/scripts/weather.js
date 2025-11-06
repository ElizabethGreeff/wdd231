// --- WEATHER FETCH AND DISPLAY ---
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecastWeather');
const city = "Cape Town";

function getWeatherIcon(description) {
  const desc = description.toLowerCase();
  if (desc.includes('sun') || desc.includes('clear')) return 'images/sunny.svg';
  if (desc.includes('cloud')) return 'images/cloudy.svg';
  if (desc.includes('rain')) return 'images/rain.svg';
  if (desc.includes('storm')) return 'images/storm.svg';
  if (desc.includes('snow')) return 'images/snow.svg';
  return 'images/sunny.svg';
}

async function fetchWeather() {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    // --- CURRENT WEATHER ---
    const current = data.current_condition[0];
    const today = data.weather[0]; // today's data includes sunrise/sunset, high, low, etc.

    const high = today.maxtempC;
    const low = today.mintempC;
    const humidity = current.humidity;
    const sunrise = today.astronomy[0].sunrise;
    const sunset = today.astronomy[0].sunset;
    const iconUrl = current.weatherIconUrl?.[0]?.value || getWeatherIcon(current.weatherDesc[0].value);


    currentWeatherDiv.innerHTML = `
      <p><strong>${city}</strong></p>
      <img src="${iconUrl}" alt="${current.weatherDesc[0].value}" width="60">
      <p>${current.temp_C}°C — ${current.weatherDesc[0].value}</p>
      <p>High: ${high}°C / Low: ${low}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>🌅 Sunrise: ${sunrise}</p>
      <p>🌇 Sunset: ${sunset}</p>
    `;

    // --- Forecast (next 3 days) ---
    const days = data.weather.slice(1, 4);
    forecastDiv.innerHTML = `
      ${days.map(day => `
        <div class="forecast-day">
          <p><strong>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</strong></p>
          <p>${day.avgtempC}°C</p>
          <p>High: ${day.maxtempC}°C / Low: ${day.mintempC}°C</p>
        </div>
      `).join('')}
    `;

  } catch (err) {
    console.error(err);
    currentWeatherDiv.innerHTML = `<p>Could not load weather data.</p>`;
  }
}

// --- EVENTS ---
async function showEvents() {
  try {
    const response = await fetch('data/events.json');
    const events = await response.json();

    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = events.map(ev => `
      <li>
        <strong>${new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}:</strong> 
        ${ev.title}<br>
        <small>${ev.description}</small>
      </li>
    `).join('');
  } catch (error) {
    console.error('Error loading events:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  showEvents();
});