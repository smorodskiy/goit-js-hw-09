import Notiflix from "notiflix";

const inputFirstDelay = document.querySelector('input[name="delay"]');
const inputStepDelay = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const buttonCreate = document.querySelector("button");

const createPromise = (position, delay) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });

buttonCreate.addEventListener("click", (e) => {
    e.preventDefault();

    let delay = +inputFirstDelay.value;

    for (let i = 1; i <= inputAmount.value; i++) {
        createPromise(i, delay)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });

        delay += +inputStepDelay.value;
    }
});
