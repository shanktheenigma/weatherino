//Day Night mode
function dayNight(mode) {
  const body = document.body;
  const dayBtn = document.getElementById("dayBtn");
  const nightBtn = document.getElementById("nightBtn");

  if (mode === "day") {
    body.classList.remove("night");
    body.classList.add("day");

    dayBtn.classList.add("active");
    nightBtn.classList.remove("active");
    localStorage.setItem("theme", "day");
  } else {
    body.classList.remove("day");
    body.classList.add("night");

    nightBtn.classList.add("active");
    dayBtn.classList.remove("active");
    localStorage.setItem("theme", "night");
  }
}

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    dayNight(savedTheme);
  }
};

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
