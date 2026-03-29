//Day Night mode
function dayNight(mode) {
  const body = document.body;
  const dayBtn = document.getElementById("dayBtn");
  const nightBtn = document.getElementById("nightBtn");
  const starsOverlay = document.getElementById("stars-overlay");

  if (mode === "day") {
    body.classList.remove("night");
    body.classList.add("day");

    dayBtn.classList.add("active");
    nightBtn.classList.remove("active");

    localStorage.setItem("theme", "day");

    // REMOVE stars in day mode
    if (starsOverlay) starsOverlay.innerHTML = "";
  } else {
    body.classList.remove("day");
    body.classList.add("night");

    nightBtn.classList.add("active");
    dayBtn.classList.remove("active");

    localStorage.setItem("theme", "night");

    // ADD stars in night mode
    if (starsOverlay) {
      starsOverlay.innerHTML = ""; // clear old stars first
      buildStars();
    }
  }
}

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    dayNight(savedTheme);
  }
};

//Star creation (Ai generated)
function buildStars() {
  const el = document.getElementById("stars-overlay");
  for (let i = 0; i < 120; i++) {
    const s = document.createElement("div");
    const size = Math.random() * 2.5 + 0.5;
    s.className = "star";
    s.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      width:${size}px; height:${size}px;
      --max-op:${Math.random() * 0.7 + 0.3};
      --dur:${Math.random() * 3 + 1.5}s;
      animation-delay:${Math.random() * 3}s;
    `;
    el.appendChild(s);
  }
}

//Place suggestion
const pSuggestion = document.querySelector(".psCards");
for (let j = 0; j < 6; j++) {
  const psCard = document.createElement("div");
  psCard.className = "psCard";
  psCard.innerHTML = `
    <div class="psPlace">Shwe Dagon</div>
    <button><i class="fa-solid fa-angle-down"></i></button>
    <div class="psSuggestion">Golden mount of Myanmar</div>
    `;

  pSuggestion.append(psCard);
}

//Wind canvas

//Calendar
let currentDate = new Date();

function renderCalendar() {
  const calGrid = document.getElementById("calGrid");
  const monthLabel = document.getElementById("month-label");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Set month label
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  monthLabel.innerHTML = `${monthName} <span class="yearLabel">${year}</span>`;
}

renderCalendar();

const url =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,temperature_2m_mean,relative_humidity_2m_mean&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,wind_speed_10m,wind_direction_10m,is_day&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,wind_direction_10m,snowfall,rain&minutely_15=temperature_2m,relative_humidity_2m,is_day,rain,precipitation,snowfall,wind_speed_10m,wind_direction_10m,sunshine_duration";

async function fetchWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    console.log(data); // check the full API response
    hourlyForecast(data);
    weatherForecast(data); // pass data to your function to show it
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
}

// Call it on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    dayNight(savedTheme);
  }

  fetchWeather(); // fetch weather when page loads
};

//Hourly Forecast
function hourlyForecast(data) {
  const hourlyTemps = data.hourly.temperature_2m;
  const hourlyF = document.querySelector(".hForecastCards");
  if (!hourlyF) return;

  hourlyF.innerHTML = "";

  for (let i = 0; i < 24; i++) {
    const hCard = document.createElement("div");
    hCard.className = "hCard";

    hCard.innerHTML = `
      <div class="time">${String(i).padStart(2, "0")}:00</div>
      <div class="temp">${hourlyTemps[i]}°C</div>
      <div class="icon">☁️</div>
    `;

    hourlyF.append(hCard);
  }

  const currentTemp = data.current.temperature_2m;
  const currentEl = document.getElementById("currentTemp");
  if (currentEl) currentEl.innerText = `${currentTemp}°C`;
}

function weatherForecast(data) {
  const APITemp = data.current.temperature_2m;
  const weather = document.querySelector(".weather");
  if (!weather) return;

  weather.innerHTML = `
    <div class="estWeather">Estimated weather - Cloudy</div>
    <div class="estTemp">${APITemp}°C <i class="fa-solid fa-cloud-sun"></i></div>
  `;
}
