const paylines = [
    [0, 1, 2, 3, 4], // Straight line win
    [5, 6, 7, 8, 9], // Middle row win
    [10, 11, 12, 13, 14], // Bottom row win
    [0, 6, 12, 8, 4], // Diagonal top-left to bottom-right
    [10, 6, 2, 8, 14] // Diagonal bottom-left to top-right
];

function checkPaylineWin(reels) {
    for (let line of paylines) {
        const symbols = line.map(index => reels[index]);
        const uniqueSymbols = new Set(symbols);
        
        if (uniqueSymbols.size === 1) {
            return {
                win: true,
                message: "BIG WIN! 🎉",
                symbol: symbols[0]
            };
        }
    }
    return { win: false, message: "No win, try again!" };
}

function checkWinCondition() {
    const reels = document.querySelectorAll(".reel");
    const results = Array.from(reels).map(reel => reel.textContent);
    
    const winResult = checkPaylineWin(results);
    winMessage.textContent = winResult.message;
    
    if (winResult.win) {
        if (winResult.symbol === "💰") {
            playJackpotSound();
        } else {
            playWinSound();
        }
    }
}
