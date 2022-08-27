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

// const displayTest = document.querySelectorAll(".inn");
// console.log(displayTest);

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
        // FIRST DIGIT
        prevFirstDigit: {
            up: document.querySelector(".secs-f .num.prev .up .inn"),
            down: document.querySelector(".secs-f .num.prev .down .inn"),
        },

        currFirstDigit: {
            up: document.querySelector(".secs-f .num.curr .up .inn"),
            down: document.querySelector(".secs-f .num.curr .down .inn"),
        },
        // SECOND DIGIT
        prevSecondDigit: {
            up: document.querySelector(".secs-s .num.prev .up .inn"),
            down: document.querySelector(".secs-s .num.prev .down .inn"),
        },

        currSecondDigit: {
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
    onOpen() {
        // removeClasses();
    },
};

// Remove all anim classes
function removeClasses() {
    indexOfDigits.forEach((element) => {
        element.classList.remove("before");
        element.classList.remove("active");
    });
}

// Init calendar
flatpickr(input, options);

// Disable button on start
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

    // obj {days, hours, mins, secs}
    const dataCurr = convertMs(timeLeft);
    rolling(dataCurr);

    return true;
}

// Set timer func
function setTimer() {
    console.log("Timer has started");
    startBtn.disabled = true;
    if (timerID) timerOff(timerID);
    timerID = setInterval(render, 1000);
}

// Get only changed digits
function getIndexChangedDigits(dataCurr, dataPrev) {
    // Array with index of changed digits
    const indexChangedDigits = [];
    [...dataCurr].forEach((item, index) => {
        if ([...dataPrev][index] != item) indexChangedDigits.push(index);
    });

    return indexChangedDigits;
}

// Rolling effect on start
function rolling(dataCurr) {


    // Adding all of elements anim classes
    for (let i = 0; i <= indexOfDigits.length - 2; i += 2) {
        indexOfDigits[i + 1].classList.add("before");
        indexOfDigits[i].classList.add("active");
    }

    // Background numbers
    display.days.setPrev(dataCurr.days.toString());
    display.hours.setPrev(dataCurr.hours.toString());
    display.mins.setPrev(dataCurr.minutes.toString());
    display.secs.setPrev(dataCurr.seconds.toString());
}

// Start timer
function render() {
    // obj {days, hours, mins, secs}
    const dataCurr = convertMs(timeLeft);
    const dataPrev = convertMs(timeLeft - 1);
    const dataCurrString = dataCurr.days + dataCurr.hours + dataCurr.minutes + dataCurr.seconds;
    const dataPrevString = dataPrev.days + dataPrev.hours + dataPrev.minutes + dataPrev.seconds;

    // Indexes of changed digits
    const indexChangedDigits = getIndexChangedDigits(dataCurrString, dataPrevString);

    // Simple counter
    days.innerText = dataCurr.days;
    hours.innerText = dataCurr.hours;
    mins.innerText = dataCurr.minutes;
    secs.innerText = dataCurr.seconds;

    // Set values to display
    setDisplay(indexChangedDigits, dataCurrString, dataPrevString);

    // Switch classes for animations
    toggleClasses(indexChangedDigits);

    // Reduce time
    timeLeft--;

    // Check time
    isTimeCome(timeLeft);
}

// Set numbers for changed displays
function setDisplay(indexChangedDigits, dataCurrString, dataPrevString) {
    indexChangedDigits.forEach((digit) => {
        // Search "before" class
        const beforeUp = indexOfDigits[digit * 2].parentElement.querySelector(".before .up .inn");
        const beforeDown =
            indexOfDigits[digit * 2].parentElement.querySelector(".before .down .inn");
        const activeUp = indexOfDigits[digit * 2].parentElement.querySelector(".active .up .inn");
        const activeDown =
            indexOfDigits[digit * 2].parentElement.querySelector(".active .down .inn");

        beforeUp.innerText = dataPrevString[digit];
        beforeDown.innerText = dataPrevString[digit];
        activeUp.innerText = dataCurrString[digit];
        activeDown.innerText = dataCurrString[digit];
    });
}

// Toggle classes for digits(Animation)
function toggleClasses(indexChangedDigits) {
    indexChangedDigits.forEach((digit) => {
        const elemWithBefore = indexOfDigits[digit * 2].parentElement.querySelector(".before");
        const elemWithActive = indexOfDigits[digit * 2].parentElement.querySelector(".active");

        elemWithBefore.classList.remove("before");
        elemWithActive.classList.replace("active", "before");
        elemWithBefore.classList.add("active");
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
