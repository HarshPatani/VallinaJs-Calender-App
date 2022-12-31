let nav = 0;
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setDate(1);
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-us",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    daySquare.style.backgroundColor = "white";

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
        daySquare.style.backgroundColor = "#4471c4";
      }
    } else {
      daySquare.classList.add("padding");
    }
    const inputDay = document.getElementById("inputDay");
    inputDay.setAttribute("min", 1);
    inputDay.setAttribute("max", daysInMonth);

    calendar.appendChild(daySquare);
    daySquare.addEventListener("click", () => {
      if (daySquare.style.backgroundColor === "white") {
        daySquare.style.backgroundColor = "#00af50";
      } else if (daySquare.style.backgroundColor == "rgb(68, 113, 196)") {
        daySquare.style.backgroundColor = "#00af50";
      } else if (
        daySquare.id === "currentDay" &&
        daySquare.style.backgroundColor == "rgb(0, 175, 80)"
      ) {
        daySquare.style.backgroundColor = "#4471c4";
      } else {
        daySquare.style.backgroundColor = "white";
      }
    });
  }
}

function initButtons() {
  document.getElementById("nextBtn").addEventListener("click", () => {
    ++nav;
    load();
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    --nav;
    load();
  });
}

function onEnterPress() {
  const inputDay = document.getElementById("inputDay");
  const days = document.getElementsByClassName("day");
  let arrayDays = Array.from(days);
  arrayDays.map((item) => {
    if (item.innerText === inputDay.value) {
      if (item.style.backgroundColor === "white") {
        item.style.backgroundColor = "#00af50";
      } else if (item.style.backgroundColor == "rgb(68, 113, 196)") {
        item.style.backgroundColor = "#00af50";
      } else if (
        item.id === "currentDay" &&
        item.style.backgroundColor == "rgb(0, 175, 80)"
      ) {
        item.style.backgroundColor = "#4471c4";
      } else {
        item.style.backgroundColor = "white";
      }
    }
  });
}

initButtons();
load();
