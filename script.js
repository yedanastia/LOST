// Timer logic
let timeLeft = 300; // 300 seconds = 5 minutes
const timerElement = document.getElementById("timer");
const codeInput = document.getElementById("code-input");
let alarmPlayed = false; // Flag to track if alarm has played

// Alarm sound setup
const alarmSound = new Audio('alert.mp3'); // Ensure the alert.mp3 file is in the correct location

// Update timer display in format 00:00
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format the timer with leading zeroes
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Play alarm sound when 1 minute (60 seconds) is left and ensure it only plays once
    if (timeLeft === 60 && !alarmPlayed) {
        alarmSound.play();
        alarmPlayed = true; // Set the flag to true to avoid replaying
    }
}

setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        displayFailureMessage(); // Call the function when timer expires
    }
}, 1000);

// Function to display failure message with timed interval
function displayFailureMessage() {
    const failureMessages = document.getElementById("failureMessages");
    failureMessages.style.color = window.getComputedStyle(timerElement).color; // Use the same color for "SYSTEM FAILURE"
    failureMessages.style.fontFamily = "'VT323', monospace"; // Ensure the font is correct

    let count = 0; // Initialize count for repetitions
    const maxCount = 48; // Total number of repetitions for "SYSTEM FAILURE"
    let failureText = "";

    // Use setInterval to display "SYSTEM FAILURE" 48 times with a delay of 104 ms
    const interval = setInterval(() => {
        if (count < maxCount) {
            failureText += "SYSTEM FAILURE "; // Append text for each iteration
            failureMessages.textContent = failureText; // Update the text content
            count++;
        } else {
            // Once 48 repetitions are done, show the lockbox code
            failureMessages.textContent += "Dharma Initiative Lockbox Code: 0815";
            clearInterval(interval); // Stop the interval once the text is complete
        }
    }, 104); // Set 104 ms delay between each repetition
}

// Function to show the message when code is correct
function showMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Code accepted. Timer reset."; // Set the message text
    messageElement.style.display = "block"; // Show the message

    // Hide the message after 5 seconds
    setTimeout(() => {
        messageElement.style.display = "none"; // Hide the message
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Function to check the input code
function checkCode() {
    const inputValue = codeInput.value;
    if (inputValue === "4 8 15 16 23 42") {
        timeLeft = 300; // Reset the timer back to 300 seconds
        alarmPlayed = false; // Reset the alarm so it can play again
        codeInput.value = ""; // Clear the input
        showMessage(); // Show the message when the code is correct
    }
}

// Event listener for keypress
codeInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkCode(); // Check the code when Enter is pressed
    }
});

// Initialize timer display
updateTimer();

// Cursor hiding logic
let cursorTimeout;

function hideCursor() {
    document.body.style.cursor = 'none'; // Hide the cursor
}

function showCursor() {
    document.body.style.cursor = 'default'; // Show the cursor
}

// Event listener for mouse movement
document.addEventListener('mousemove', () => {
    showCursor(); // Show cursor on mouse move
    clearTimeout(cursorTimeout); // Clear the timeout if mouse is moving

    cursorTimeout = setTimeout(hideCursor, 1000); // Set timeout to hide cursor after 1 second of inactivity
});

// Start with the cursor hidden
hideCursor();
