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
let timeLeft = 0;
let timeLeftPrev = 0;
let selectedDate;

// Options for Calendar
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    enableSeconds: true,
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

function getTimeLeft() {
    // Get current date
    const today = new Date();

    // How much time you have
    timeLeft = Math.round((selectedDate - today) / 1000);

    return timeLeft;
}

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

    // How much time you have
    timeLeft = getTimeLeft();

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

    // First displaying
    render();

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

// Start timer
function render() {
    let dataCurr;
    let dataPrev;
    let dataPrevSimple;
    let dataCurrString;
    let dataPrevString;

    // get actual time on every render
    timeLeft = getTimeLeft();

    // Checking time
    if (isTimeCome(timeLeft)) return;

    // obj {days, hours, mins, secs}
    dataCurr = convertMs(timeLeftPrev);
    dataPrev = convertMs(timeLeft);
    dataPrevSimple = convertMs(timeLeft + 1);

    // Combine time to one strings
    dataCurrString = dataCurr.days + dataCurr.hours + dataCurr.minutes + dataCurr.seconds;
    dataPrevString = dataPrev.days + dataPrev.hours + dataPrev.minutes + dataPrev.seconds;

    // If more then 99 days
    if (dataCurrString.length > 8 || dataPrevString.length > 8) {
        dataCurrString = dataCurrString.slice(-8);
        dataPrevString = dataPrevString.slice(-8);
    }

    // Indexes of changed digits
    const indexChangedDigits = getIndexChangedDigits(dataCurrString, dataPrevString);

    // Set values to display
    setDisplay(indexChangedDigits, dataCurrString, dataPrevString);

    // Switch classes for animations
    toggleClasses(indexChangedDigits);

    // Set values to simple display
    setDisplaySimple(dataPrevSimple);

    // Save time for next timer starting
    timeLeftPrev = timeLeft;
}

function queryElements(digit) {
    // Search "before" class
    let beforeUp = indexOfDigits[digit * 2].parentElement.querySelector(".before .up .inn");
    let beforeDown = indexOfDigits[digit * 2].parentElement.querySelector(".before .down .inn");
    // Search "active" class
    let activeUp = indexOfDigits[digit * 2].parentElement.querySelector(".active .up .inn");
    let activeDown = indexOfDigits[digit * 2].parentElement.querySelector(".active .down .inn");

    // If anim classes doesn't exist
    if (!beforeUp && !beforeDown && !activeUp && !activeDown) {
        beforeUp = indexOfDigits[digit * 2].parentElement.querySelector(".num.prev .up .inn");
        beforeDown = indexOfDigits[digit * 2].parentElement.querySelector(".num.prev .down .inn");
        activeUp = indexOfDigits[digit * 2].parentElement.querySelector(".num.curr .up .inn");
        activeDown = indexOfDigits[digit * 2].parentElement.querySelector(".num.curr .down .inn");
    }

    return { beforeUp, beforeDown, activeUp, activeDown };
}

function setDisplaySimple(objData) {
    // Simple counter
    days.innerText = objData.days;
    hours.innerText = objData.hours;
    mins.innerText = objData.minutes;
    secs.innerText = objData.seconds;
}

// Set numbers for changed displays
function setDisplay(indexChangedDigits, dataCurrString, dataPrevString) {
    indexChangedDigits.forEach((digit) => {
        const { beforeUp, beforeDown, activeUp, activeDown } = queryElements(digit);

        beforeUp.innerText = dataPrevString[digit];
        beforeDown.innerText = dataPrevString[digit];
        activeUp.innerText = dataCurrString[digit];
        activeDown.innerText = dataCurrString[digit];
    });
}

// Get nums from display
// function getDisplay() {
//     const timeCurr = [];
//     const timePrev = [];
//     const displayLen = [...indexOfDigits].length / 2;

//     for (let i = 0; i < displayLen; i++) {
//         const { activeUp, beforeDown } = queryElements(i);

//         timeCurr.push(activeUp.innerText);
//         timePrev.push(beforeDown.innerText);
//     }

//     return { timeCurr, timePrev };
// }

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

// Remove timer
function timerOff(id) {
    clearInterval(id);
    timerID = null;
}

// Checking time is out or no
function isTimeCome(sec) {
    if (sec < 0) {
        timerOff(timerID);
        startBtn.disabled = false;
        resetDigits();
        Notiflix.Notify.success("Time has come!");
        return true;
    }
    return false;
}

// Remove all anim classes
function resetDigits() {
    setDisplay([0, 1, 2, 3, 4, 5, 6, 7], "00000000", "00000000");
    toggleClasses([0, 1, 2, 3, 4, 5, 6, 7]);
    setDisplaySimple({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    timeLeftPrev = 0;
}

// Lead zero
function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
}

// Convert ms to obj
function convertMs(sec) {
    // Number of milliseconds per unit of time
    const second = 1;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(sec / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((sec % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((sec % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((sec % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
