const valueElement = document.getElementById("value");
const logSectionList = document.getElementById("log-section-list");
const secondsEle = document.getElementById("clock-section-second-number");
const minutesEle = document.getElementById("clock-section-minute-number");
const hoursEle = document.getElementById("clock-section-hour-number");
const secondsTotalEle = document.getElementById("second-log-total");
const minutesTotalEle = document.getElementById("minute-log-total");
const hoursTotalEle = document.getElementById("hour-log-total");
let countdown; //used for timer interval - needs global scope

function incrementPomCount(secs, mins, hrs) {
    let seconds = parseInt(secondsEle.innerHTML);
    let minutes = parseInt(minutesEle.innerHTML);
    let hours = parseInt(hoursEle.innerHTML);

        let currValue = parseInt(valueElement.innerHTML);
        currValue++;

        valueElement.innerHTML = currValue;
    
        if(secs == undefined || mins == undefined || hrs == undefined) {
            createPomoLog(0, 0 ,0);
        }
        else {
            createPomoLog(secs, mins, hrs);
        }
}

function decrementPomCount() {
    let currValue = parseInt(valueElement.innerHTML);
    let logItem;
    let logContainer;

    if(currValue > 0) {
        let removedItem;
        
        currValue--;
        
        logContainer = [...logSectionList.children];

        removedItem = logContainer.pop();

        logSectionList.removeChild(removedItem);
    }
    valueElement.innerHTML = currValue;
}

function secIncrement() {
    let currValue = parseInt(secondsEle.innerHTML);

    currValue++;

    secondsEle.innerHTML = currValue;
}

function secDecrement() {
    let currValue = parseInt(secondsEle.innerHTML);

    if(currValue > 0) {
        currValue--;
    }

    secondsEle.innerHTML = currValue;
}

function setSecs(num) {
    let newValue = num;

    secondsEle.innerHTML = newValue;
}

function minIncrement() {
    let currValue = parseInt(minutesEle.innerHTML);

    currValue++;

    minutesEle.innerHTML = currValue;
}

function setMins(num) {
    let currValue = num;

    minutesEle.innerHTML = currValue;
}

function minDecrement() {
    let currValue = parseInt(minutesEle.innerHTML);

    if(currValue > 0) {
        currValue--;
    }

    minutesEle.innerHTML = currValue;
}

function setHours(num) {
    let currValue = num;

    hoursEle.innerHTML = num;
}

function hourIncrement() {
    let currValue = parseInt(hoursEle.innerHTML);

    currValue++;

    hoursEle.innerHTML = currValue;
}

function hourDecrement() {
    let currValue = parseInt(hoursEle.innerHTML);

    if(currValue > 0) {
        currValue--;
    }
    
    hoursEle.innerHTML = currValue;
}



function startClock() {
    const secondsStart = (parseInt(secondsEle.innerHTML) !== undefined) ? parseInt(secondsEle.innerHTML) : 0;
    const minutesStart = (parseInt(minutesEle.innerHTML) !== undefined) ? parseInt(minutesEle.innerHTML) : 0;
    const hoursStart = (parseInt(hoursEle.innerHTML) !== undefined) ? parseInt(hoursEle.innerHTML) : 0;
    let seconds = parseInt(secondsEle.innerHTML);
    let minutes = parseInt(minutesEle.innerHTML);
    let hours = parseInt(hoursEle.innerHTML);

    
    if(countdown !== null) {
        clearInterval(countdown);
    }
    if(seconds + minutes + hours <= 0) {
        alert("Error, the clock cannot start at 0 time.");
    }
    else {
        countdown = setInterval(function() {
            seconds = parseInt(secondsEle.innerHTML);
            minutes = parseInt(minutesEle.innerHTML);
            hours = parseInt(hoursEle.innerHTML);
    
            if(seconds > 0) {
                secDecrement();
            }
            else if(seconds <= 1) {
                if(minutes > 0) {
                    minDecrement();
                    setSecs(59);    
                }
                else if(hours > 0) {
                    hourDecrement();
                    setMins(59);
                    setSecs(59);
                }
            }
            if(seconds == 0 && minutes == 0 && hours == 0) {
                incrementPomCount(secondsStart, minutesStart, hoursStart);
                clearInterval(countdown);
            }
        }, 1000);
    }


    
}

function createPomoLog(secs, mins, hrs) {
    const date = new Date();
    let listItem = document.createElement("li");
    let secsTotal = parseInt(secondsTotalEle.innerHTML) + secs;
    let minsTotal = parseInt(minutesTotalEle.innerHTML) + mins;
    let hrsTotal = parseInt(hoursTotalEle.innerHTML) + hrs;

    increaseTotalTime(secs, mins, hrs);
    listItem.innerHTML = `Pomodoro session logged on ${date.getHours()}:${date.getMinutes()} ${date.getMonth()}-${date.getDay()}-${date.getFullYear()} Time Logged: ${hrs}Hrs ${mins}mins ${secs}secs`;

    logSectionList.appendChild(listItem);
}

function increaseTotalTime(secs, mins, hrs) {
    let secsTotal = parseInt(secondsTotalEle.innerHTML) + secs;
    let minsTotal = parseInt(minutesTotalEle.innerHTML) + mins;
    let hrsTotal = parseInt(hoursTotalEle.innerHTML) + hrs;

  if(secsTotal >= 60 || minsTotal >= 60) {
    while(secsTotal >= 60 || minsTotal >= 60) {
        if(secsTotal >= 60) {
            minsTotal++;
            secsTotal -= 60;    
        }
        if(minsTotal >= 60) {
            hrsTotal++;
            minsTotal -= 60;
        }
        //will let hours run beyond 24

        if(secsTotal < 60 && minsTotal < 60) {
            secondsTotalEle.innerHTML = secsTotal;
            minutesTotalEle.innerHTML = minsTotal;
            hoursTotalEle.innerHTML = hrsTotal;
        }
    }
  }
  else {
    secondsTotalEle.innerHTML = secsTotal;
    minutesTotalEle.innerHTML = minsTotal;
    hoursTotalEle.innerHTML = hrsTotal;
  }
}

function setPomoClock() {
    setSecs(0);
    setMins(25);
    setHours(0);
}

function setBreakClock() {
    minutesEle.innerHTML = "5";
}

function resetClock() {
    setSecs(0);
    setMins(0);
    setHours(0);

    stopClock();
}

function stopClock() {
    if(countdown !==  null) {
        clearInterval(countdown);
        countdown = null;
    }
}