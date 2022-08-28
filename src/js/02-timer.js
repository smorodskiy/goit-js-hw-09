import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const input = document.getElementById("datetime-picker");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const mins = document.querySelector("[data-minutes]");
const secs = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");
const indexOfDigits = document.querySelectorAll(".num.prev, .num.curr");

// Global vars
let timerID;
let timeLeft;
let selectedDate;

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

        getCurr() {
            return this.currFirstDigit.up.innerText + this.currSecondDigit.up.innerText;
        },

        getPrev() {
            return this.prevFirstDigit.up.innerText + this.prevSecondDigit.up.innerText;
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

        getCurr() {
            return this.currFirstDigit.up.innerText + this.currSecondDigit.up.innerText;
        },

        getPrev() {
            return this.prevFirstDigit.up.innerText + this.prevSecondDigit.up.innerText;
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

        getCurr() {
            return this.currFirstDigit.up.innerText + this.currSecondDigit.up.innerText;
        },

        getPrev() {
            return this.prevFirstDigit.up.innerText + this.prevSecondDigit.up.innerText;
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

        getCurr() {
            return this.currFirstDigit.up.innerText + this.currSecondDigit.up.innerText;
        },

        getPrev() {
            return this.prevFirstDigit.up.innerText + this.prevSecondDigit.up.innerText;
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

// Init calendar
flatpickr(input, options);

// Disable button on start
startBtn.disabled = true;

// Event on click's button
startBtn.addEventListener("click", () => {
    if (checkDate(selectedDate)) setTimer();
});

// Check date is correct
function checkDate(selectedDate) {
    // Remove timer if already set
    if (timerID) timerOff(timerID);

    // Return if date is not selected
    if (selectedDate === undefined) {
        Notiflix.Notify.failure("No selected date");
        startBtn.disabled = true;
        return false;
    }

    // Get current date
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

    // if all correct return true
    return true;
}

// Set timer func
function setTimer() {
    console.log("Timer has started");
    startBtn.disabled = true;

    // Remove timer if already set
    if (timerID) timerOff(timerID);

    // obj {days, hours, mins, secs}
    const dataCurr = convertMs(timeLeft);

    firstTimeSet(dataCurr);

    // Starting timer and rendering display
    timerID = setInterval(render, 1000);
}

// Get indices only changed digits
function getIndexChangedDigits(arrCurr, arrPrev) {
    // Array with indices of changed digits
    const indexChangedDigits = [];
    [...arrCurr].forEach((item, index) => {
        if ([...arrPrev][index] != item) indexChangedDigits.push(index);
    });
    return indexChangedDigits;
}

// First seting display's nums and rolling it
function firstTimeSet(objDate) {
    const dataCurrString = objDate.days + objDate.hours + objDate.minutes + objDate.seconds;
    const dataPrevString =
        display.days.getPrev() +
        display.hours.getPrev() +
        display.mins.getPrev() +
        display.secs.getPrev();

    // Indexes of changed digits
    const indexChangedDigits = getIndexChangedDigits(dataCurrString, dataPrevString);
    setDisplay(indexChangedDigits, dataPrevString, dataCurrString);
    toggleClasses(indexChangedDigits);
}

// Start timer
function render() {
    // obj {days, hours, mins, secs}
    const dataCurr = convertMs(timeLeft - 1);
    const dataPrev = convertMs(timeLeft - 2);

    const dataCurrString = dataCurr.days + dataCurr.hours + dataCurr.minutes + dataCurr.seconds;
    const dataPrevString = dataPrev.days + dataPrev.hours + dataPrev.minutes + dataPrev.seconds;

    // Indexes of changed digits
    const indexChangedDigits = getIndexChangedDigits(dataCurrString, dataPrevString);

    // Set values to display
    setDisplay(indexChangedDigits, dataCurrString, dataPrevString);

    // Switch classes for animations
    toggleClasses(indexChangedDigits);

    // Simple counter
    days.innerText = dataCurr.days;
    hours.innerText = dataCurr.hours;
    mins.innerText = dataCurr.minutes;
    secs.innerText = dataCurr.seconds;

    // Reduce time
    timeLeft--;

    // Check time
    isTimeCome(timeLeft);
}

// Set numbers for changed displays
function setDisplay(indexChangedDigits, dataCurrString, dataPrevString) {
    indexChangedDigits.forEach((digit) => {
        // Search "before" class
        let beforeUp = indexOfDigits[digit * 2].parentElement.querySelector(".before .up .inn");
        let beforeDown = indexOfDigits[digit * 2].parentElement.querySelector(".before .down .inn");
        // Search "active" class
        let activeUp = indexOfDigits[digit * 2].parentElement.querySelector(".active .up .inn");
        let activeDown = indexOfDigits[digit * 2].parentElement.querySelector(".active .down .inn");

        // If anim classes doesn't exist
        if (!beforeUp && !beforeDown && !activeUp && !activeDown) {
            beforeUp = indexOfDigits[digit * 2].parentElement.querySelector(".num.prev .up .inn");
            beforeDown =
                indexOfDigits[digit * 2].parentElement.querySelector(".num.prev .down .inn");
            activeUp = indexOfDigits[digit * 2].parentElement.querySelector(".num.curr .up .inn");
            activeDown =
                indexOfDigits[digit * 2].parentElement.querySelector(".num.curr .down .inn");
        }

        beforeUp.innerText = dataPrevString[digit];
        beforeDown.innerText = dataPrevString[digit];
        activeUp.innerText = dataCurrString[digit];
        activeDown.innerText = dataCurrString[digit];
    });
}

// Toggle classes for digits(Animation)
function toggleClasses(indexChangedDigits) {
    indexChangedDigits.forEach((digit) => {
        let elemWithBefore = indexOfDigits[digit * 2].parentElement.querySelector(".before");
        let elemWithActive = indexOfDigits[digit * 2].parentElement.querySelector(".active");

        // If anim classes doesn't exist
        if (!elemWithBefore && !elemWithActive) {
            let elemWithBefore = indexOfDigits[digit * 2].parentElement.querySelector(".num.curr");
            let elemWithActive = indexOfDigits[digit * 2].parentElement.querySelector(".num.prev");
            elemWithBefore.classList.add("before");
            elemWithActive.classList.add("active");
            return;
        }

        elemWithBefore.classList.remove("before");
        elemWithActive.classList.replace("active", "before");
        elemWithBefore.classList.add("active");
    });
}

function timerOff(id) {
    clearInterval(id);
}

// Checking time is out or no
function isTimeCome(sec) {
    if (sec == 0) {
        timerOff(timerID);
        resetDigits();
        startBtn.disabled = false;
        Notiflix.Notify.success("Time has come!");
    }
}

// Remove all anim classes
function resetDigits() {
    setDisplay([0, 1, 2, 3, 4, 5, 6, 7], "00000000", "00000000");
}

// Lead zero
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

// Convert ms to obj
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
