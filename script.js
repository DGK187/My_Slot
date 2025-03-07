const symbols = ["🎣", "🐟", "💰", "🦞", "🌊", "🎣", "🐠", "🐡"];
const reelsCount = 5;
const rowsCount = 3;
const slotContainer = document.getElementById("slot-container");
const spinButton = document.getElementById("spin-btn");
const winMessage = document.getElementById("win-message");

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
    } else if (uniqueSymbols.size <= 3) {
        winMessage.textContent = "You Win! 🎰";
    } else {
        winMessage.textContent = "Try Again!";
    }
}

spinButton.addEventListener("click", spinReels);
generateReels();