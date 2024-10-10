// Timer logic
let timeLeft = 300; // Start time is 5 minutes (300 seconds)
const timerElement = document.getElementById("timer");
const codeInput = document.getElementById("code-input");

// Update timer display in format 00:00
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format the timer with leading zeroes
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        displayFailureMessage(); // Call the new function when timer expires
    }
}, 1000);

// Function to display failure message
function displayFailureMessage() {
    const failureMessages = document.createElement("div"); // Create a new div for messages
    failureMessages.id = "failureMessages"; // Assign an ID for styling
    document.body.appendChild(failureMessages); // Append the div to the body

    // Display "SYSTEM FAILURE" 50 times
    for (let i = 0; i < 50; i++) {
        const failureLine = document.createElement("div");
        failureLine.textContent = "SYSTEM FAILURE"; // Failure message
        failureMessages.appendChild(failureLine); // Append each line
    }

    // Display the lockbox code after the failure messages
    const lockboxLine = document.createElement("div");
    lockboxLine.textContent = "Dharma Initiative Lockbox Code: 0815"; // Lockbox code
    failureMessages.appendChild(lockboxLine); // Append the lockbox code
}

// Function to show the message
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
        timeLeft = 300; // Reset the timer back to 5 minutes
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
