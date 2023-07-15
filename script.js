const startButton = document.querySelector(".js-startButton");
const stopButton = document.querySelector(".js-stopButton");
const resetButton = document.querySelector(".js-resetButton");
const sessionCounter = document.querySelector(".js-sessionCounter")
const timeCounter = document.querySelector(".js-timeCounter");

const numberFormat = (number) => {
    return number < 10 ? "0" + number : number;
}

const timerDisplay = (minutes, seconds) => {
    timeCounter.innerText = `${numberFormat(minutes)} : ${numberFormat(seconds)}`;
}

const timeCounting = (minutes, seconds, sessionCount) => {
    const countingInterval = setInterval(() => {
        
        if(minutes === 0 && seconds === 0){
            clearInterval(countingInterval)
            sessionCount++;
            sessionCounter.innerText = sessionCount;
            minutes = 2;
            seconds = 0;
            breakeCounting(minutes, seconds);

        } else 
            if(seconds === 0){
                seconds = 59;
                minutes--;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds);
    }, 1000);
    stopCounting(countingInterval);
};

const breakeCounting = (minutes, seconds) => {
    const breakeInterval = setInterval(() => {
        
        if(minutes === 0 && seconds === 0){
            clearInterval(breakeInterval);
            minutes = 5;
            seconds = 0;
            timeCounting(minutes, seconds);
        } else 
            if(seconds === 0){
                seconds = 59;
                minutes--;
            } else {
                seconds--;
            }
        timerDisplay(minutes, seconds);
    }, 1000)
    stopCounting(breakeInterval);
};

const startCounting = (minutes, seconds, sessionCount) => {
    startButton.addEventListener("click", () => {
        timeCounting(minutes, seconds, sessionCount);
    });
};


const stopCounting = (countingInterval, breakeInterval) => {
    stopButton.addEventListener("click", () => {
        clearInterval(countingInterval);
        clearInterval(breakeInterval);
    });
};

const init = () => {
    let minutes = 5;
    let seconds = 0;
    timerDisplay(minutes, seconds);

    let sessionCount = 0;
    sessionCounter.innerText = sessionCount;
    startCounting(minutes, seconds, sessionCount);

}

init();