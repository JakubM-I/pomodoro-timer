const pomodorTimer = document.querySelector(".js-pomodoroTimer");
const startButton = document.querySelector(".js-startButton");
const stopButton = document.querySelector(".js-stopButton");
const resetButton = document.querySelector(".js-resetButton");
const countingButtons = document.querySelector(".js-counterButtons");
const statusCountingInfo = document.querySelector(".js-countingStatus");
const pomodorTimeInput = document.querySelector(".js-inputPomodoroTime");
const form = document.querySelector(".js-form");
const formButton = document.querySelector(".js-formButton");
const timeToBreakeInput = document.querySelector(".js-inputTimeToBrake");
const shortBrakeTimeInput = document.querySelector(".js-inputShortBrake");
const longBreakeTimeInput = document.querySelector(".js-inputLongBrake")

// let pomodoroTime = 3;


let settings = {
    pomodoroTime: +pomodorTimeInput.value,
    shortBrakeTime: +shortBrakeTimeInput.value,
    longBreakeTime: +longBreakeTimeInput.value,
    sessionsToLongBrake: +timeToBreakeInput.value,
}

let minutes = settings.pomodoroTime;
let shortBrakeTime = settings.shortBrakeTime;
let longBreakeTime = settings.longBreakeTime;
let sessionsToLongBrake = settings.sessionsToLongBrake
let seconds = 0;
let sessionCount = 0;

const updateSettings = () => {
    settings = {
        ...settings,
        pomodoroTime: +pomodorTimeInput.value,
        sessionsToLongBrake: +timeToBreakeInput.value,
    }
    minutes = settings.pomodoroTime;
    shortBrakeTime = settings.shortBrakeTime;
    longBreakeTime = settings.longBreakeTime;
    sessionsToLongBrake = settings.sessionsToLongBrake
    timerDisplay();
}


const settingsChange = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        updateSettings();
    })

}

const numberFormat = (number) => {
    return number < 10 ? "0" + number : number;
};

const statusDisplay = (countingStatus) => {
    statusCountingInfo.innerHTML = `<p class="status status${toggleStatus(countingStatus)}">${countingStatus}</p>`;
}

const statusColorChange = (countingStatus) => {
    if (countingStatus === "pomodoro") {
        pomodorTimer.classList.add("pomodoroTimer--pomodoro");
        pomodorTimer.classList.remove("pomodoroTimer--shortBrake");
        pomodorTimer.classList.remove("pomodoroTimer--longBrake");
    } else if (countingStatus === "short brake") {
        pomodorTimer.classList.add("pomodoroTimer--shortBrake");
        pomodorTimer.classList.remove("pomodoroTimer--pomodoro");
    } else if (countingStatus === "long brake"){
        pomodorTimer.classList.add("pomodoroTimer--longBrake");
        pomodorTimer.classList.remove("pomodoroTimer--pomodoro");
    }
}

const toggleStatus = (countingStatus) => {
    switch (countingStatus){
        case "pomodoro":
            return "--pomodoro";
        case "short brake":
            return "--shortBrake";
        case "long brake":
            return "--longBrake";
    };
};

const timerDisplay = () => {
    const timeCounter = document.querySelector(".js-timeCounter");
    timeCounter.innerHTML = `
        <p class="timeCounter">
            ${numberFormat(minutes)} : ${numberFormat(seconds)}
        </p>
        <p class="sessionCounter">
            Sessions: <span js-sessionCounter">${sessionCount} / ${settings.sessionsToLongBrake}</span>
        </p>`;
};

// const timerDisplay = (minutes, seconds, sessionCount) => {
//     const timeCounter = document.querySelector(".js-timeCounter");
//     timeCounter.innerHTML = `
//         <p class="timeCounter">
//             ${numberFormat(minutes)} : ${numberFormat(seconds)}
//         </p>
//         <p class="sessionCounter">
//             Sessions: <span js-sessionCounter">${sessionCount} / ${sessionsToLongBrake}</span>
//         </p>`;
// };

const timeCounting = (countingStatus) => {
    sessionCount++;
    const countingInterval = setInterval(() => {
        if(minutes === 0 && seconds === 0){
            clearInterval(countingInterval)
            minutes = sessionCount === settings.sessionsToLongBrake ? settings.longBreakeTime : settings.shortBrakeTime;
            countingStatus = sessionCount === settings.sessionsToLongBrake ? "long brake" : "short brake";
            breakeCounting(minutes, seconds, sessionCount, countingStatus);
        } else 
            if(seconds === 0){
                seconds = 9;
                minutes--;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds, sessionCount);
        statusDisplay(countingStatus);
        statusColorChange(countingStatus);
    }, 1000);
    stopCounting(countingInterval);
};

const breakeCounting = (countingStatus) => {
    const breakeInterval = setInterval(() => {
        if(minutes === 0 && seconds === 0){
            clearInterval(breakeInterval);
            minutes = settings.pomodoroTime;
            sessionCount = sessionCount === settings.sessionsToLongBrake ? 0 : sessionCount;
            countingStatus = "pomodoro";
            statusColorChange(countingStatus);
            timeCounting(minutes, seconds, sessionCount, countingStatus);
        } else 
            if(seconds === 0){
                minutes--;
                seconds = 9;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds, sessionCount);
        statusDisplay(countingStatus);
        
    }, 1000);
    stopCounting(breakeInterval);
};

const startCounting = (countingStatus) => {
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
        // startButton.removeAttribute("disabled");
        resetButton.removeAttribute("disabled");
    });
};

const resetCounter = (countingStatus) => {
    resetButton.addEventListener("click", () => {
        minutes = settings.pomodoroTime;
        seconds = 0;
        sessionCount = 0;
        timerDisplay(minutes, seconds, sessionCount);

        countingStatus = "pomodoro";
        statusDisplay(countingStatus);
        statusColorChange(countingStatus);
        startButton.removeAttribute("disabled");
        resetButton.setAttribute("disabled", "");
    });
};



const init = () => {
    settingsChange();
    
    // let {pomodoroTime: minutes} = settings;
    
    // let minutes = settings.pomodoroTime;
    

    

    let countingStatus = "pomodoro";
    statusDisplay(countingStatus);
    statusColorChange(countingStatus);
    
    timerDisplay();
    startCounting(minutes, seconds, sessionCount, countingStatus);
    resetCounter(minutes, seconds, sessionCount, countingStatus);
};

init();