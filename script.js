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

//Hourly Forecast
const hourlyF = document.querySelector(".hForecastCards");
for (let i = 0; i < 24; i++) {
  const hCard = document.createElement("div");
  hCard.className = "hCard";

  hCard.innerHTML = `
    <div class="time">${String(i).padStart(2, "0")}:00</div>
    <div class="temp">${25 + Math.floor(Math.random() * 5)}°</div>
    <div class="icon">☁️</div>`;

  hourlyF.append(hCard);
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
