const symbols = ["🎣", "🐟", "💰", "🦞", "🌊", "🎣", "🐠", "🐡"];
const reelsCount = 5;
const rowsCount = 3;
const slotContainer = document.getElementById("slot-container");
const spinButton = document.getElementById("spin-btn");
const winMessage = document.getElementById("win-message");

// Sound effects
const spinSound = new Audio("sounds/spin.mp3");
const winSound = new Audio("sounds/win.mp3");
const jackpotSound = new Audio("sounds/jackpot.mp3");

function playSpinSound() {
    spinSound.currentTime = 0;
    spinSound.play();
}

function playWinSound() {
    winSound.currentTime = 0;
    winSound.play();
}

function playJackpotSound() {
    jackpotSound.currentTime = 0;
    jackpotSound.play();
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateReels() {
    slotContainer.innerHTML = "";
    for (let i = 0; i < reelsCount; i++) {
        const reel = document.createElement("div");
        reel.classList.add("reel");
        reel.textContent = getRandomSymbol();
        slotContainer.appendChild(reel);
    }
}

function spinReels() {
    spinButton.disabled = true;
    winMessage.textContent = "";
    playSpinSound(); // Play spin sound on button click

    let spins = 10;
    let interval = setInterval(() => {
        generateReels();
        spins--;
        if (spins <= 0) {
            clearInterval(interval);
            checkWinCondition();
            spinButton.disabled = false;
        }
    }, 150);
}

function checkWinCondition() {
    const reels = document.querySelectorAll(".reel");
    const results = Array.from(reels).map(reel => reel.textContent);
    
    const uniqueSymbols = new Set(results);
    
    if (uniqueSymbols.size === 1) {
        winMessage.textContent = "JACKPOT! 🎉";
        playJackpotSound(); // Play jackpot sound
    } else if (uniqueSymbols.size <= 3) {
        winMessage.textContent = "You Win! 🎰";
        playWinSound(); // Play win sound
    } else {
        winMessage.textContent = "Try Again!";
    }
}

spinButton.addEventListener("click", spinReels);
generateReels();
