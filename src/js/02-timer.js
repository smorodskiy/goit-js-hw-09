import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.getElementById("datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const mins = document.querySelector("[data-minutes]");
const secs = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");

// Global vars
let timerID;
let timeLeft;
let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // minDate: "today",
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        checkDate(selectedDate);
    },
};

flatpickr(input, options);

startBtn.disabled = true;

startBtn.addEventListener("click", () => {
    if (checkDate(selectedDate)) setTimer();
});

// Check date
function checkDate(selectedDate) {
    if (timerID) timerOff(timerID);

    // Return if date is not selected
    if (selectedDate === undefined) {
        Notiflix.Notify.failure("No selected date");
        startBtn.disabled = true;
        return false;
    }

    // Current date
    const today = new Date();
    // How much time you have
    timeLeft = Math.trunc((selectedDate - today) / 1000);

    // Return if selected date is not in future
    if (timeLeft < 1) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;
        return false;
    }

    startBtn.disabled = false;
    return true;
}

// Set timer func
function setTimer() {
    console.log("Timer has started");
    startBtn.disabled = true;
    if (timerID) timerOff(timerID);
    timerID = setInterval(renderTime, 1000);
}

// Start timer
function renderTime() {
    // console.log(timeLeft);
    const data = convertMs(timeLeft);
    // console.log(data);
    days.innerText = addLeadingZero(data.days);
    hours.innerText = addLeadingZero(data.hours);
    mins.innerText = addLeadingZero(data.minutes);
    secs.innerText = addLeadingZero(data.seconds);
    timeLeft--;
    isTimeCome(timeLeft);
}

function timerOff(id) {
    clearInterval(id);
    const zero = "00";
    days.innerText = zero;
    hours.innerText = zero;
    mins.innerText = zero;
    secs.innerText = zero;
}

// Checking time is out or no
function isTimeCome(sec) {
    if (sec < 0) {
        timerOff(timerID);
        Notiflix.Notify.success("Time has come!");
    }
}

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
