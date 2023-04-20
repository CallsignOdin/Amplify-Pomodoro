let valueElement = document.getElementById("value");
let countdown; //used for timer interval - needs global scope
let logSectionList = document.getElementById("log-section-list");
let secondsEle = document.getElementById("clock-section-second-number");
let minutesEle = document.getElementById("clock-section-minute-number");
let hoursEle = document.getElementById("clock-section-hour-number");
let secondsTotalEle = document.getElementById("second-log-total");
let minutesTotalEle = document.getElementById("minute-log-total");
let hoursTotalEle = document.getElementById("hour-log-total");

function incrementPomCount(secs, mins, hrs) {
    valueElement = document.getElementById("value");
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
    valueElement = document.getElementById("value");
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
    valueElement = document.getElementById("clock-section-second-number");
    let currValue = parseInt(valueElement.innerHTML);

    currValue++;

    valueElement.innerHTML = currValue;
}

function secDecrement() {
    valueElement = document.getElementById("clock-section-second-number");
    let currValue = parseInt(valueElement.innerHTML);

    if(currValue > 0) {
        currValue--;
    }

    valueElement.innerHTML = currValue;
}

function setSecs(num) {
    valueElement = document.getElementById("clock-section-second-number");

    let newValue = num;

    valueElement.innerHTML = newValue;
}

function minIncrement() {
    valueElement = document.getElementById("clock-section-minute-number");
    let currValue = parseInt(valueElement.innerHTML);

    currValue++;

    valueElement.innerHTML = currValue;
}

function setMins(num) {
    valueElement = document.getElementById("clock-section-minute-number");

    let currValue = num;

    valueElement.innerHTML = currValue;
}

function minDecrement() {
    valueElement = document.getElementById("clock-section-minute-number");
    let currValue = parseInt(valueElement.innerHTML);

    if(currValue > 0) {
        currValue--;
    }
    

    valueElement.innerHTML = currValue;
}

function hourIncrement() {
    valueElement = document.getElementById("clock-section-hour-number");
    let currValue = parseInt(valueElement.innerHTML);

    currValue++;

    valueElement.innerHTML = currValue;
}

function hourDecrement() {
    valueElement = document.getElementById("clock-section-hour-number");
    let currValue = parseInt(valueElement.innerHTML);

    if(currValue > 0) {
        currValue--;
    }
    

    valueElement.innerHTML = currValue;
}



function startClock() {
    let secondsStart = 0;
    let minutesStart = 0;
    let hoursStart = 0;
    let seconds = parseInt(secondsEle.innerHTML);
    let minutes = parseInt(minutesEle.innerHTML);
    let hours = parseInt(hoursEle.innerHTML);

    secondsStart = parseInt(secondsEle.innerHTML);
    minutesStart = parseInt(minutesEle.innerHTML);
    hoursStart = parseInt(hoursEle.innerHTML);
    
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

    incrementTotalTime(secs, mins, hrs);
    listItem.innerHTML = `Pomodoro session logged on ${date.getHours()}:${date.getMinutes()} ${date.getMonth()}-${date.getDay()}-${date.getFullYear()} Time Logged: ${hrs}Hrs ${mins}mins ${secs}secs`;

    logSectionList.appendChild(listItem);
}

function incrementTotalTime(secs, mins, hrs) {
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
    minutesEle.innerHTML = "25";
}

function setBreakClock() {
    minutesEle.innerHTML = "5";
}

function stopClock() {
    if(countdown !==  null) {
        clearInterval(countdown);
        countdown = null;
    }
}