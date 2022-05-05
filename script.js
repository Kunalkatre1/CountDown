const inputCountDownTimer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeInfo = document.getElementById('complete-info');
const completeElement = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate='';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input Min with today's date
const today = new Date().toISOString().split('T')[0];
console.log(today);
dateEl.setAttribute('min', today);

//Update Countdown 
function updateDOM(){
   
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        console.log('distance:', distance);
    
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);
    
        //Hide Input
        inputCountDownTimer.hidden=true;
    
        //If the countdown has ended , show complete
        if (distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeElement.hidden = false;
        }
        else{
            //Else show countdown is in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;   
            completeElement.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);

}

//Reset all values
function reset(){
    //Hide Countdowns & show input form
    countdownEl.hidden = true;
    completeElement.hidden=true;
    inputCountDownTimer.hidden = false;

    //Stop the countdown
    clearInterval(countdownActive);

    //Reset values
    countdownElTitle = '';
    countdownDate = '';
}

//Input Values from Form
function updateCountDown(e){

    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    
    //Check if input values are valid 
    if (countdownDate === ''){
        alert('Please enter valid values');
    }
    else{
         //Get number version of Date , update DOM
        countdownValue = new Date(countdownDate).getTime();
        console.log('Countdown Value:', countdownValue);
        updateDOM();
    }

}

//Event Listener
countdownForm.addEventListener('submit', updateCountDown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);