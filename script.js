const weatherAPI =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,weather_code";

let isNightMode = false;

// Setting up weather info with code from API
function weatherInfo(code, isDay) {
  if (code === 0) {
    return isDay
      ? { label: "Clear Sky", icon: "fa-sun", mood: "sunny" }
      : { label: "Clear Night", icon: "fa-moon", mood: "clear-night" };
  }

  if (code <= 2) {
    return isDay
      ? { label: "Partly Cloudy", icon: "fa-cloud-sun", mood: "cloudy" }
      : { label: "Partly Cloudy", icon: "fa-cloud-moon", mood: "clear-night" };
  }

  if (code === 3)
    return { label: "Overcast", icon: "fa-cloud", mood: "cloudy" };
  if (code <= 49) return { label: "Foggy", icon: "fa-smog", mood: "cloudy" };
  if (code <= 59)
    return { label: "Drizzle", icon: "fa-cloud-rain", mood: "rain" };
  if (code <= 69)
    return { label: "Rain", icon: "fa-cloud-showers-heavy", mood: "rain" };
  if (code <= 79) return { label: "Snow", icon: "fa-snowflake", mood: "snow" };
  if (code <= 94) return { label: "Storm", icon: "fa-bolt", mood: "thunder" };

  return { label: "Unknown", icon: "fa-cloud", mood: "cloudy" };
}

function getMoodBg(mood, forceNight) {
  if (forceNight) return "var(--bg-night)";

  const map = {
    sunny: "var(--bg-sunny)",
    cloudy: "var(--bg-cloudy)",
    rain: "var(--bg-rain)",
    snow: "var(--bg-snow)",
    thunder: "var(--bg-thunder)",
    "clear-night": "var(--bg-clear-night)",
  };

  return map[mood] || "var(--bg-cloudy)";
}

// Weather effect
function updateEffects(mood) {
  const starsOverlay = document.getElementById("stars-overlay");
  const rainOverlay = document.getElementById("rain-overlay");

  starsOverlay.classList.toggle("vissible", mood === "clear-night");
  rainOverlay.classList.toggle("vissible", mood === "rain");

  if (mood === "clear-night" && !starsOverlay.children.length) buildStars();
  if ((mood === "rain" || mood === "thunder") && !rainOverlay.children.length)
    buildRain();
}

// Renderng weather
function renderWeather(data) {
  const c = data.current;

  const isDay = c.is_day === 1;
  const wInfo = weatherInfo(c.weather_code, isDay);
  const mood = isNightMode ? "clear-night" : wInfo.mood;

  document.body.style.background = getMoodBg(mood, isNightMode);

  updateEffects(mood);

  // Current Temp
  const currentTemp = c.temperature_2m;
  const currentEl = document.getElementById("currentTemp");
  if (currentEl) currentEl.innerText = `${currentTemp}°C`;

  const weather = document.querySelector(".weather");
  if (weather) {
    weather.innerHTML = `
      <div class="estWeather">${wInfo.label}</div>
      <div class="estTemp">
        ${currentTemp}°C 
        <i class="fa-solid ${wInfo.icon}"></i>
      </div>
    `;
  }

  // Hourly forecast
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
    `;

    hourlyF.append(hCard);
  }
}

// Fetching API
async function fetchWeather() {
  try {
    const response = await fetch(weatherAPI);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    // console.log(data);

    renderWeather(data);
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
}

// Day Night Toggle
function dayNight(mode) {
  const body = document.body;
  const dayBtn = document.getElementById("dayBtn");
  const nightBtn = document.getElementById("nightBtn");
  const starsOverlay = document.getElementById("stars-overlay");
  const rainOverlay = document.getElementById("rain-overlay");

  if (mode === "day") {
    isNightMode = false;

    body.classList.remove("night");
    body.classList.add("day");

    dayBtn.classList.add("active");
    nightBtn.classList.remove("active");

    localStorage.setItem("theme", "day");

    if (starsOverlay) starsOverlay.innerHTML = "";
    if (rainOverlay) {
      rainOverlay.classList.add("visible");
      rainOverlay.innerHTML = "";
      buildRain();
    }
  } else {
    isNightMode = true;

    body.classList.remove("day");
    body.classList.add("night");

    nightBtn.classList.add("active");
    dayBtn.classList.remove("active");

    localStorage.setItem("theme", "night");

    if (starsOverlay) {
      starsOverlay.classList.add("visible");
      starsOverlay.innerHTML = "";
      buildStars();
    }
  }

  //
  fetchWeather();
}

// Star creation (AI generated)
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

// Rain creation (AI generated)
function buildRain() {
  const el = document.getElementById("rain-overlay");
  for (let i = 0; i < 80; i++) {
    const r = document.createElement("div");
    const h = Math.random() * 60 + 30;
    r.className = "raindrop";
    r.style.cssText = `
      left:${Math.random() * 100}%;
      height:${h}px;
      opacity:${Math.random() * 0.5 + 0.2};
      animation-duration:${Math.random() * 0.8 + 0.6}s;
      animation-delay:${Math.random() * 2}s;
    `;
    el.appendChild(r);
  }
}

// Saved Theme loading
window.onload = function () {
  const savedTheme = localStorage.getItem("theme") || "day";
  dayNight(savedTheme);

  fetchWeather();
};

// Calendar
// let currentDate = new Date();

// function renderCalendar() {
//   const monthLabel = document.getElementById("month-label");

//   const year = currentDate.getFullYear();
//   const monthName = currentDate.toLocaleString("default", {
//     month: "long",
//   });

//   if (monthLabel) {
//     monthLabel.innerHTML = `${monthName} <span class="yearLabel">${year}</span>`;
//   }
// }

// renderCalendar();
