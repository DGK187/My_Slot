import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const symbols = ["🎣", "🐟", "💰", "🦞", "🌊", "🎣", "🐠", "🐡"];
const reelsCount = 5;
const rowsCount = 3;

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

export default function SlotMachine() {
    const [reels, setReels] = useState(
        Array.from({ length: reelsCount }, () =>
            Array.from({ length: rowsCount }, getRandomSymbol)
        )
    );
    const [spinning, setSpinning] = useState(false);
    const [bonusActive, setBonusActive] = useState(false);

    const spinReels = () => {
        setSpinning(true);
        const newReels = Array.from({ length: reelsCount }, () =>
            Array.from({ length: rowsCount }, getRandomSymbol)
        );
        setTimeout(() => {
            setReels(newReels);
            setSpinning(false);
            checkBonus(newReels);
        }, 1000);
    };

    const checkBonus = (reels) => {
        // Check if the first row contains three 💰 symbols
        const firstRow = reels.map((reel) => reel[0]);
        const isBonusTriggered = firstRow.every((symbol) => symbol === "💰");

        if (isBonusTriggered) {
            setBonusActive(true);
        }
    };

    const claimBonus = () => {
        setBonusActive(false);
        alert("Bonus Round! You win 10 extra spins!");
        // You can enhance this further to award spins or special rewards
    };

    return (
        <div className="slot-machine">
            <div className="reels">
                {reels.map((reel, reelIndex) => (
                    <div key={reelIndex} className="reel">
                        {reel.map((symbol, symbolIndex) => (
                            <Card key={symbolIndex} className="symbol">
                                <CardContent>
                                    <motion.div
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {symbol}
                                    </motion.div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
            <Button onClick={spinReels} disabled={spinning}>
                {spinning ? "Spinning..." : "Spin"}
            </Button>
            {bonusActive && (
                <div className="bonus-round">
                    <h2>Bonus Round Triggered! 🎉</h2>
                    <Button onClick={claimBonus}>Claim Your Bonus</Button>
                </div>
            )}
        </div>
    );
}
