const startButton = document.querySelector(".js-startButton");
const stopButton = document.querySelector(".js-stopButton");
const resetButton = document.querySelector(".js-resetButton");
const countingButtons = document.querySelector(".js-counterButtons");
const statusCountingInfo = document.querySelector(".js-countingStatus");

let pomodoroTime = 5;
let shortBrakeTime = 1;
let longBreakeTime = 2;
let sessionsToLongBrake = 2;



const numberFormat = (number) => {
    return number < 10 ? "0" + number : number;
};

const statusDisplay = (countingStatus) => {
    statusCountingInfo.innerHTML = `Status: ${countingStatus}`;
}

statusDisplay();

const toggleCountingStatus = () => {

}

const timerDisplay = (minutes, seconds, sessionCount) => {
    const timeCounter = document.querySelector(".js-timeCounter");
    timeCounter.innerHTML = `<p>${numberFormat(minutes)} : ${numberFormat(seconds)}</p>
    <p>Liczba sesji: <span class="sessionCounter js-sessionCounter">${sessionCount} / ${sessionsToLongBrake}</span></p>`;
};

const timeCounting = (minutes, seconds, sessionCount, countingStatus) => {
    const countingInterval = setInterval(() => {
        countingStatus = "pomodoro";
        
        if(minutes === 0 && seconds === 0){
            clearInterval(countingInterval)
            sessionCount++;
            minutes = sessionCount === sessionsToLongBrake ? longBreakeTime : shortBrakeTime;
            seconds = 0;
            breakeCounting(minutes, seconds, sessionCount, countingStatus);
        } else 
            if(seconds === 0){
                seconds = 19;
                minutes--;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds, sessionCount);
        statusDisplay(countingStatus);
    }, 1000);
    stopCounting(countingInterval);
};

const breakeCounting = (minutes, seconds, sessionCount, countingStatus) => {
    countingStatus = sessionCount === sessionsToLongBrake ? "long brake" : "short brake";
    const breakeInterval = setInterval(() => {
        if(minutes === 0 && seconds === 0){
            clearInterval(breakeInterval);
            minutes = pomodoroTime;
            seconds = 0;
            sessionCount = sessionCount === sessionsToLongBrake ? 0 : sessionCount;
            timeCounting(minutes, seconds, sessionCount);
        } else 
            if(seconds === 0){
                minutes--;
                seconds = 19;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds, sessionCount);
        statusDisplay(countingStatus);
    }, 1000);
    stopCounting(breakeInterval);
};

const startCounting = (minutes, seconds, sessionCount, countingStatus) => {
    startButton.addEventListener("click", () => {
        timeCounting(minutes, seconds, sessionCount, countingStatus);
        startButton.setAttribute("disabled", "");
        stopButton.removeAttribute("disabled");
    });
};

const stopCounting = (countingInterval, breakeInterval) => {
    stopButton.addEventListener("click", () => {
        clearInterval(countingInterval);
        clearInterval(breakeInterval);
        stopButton.setAttribute("disabled", "");
        startButton.removeAttribute("disabled");
        resetButton.removeAttribute("disabled");
    });
};

const resetCounter = (minutes, seconds, sessionCount, countingStatus) => {
    resetButton.addEventListener("click", () => {
        minutes = pomodoroTime;
        seconds = 0;
        sessionCount = 0;
        timerDisplay(minutes, seconds, sessionCount);

        countingStatus = "pomodoro";
        statusDisplay(countingStatus);

        resetButton.setAttribute("disabled", "");
    });
};

const init = () => {
    let minutes = pomodoroTime;
    let seconds = 0;
    let sessionCount = 0;

    let countingStatus = "pomodoro";
    statusDisplay(countingStatus);
    
    timerDisplay(minutes, seconds, sessionCount);
    startCounting(minutes, seconds, sessionCount, countingStatus);
    resetCounter(minutes, seconds, sessionCount, countingStatus);
};

init();