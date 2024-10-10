// script.js
let countdown;
let timeLeft = 300;  // 5 minutes = 300 seconds
let audioPlayed = false;
const correctCode = '4,8,15,16,23,42'; // Correct sequence of numbers

const timerElement = document.getElementById('timer');
const audioElement = document.getElementById('alertAudio');

function startCountdown() {
  countdown = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 60 && !audioPlayed) {
      playAudio();
    }

    if (timeLeft <= 0) {
      clearInterval(countdown);
      showRepeatedMessage();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAudio() {
  audioElement.play();
  audioPlayed = true;
}

function stopAudio() {
  audioElement.pause();
  audioElement.currentTime = 0;  // Reset audio to the start
}

function checkCode() {
  const userInput = document.getElementById('codeInput').value;
  if (userInput === correctCode) {
    resetCountdown();
  }
}

function resetCountdown() {
  clearInterval(countdown);
  timeLeft = 300;
  updateTimer();
  stopAudio();
  audioPlayed = false;
  startCountdown();
}

function showRepeatedMessage() {
  document.body.innerHTML = '<div id="repeatedMessage">0815</div>';
  document.getElementById('repeatedMessage').style.fontSize = '5em';
  document.getElementById('repeatedMessage').style.color = 'red';

  setInterval(() => {
    document.getElementById('repeatedMessage').textContent += ' 0815';
  }, 1000);
}

// Start the countdown when the page loads
window.onload = startCountdown;
