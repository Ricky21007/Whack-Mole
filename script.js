const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// Function to generate a random time for how long the mole will stay up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Function to select a random hole, ensuring no two moles pop up from the same hole consecutively
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // Prevent the same hole from being selected consecutively
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Function to make the mole pop up and down randomly
function peep() {
    const time = randomTime(500, 1000); // Random time for mole to pop up
    const hole = randomHole(holes); // Get a random hole
    hole.classList.add('up'); // Mole pops up by adding the 'up' class
    setTimeout(() => {
        hole.classList.remove('up'); // Mole pops down after the random time
        if (!timeUp) {
            peep(); // Continue popping up moles if the game is not over
        }
    }, time);
}

// Start the game
function startGame() {
    scoreBoard.textContent = 0; // Reset the score
    timeUp = false; // Game is not over
    score = 0; // Reset the score variable
    peep(); // Start the peep function to pop up moles
    setTimeout(() => timeUp = true, 15000); // Stop the game after 15 seconds
}

// Function to handle whacking a mole
function wack(e) {
    if (!e.isTrusted) return; // Prevent fake clicks from affecting the game
    score++; // Increment the score
    this.parentNode.classList.remove('up'); // Mole is whacked and goes down
    scoreBoard.textContent = score; // Update the score display
}

// Add event listeners to all moles to detect whacks
moles.forEach(mole => mole.addEventListener('click', wack));