let inactivityTimeout; // Variable to hold the timeout ID
let cursorVisible = false; // Flag to track cursor visibility

// Function to hide the cursor
function hideCursor() {
    document.body.style.cursor = 'none'; // Hide cursor
    cursorVisible = false; // Update the cursor visibility flag
}

// Function to show the cursor
function showCursor() {
    if (!cursorVisible) {
        document.body.style.cursor = 'auto'; // Show cursor
        cursorVisible = true; // Update the cursor visibility flag
    }
}

// Function to reset inactivity timer
function resetInactivityTimer() {
    clearTimeout(inactivityTimeout); // Clear the previous timeout

    // Set a new timeout to hide the cursor after 5 seconds of inactivity
    inactivityTimeout = setTimeout(hideCursor, 5000); // 5000 milliseconds = 5 seconds
}

// Event listeners for user activity
window.addEventListener('mousemove', () => {
    showCursor(); // Show cursor on mouse movement
    resetInactivityTimer(); // Reset the inactivity timer
});

window.addEventListener('keydown', () => {
    hideCursor(); // Hide cursor on key press
    resetInactivityTimer(); // Reset the inactivity timer
});

// Initial call to start the inactivity timer when the page loads
resetInactivityTimer();

// Timer logic
let timeLeft = 90; // Start time is 5 minutes (300 seconds)
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
        // Handle timer reaching zero, show 0815 or other logic
        document.body.innerHTML = '<p>0815</p>'; // This will fill the screen with 0815
    }
}, 1000);

// Function to check the input code
function checkCode() {
    const inputValue = codeInput.value;
    if (inputValue === "4 8 15 16 23 42") {
        timeLeft = 90; // Reset the timer back to 5 minutes
        codeInput.value = ""; // Clear the input
        showCursor(); // Show cursor after input
    }
}

// Event listener for pressing Enter key
codeInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkCode(); // Call the checkCode function when Enter is pressed
    }
});

// Automatically request fullscreen when the page loads
window.onload = () => {
    toggleFullScreen(); // Request fullscreen on load
};
