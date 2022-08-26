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
            root: document.querySelector(".days-f .num.prev"),
            up: document.querySelector(".days-f .num.prev .up .inn"),
            down: document.querySelector(".days-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            root: document.querySelector(".days-f .num.curr"),
            up: document.querySelector(".days-f .num.curr .up .inn"),
            down: document.querySelector(".days-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            root: document.querySelector(".days-s .num.prev"),
            up: document.querySelector(".days-s .num.prev .up .inn"),
            down: document.querySelector(".days-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            root: document.querySelector(".days-s .num.curr"),
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
            root: document.querySelector(".hours-f .num.prev"),
            up: document.querySelector(".hours-f .num.prev .up .inn"),
            down: document.querySelector(".hours-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            root: document.querySelector(".hours-f .num.curr"),
            up: document.querySelector(".hours-f .num.curr .up .inn"),
            down: document.querySelector(".hours-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            root: document.querySelector(".hours-s .num.prev"),
            up: document.querySelector(".hours-s .num.prev .up .inn"),
            down: document.querySelector(".hours-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            root: document.querySelector(".hours-s .num.curr"),
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
            root: document.querySelector(".mins-f .num.prev"),
            up: document.querySelector(".mins-f .num.prev .up .inn"),
            down: document.querySelector(".mins-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            root: document.querySelector(".mins-f .num.curr"),
            up: document.querySelector(".mins-f .num.curr .up .inn"),
            down: document.querySelector(".mins-f .num.curr .down .inn"),
        },

        prevSecondDigit: {
            root: document.querySelector(".mins-s .num.prev"),
            up: document.querySelector(".mins-s .num.prev .up .inn"),
            down: document.querySelector(".mins-s .num.prev .down .inn"),
        },

        currSecondDigit: {
            root: document.querySelector(".mins-s .num.curr"),
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
        // FIRST DIGIT
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
        // SECOND DIGIT
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

const indexOfDigits = document.querySelectorAll(".num.prev, .num.curr");
console.log(indexOfDigits);

// Global vars
let timerID;
let timeLeft;
let selectedDate;

// Options for Calendar
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

// Event on click's button
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
    // obj {days, hours, mins, secs}
    const data = convertMs(timeLeft);
    const dataMinusOne = convertMs(timeLeft - 1);

    days.innerText = data.days;
    hours.innerText = data.hours;
    mins.innerText = data.minutes;
    secs.innerText = data.seconds;

    // Visible numbers
    display.days.setCurr(data.days.toString());
    display.hours.setCurr(data.hours.toString());
    display.mins.setCurr(data.minutes.toString());
    display.secs.setCurr(data.seconds.toString());

    // Background numbers
    display.days.setPrev(dataMinusOne.days.toString());
    display.hours.setPrev(dataMinusOne.hours.toString());
    display.mins.setPrev(dataMinusOne.minutes.toString());
    display.secs.setPrev(dataMinusOne.seconds.toString());

    // // Visible numbers
    // display.days.setPrev(data.days.toString());
    // display.hours.setPrev(data.hours.toString());
    // display.mins.setPrev(data.minutes.toString());
    // display.secs.setPrev(data.seconds.toString());

    // // Background numbers
    // display.days.setCurr(dataMinusOne.days.toString());
    // display.hours.setCurr(dataMinusOne.hours.toString());
    // display.mins.setCurr(dataMinusOne.minutes.toString());
    // display.secs.setCurr(dataMinusOne.seconds.toString());

    const arrVisibleNums = data.days + data.hours + data.minutes + data.seconds;
    const arrBgNums =
        dataMinusOne.days + dataMinusOne.hours + dataMinusOne.minutes + dataMinusOne.seconds;

    // Array with index of changed digits
    const indexDigits = [];
    [...arrVisibleNums].forEach((item, index) => {
        if ([...arrBgNums][index] != item) indexDigits.push(index);
    });

    // Switch classes for animations
    toggleClasses(indexDigits);

    // Reduce time
    timeLeft--;

    // Check time
    isTimeCome(timeLeft);
}

// Toggle classes for digits(Animation)
function toggleClasses(indexDigits) {
    indexDigits.forEach((digit) => {
        const isBefore = indexOfDigits[digit * 2].classList.contains("before");
        const isActive = indexOfDigits[digit * 2].classList.contains("active");

        if (!isActive && !isBefore) {
            indexOfDigits[digit * 2].classList.add("before");
            indexOfDigits[digit * 2 + 1].classList.add("active");
        } else if (isBefore) {
            indexOfDigits[digit * 2].classList.remove("before");
            indexOfDigits[digit * 2 + 1].classList.replace("active", "before");
            indexOfDigits[digit * 2].classList.add("active");
        } else {
            indexOfDigits[digit * 2 + 1].classList.remove("before");
            indexOfDigits[digit * 2].classList.replace("active", "before");
            indexOfDigits[digit * 2 + 1].classList.add("active");
        }
    });
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
