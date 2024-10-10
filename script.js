let time = 300; // 5 minutes in seconds
let countdownInterval;
let warningAudio = new Audio('alert.mp3'); // Sound file for 1 minute warning

function startCountdown() {
    countdownInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;

    document.getElementById('timer').textContent = `${minutes}:${seconds}`;

    if (time === 60) {
        warningAudio.play(); // Play warning sound when 1 minute is left
    }

    if (time === 0) {
        clearInterval(countdownInterval);
        display0815(); // Display "0815" when time reaches zero
    } else {
        time--;
    }
}

function checkCode() {
    const input = document.getElementById('code-input').value.trim();
    const correctCode = "4 8 15 16 23 42";

    if (input === correctCode) {
        warningAudio.pause(); // Stop warning sound
        time = 300; // Reset to 5 minutes
        document.getElementById('timer').textContent = "05:00";
        document.getElementById('code-input').value = ''; // Clear input
    }
}

function display0815() {
    document.body.innerHTML = ''; // Clear body content

    let interval = setInterval(() => {
        let message = document.createElement('p');
        message.textContent = '0815';
        message.style.color = '#00FF00'; // Green text
        message.style.fontFamily = 'VT323, monospace'; // ROM-like font
        message.style.fontSize = '40px';
        message.style.margin = '0';
        document.body.appendChild(message);

        // Make it fill up the screen faster
        if (document.body.scrollHeight >= window.innerHeight * 2) {
            clearInterval(interval); // Stop when the screen is filled
        }
    }, 50); // Rapid interval for filling up the screen
}

startCountdown();
