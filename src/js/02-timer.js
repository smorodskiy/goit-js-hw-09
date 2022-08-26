import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { indexOf } from "lodash";
import Notiflix from "notiflix";

const input = document.getElementById("datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const mins = document.querySelector("[data-minutes]");
const secs = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");

const displayTest = document.querySelectorAll(".inn");
console.log(displayTest);

const display = {
    // DAYS
    days: {
        setCurr(nums) {
            this.currFirstDigit.up.innerText = [...nums][0];
            this.currSecondDigit.up.innerText = [...nums][1];
            this.currFirstDigit.down.innerText = [...nums][0];
            this.currSecondDigit.down.innerText = [...nums][1];
        },

        setPrev(nums) {
            this.prevFirstDigit.up.innerText = [...nums][0];
            this.prevSecondDigit.up.innerText = [...nums][1];
            this.prevFirstDigit.down.innerText = [...nums][0];
            this.prevSecondDigit.down.innerText = [...nums][1];
        },

        prevFirstDigit: {
            up: document.querySelector(".days-f .num.prev .up .inn"),
            down: document.querySelector(".days-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            up: document.querySelector(".days-f .num.curr .up .inn"),
            down: document.querySelector(".days-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            up: document.querySelector(".days-s .num.prev .up .inn"),
            down: document.querySelector(".days-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            up: document.querySelector(".days-s .num.curr .up .inn"),
            down: document.querySelector(".days-s .num.curr .down .inn"),
        },
    },

    // HOURS
    hours: {
        setCurr(nums) {
            this.currFirstDigit.up.innerText = [...nums][0];
            this.currSecondDigit.up.innerText = [...nums][1];
            this.currFirstDigit.down.innerText = [...nums][0];
            this.currSecondDigit.down.innerText = [...nums][1];
        },

        setPrev(nums) {
            this.prevFirstDigit.up.innerText = [...nums][0];
            this.prevSecondDigit.up.innerText = [...nums][1];
            this.prevFirstDigit.down.innerText = [...nums][0];
            this.prevSecondDigit.down.innerText = [...nums][1];
        },

        prevFirstDigit: {
            up: document.querySelector(".hours-f .num.prev .up .inn"),
            down: document.querySelector(".hours-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            up: document.querySelector(".hours-f .num.curr .up .inn"),
            down: document.querySelector(".hours-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            up: document.querySelector(".hours-s .num.prev .up .inn"),
            down: document.querySelector(".hours-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            up: document.querySelector(".hours-s .num.curr .up .inn"),
            down: document.querySelector(".hours-s .num.curr .down .inn"),
        },
    },

    // MINUTES
    mins: {
        setCurr(nums) {
            this.currFirstDigit.up.innerText = [...nums][0];
            this.currSecondDigit.up.innerText = [...nums][1];
            this.currFirstDigit.down.innerText = [...nums][0];
            this.currSecondDigit.down.innerText = [...nums][1];
        },

        setPrev(nums) {
            this.prevFirstDigit.up.innerText = [...nums][0];
            this.prevSecondDigit.up.innerText = [...nums][1];
            this.prevFirstDigit.down.innerText = [...nums][0];
            this.prevSecondDigit.down.innerText = [...nums][1];
        },

        prevFirstDigit: {
            up: document.querySelector(".mins-f .num.prev .up .inn"),
            down: document.querySelector(".mins-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            up: document.querySelector(".mins-f .num.curr .up .inn"),
            down: document.querySelector(".mins-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            up: document.querySelector(".mins-s .num.prev .up .inn"),
            down: document.querySelector(".mins-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            up: document.querySelector(".mins-s .num.curr .up .inn"),
            down: document.querySelector(".mins-s .num.curr .down .inn"),
        },
    },

    // SECONDS
    secs: {
        setCurr(nums) {
            this.currFirstDigit.up.innerText = [...nums][0];
            this.currSecondDigit.up.innerText = [...nums][1];
            this.currFirstDigit.down.innerText = [...nums][0];
            this.currSecondDigit.down.innerText = [...nums][1];
        },

        setPrev(nums) {
            this.prevFirstDigit.up.innerText = [...nums][0];
            this.prevSecondDigit.up.innerText = [...nums][1];
            this.prevFirstDigit.down.innerText = [...nums][0];
            this.prevSecondDigit.down.innerText = [...nums][1];
        },

        prevFirstDigit: {
            root: document.querySelector(".secs-f .num.prev"),
            up: document.querySelector(".secs-f .num.prev .up .inn"),
            down: document.querySelector(".secs-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            root: document.querySelector(".secs-f .num.curr"),
            up: document.querySelector(".secs-f .num.curr .up .inn"),
            down: document.querySelector(".secs-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            root: document.querySelector(".secs-s .num.prev"),
            up: document.querySelector(".secs-s .num.prev .up .inn"),
            down: document.querySelector(".secs-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            root: document.querySelector(".secs-s .num.curr"),
            up: document.querySelector(".secs-s .num.curr .up .inn"),
            down: document.querySelector(".secs-s .num.curr .down .inn"),
        },
    },
};

console.log(display);
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
    const dataBackground = convertMs(timeLeft - 1);
    // console.log(data);

    days.innerText = data.days;
    hours.innerText = data.hours;
    mins.innerText = data.minutes;
    secs.innerText = data.seconds;

    // let combine = days.innerText + hours.innerText + mins.innerText + secs.innerText;
    // let combineBg =
    //     dataBackground.days +
    //     dataBackground.hours +
    //     dataBackground.minutes +
    //     dataBackground.seconds;

    // Visible numbers
    display.days.setCurr(data.days.toString());
    display.hours.setCurr(data.hours.toString());
    display.mins.setCurr(data.minutes.toString());
    display.secs.setCurr(data.seconds.toString());

    // Background numbers
    display.days.setPrev(dataBackground.days.toString());
    display.hours.setPrev(dataBackground.hours.toString());
    display.mins.setPrev(dataBackground.minutes.toString());
    display.secs.setPrev(dataBackground.seconds.toString());

    const arrVisibleNums = data.days + data.hours + data.minutes + data.seconds;
    const arrBgNums =
        dataBackground.days +
        dataBackground.hours +
        dataBackground.minutes +
        dataBackground.seconds;

    console.log([...arrVisibleNums]);
    console.log([...arrBgNums]);

    const indexDigits = [...arrVisibleNums].forEach((item, index) => {
 
        if ([...arrBgNums][index] != item) return index;
    })

    console.log(indexDigits);
    // toggleClasses(display.secs.prevSecondDigit.root);

    // console.log("ac " + [...combine]);
    // console.log("bg " + [...combineBg]);

    timeLeft--;
    isTimeCome(timeLeft);
}

function toggleClasses() {
    const isActive = display.secs.prevSecondDigit.root.classList.contains("active");
    const isBefore = display.secs.prevSecondDigit.root.classList.contains("before");

    if (!isActive && !isBefore) {
        display.secs.prevSecondDigit.root.classList.add("before");
    } else {
        display.secs.prevSecondDigit.root.classList.toggle("active", isBefore);
        display.secs.prevSecondDigit.root.classList.toggle("before", isActive);
    }
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
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
