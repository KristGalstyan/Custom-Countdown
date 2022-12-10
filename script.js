const inputContainer = document.querySelector('#input-container'),
      countForm = document.querySelector('#countdownForm'),
      dateEl = document.querySelector('#date-picker'),

      countdownEl = document.querySelector('#countdown'),
      countdownElTitle = document.querySelector('#countdown-title'),
      countdownBtn = document.querySelector('#countdown-button'),
      timeElements = document.querySelectorAll('span'),

      completeEl = document.querySelector('#complete'),
      completeElInfo = document.querySelector('#complete-info'),
      completeBtn = document.querySelector('#complete-button');

let countdownTitle = '';
let countdownDate = '';    
let countdownValue = Date;
let countdownActive;
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in profress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}


// Take values from Form Input
function updateCountdown(e) {
    e.preventDefault();    
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Get number version or current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function reset() {
    // Hide countdowns, show input form
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values, remove localStorage item
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
  }
  
  function restorePreviousCountdown() {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
      inputContainer.hidden = true; 
      savedCountdown = JSON.parse(localStorage.getItem('countdown'));
      countdownTitle = savedCountdown.title;
      countdownDate = savedCountdown.date;
      countdownValue = new Date(countdownDate).getTime();
      updateDOM();
    }
  }
  
  // Event Listener
  countForm.addEventListener('submit', updateCountdown);
  countdownBtn.addEventListener('click', reset);
  completeBtn.addEventListener('click', reset);
  
  // On Load, check localStorage
  restorePreviousCountdown();