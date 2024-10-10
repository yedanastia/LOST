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
        // Handle timer reaching zero, show 0815 or other logic
        document.body.innerHTML = '<p>0815</p>'; // This will fill the screen with 0815
    }
}, 1000);

// Function to check the input code
function checkCode() {
    const inputValue = codeInput.value;
    if (inputValue === "4 8 15 16 23 42") {
        timeLeft = 300; // Reset the timer back to 5 minutes
        codeInput.value = ""; // Clear the input
    }
}

// Event listener for pressing Enter key
codeInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkCode(); // Call the checkCode function when Enter is pressed
    }
});
