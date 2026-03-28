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

//

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
