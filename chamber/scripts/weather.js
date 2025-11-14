const weatherIcon = document.querySelector("#weatherIcon");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".desc");
const highEl = document.querySelector(".high");
const lowEl = document.querySelector(".low");
const humidityEl = document.querySelector(".humidity");
const sunriseEl = document.querySelector(".sunrise");
const sunsetEl = document.querySelector(".sunset");

const forecastBox = document.querySelector("#forecast");

const apiKey = "9c30a7ed2453330fd6c2392cfbb13398";
const lat = -33.918861;
const lon = 18.423300;

// ---------------- CURRENT WEATHER ----------------
async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  weatherIcon.src = iconSrc;
  weatherIcon.alt = data.weather[0].description;

  tempEl.textContent = `Temperature: ${data.main.temp}°C`;
  descEl.textContent = data.weather[0].description;
  highEl.textContent = `High: ${data.main.temp_max}°C`;
  lowEl.textContent = `Low: ${data.main.temp_min}°C`;
  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);

  sunriseEl.textContent = `Sunrise: ${sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  sunsetEl.textContent = `Sunset: ${sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

// ---------------- FORECAST ----------------
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  forecastBox.innerHTML = "";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  daily.forEach(day => {
    const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

    const p = document.createElement("p");
    p.textContent = `${date}: ${day.main.temp}°C`;

    forecastBox.appendChild(p);
  });
}

// run both
getCurrentWeather();
getForecast();