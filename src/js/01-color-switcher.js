const buttons = document.querySelectorAll("button");
const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
stopBtn.disabled = true;

// Id of timer
let changeColorID;

// Events
buttons.forEach((button) => {
    button.addEventListener("click", (e) => onClick(e));
});

// Button on click func
function onClick(e) {
    const elem = e.target;

    if (elem == startBtn) {
        changeColorID = setInterval(changeColorBody, 1000);
        toggleState(startBtn, stopBtn);
    } else if (elem == stopBtn) {
        clearInterval(changeColorID);
        toggleState(startBtn, stopBtn);
    }
}

// Toggle state of buttons
function toggleState(btn1, btn2) {
    btn1.disabled = !btn1.disabled;
    btn2.disabled = !btn2.disabled;
}

// Change bg body color
function changeColorBody() {
    const body = document.body;
    body.style.backgroundColor = getRandomHexColor();
}

// Randomize color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
