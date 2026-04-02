const weatherAPI =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,weather_code";

const isNightMode = false;

// Remdering Weather
function renderWeather(data) {
  //Weather code
  // function weatherInfo(code, isDay) {
  //   if (code === 0) {
  //     return isDay
  //       ? { label: "Clear Sky", icon: "", background: "sunny" }
  //       : { label: "Clear Night", icon: "", background: "clear-night" };
  //   }
  //   if (code <= 2)
  //     return isDay
  //       ? { label: "Partly Cloudy", icon: "", mood: "cloudy" }
  //       : { label: "Partly Cloudy", icon: "", mood: "clear-night" };
  //   if (code === 3) return { label: "Overcast", icon: "", mood: "cloudy" };
  //   if (code <= 49) return { label: "Foggy", icon: "", mood: "cloudy" };
  //   if (code <= 59) return { label: "Drizzle", icon: "", mood: "rain" };
  //   if (code <= 69) return { label: "Rain", icon: "", mood: "rain" };
  //   if (code <= 79) return { label: "Snow", icon: "", mood: "snow" };
  //   if (code <= 84) return { label: "Rain Showers", icon: "", mood: "rain" };
  //   if (code <= 94) return { label: "Snow Showers", icon: "", mood: "snow" };
  //   return { label: "Thunderstorm", icon: "", mood: "thunder" };
  // }

  // function background(mood, forceNight) {
  //   if (forceNight) return "var(--night)";
  //   const map = {
  //     sunny: "var(--sunny)",
  //     cloudy: "var(--cloudy)",
  //     rain: "var(--rain)",
  //     snow: "var(--snow)",
  //     thunder: "var(--thunder)",
  //     "clear-night": "var(--clear-night)",
  //   };
  //   return map[mood] || "var(--cloudy)";
  // }

  // Current Weather
  const currentTemp = data.current.temperature_2m;
  const currentEl = document.getElementById("currentTemp");
  if (currentEl) currentEl.innerText = `${currentTemp}°C`;

  // Estimated weather
  const weather = document.querySelector(".weather");
  if (weather) {
    weather.innerHTML = `
      <div class="estWeather">Estimated weather</div>
      <div class="estTemp">${currentTemp}°C <i class="fa-solid fa-cloud-sun"></i></div>
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

// Weather API fetching
async function fetchWeather() {
  try {
    const response = await fetch(weatherAPI);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    console.log(data);

    renderWeather(data);
  } catch (err) {
    console.error("Error fetching weather:", err);
  }
}

// Day Night Mode Changer
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
      starsOverlay.innerHTML = "";
      buildStars();
    }
  }
}

// Stars creation
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
// Loading stored data from Local Storage
window.onload = function () {
  const savedTheme = localStorage.getItem("theme") || "day";
  dayNight(savedTheme);

  fetchWeather();
};

// Calendar
let currentDate = new Date();

function renderCalendar() {
  const monthLabel = document.getElementById("month-label");

  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  if (monthLabel) {
    monthLabel.innerHTML = `${monthName} <span class="yearLabel">${year}</span>`;
  }
}

renderCalendar();
