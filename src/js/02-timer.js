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
    },
};

flatpickr(input, options);

// startBtn.disabled = true;
startBtn.addEventListener('click', () => {
    setTimerDate(selectedDate);
});

// Check date
function setTimerDate(selectedDate) {

    if (!selectedDate) {
        Notiflix.Notify.failure("No selected date");
        return;
    }

    const today = new Date();
    timeLeft = Math.trunc((selectedDate - today) / 1000);

    if (timeLeft < 1) {
        Notiflix.Notify.failure("Please choose a date in the future");
        startBtn.disabled = true;
        return;
    }

    startBtn.disabled = false;
    setTimer();
}

// Set timer func
function setTimer() {
    console.log("Timer has started");
    if (timerID) clearInterval(timerID);
    timerID = setInterval(startTimer, 1000);
}

// Start timer
function startTimer() {
    console.log(timeLeft);
    const data = convertMs(timeLeft);
    console.log(data);
    days.innerText = data.days;
    hours.innerText = data.hours;
    mins.innerText = data.minutes;
    secs.innerText = data.seconds;
    timeLeft--;
    checkTime(timeLeft);
}

// Checking time is out or no
function checkTime(sec) {
    if (sec < 0) {
        clearInterval(timerID);
        Notiflix.Notify.success("Time has come!");
    }
}

function addLeadingZero(value) {
    function padStart() {}
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
