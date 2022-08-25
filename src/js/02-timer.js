import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.getElementById("datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const mins = document.querySelector("[data-minutes]");
const secs = document.querySelector("[data-seconds]");
let timerID;

// Notiflix.Notify.success("Sol lucet omnibus");
// Notiflix.Notify.failure("Qui timide rogat docet negare");
// Notiflix.Notify.warning("Memento te hominem esse");
// Notiflix.Notify.info("Cogito ergo sum");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // minDate: "today",
    onClose(selectedDates) {
        setTimer(selectedDates[0]);
    },
};

flatpickr(input, options);

// Set timer func
function setTimer(selDate) {
    const today = new Date();
    const timeLeft = selDate - today;

    if (timeLeft < 1) {
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
    }

    timerID = setInterval(() => startTimer(timeLeft), 1000);
}

function startTimer(timeLeft) {
    console.log("Timer has started");

    const data = convertMs(timeLeft);
    console.log(data);
    days.innerText = data.days;
    hours.innerText = data.hours;
    mins.innerText = data.minutes;
    secs.innerText = data.seconds;

    timeLeft = timeLeft - 1;
    console.log(timeLeft);

}

function addLeadingZero(value) {
    function padStart() {}
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
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
