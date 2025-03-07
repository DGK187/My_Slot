import { playSpinSound } from "./sounds.js";

const tutorialScreen = document.getElementById("tutorial-screen");
const closeTutorialButton = document.getElementById("close-tutorial");
const tutorialOpenSound = new Audio("sounds/tutorial-open.mp3");
const tutorialCloseSound = new Audio("sounds/tutorial-close.mp3");

function openTutorial() {
    tutorialScreen.style.opacity = "1";
    tutorialScreen.style.display = "flex";
    tutorialOpenSound.play();
}

function closeTutorial() {
    tutorialScreen.style.opacity = "0";
    tutorialCloseSound.play();
    setTimeout(() => {
        tutorialScreen.style.display = "none";
    }, 500);
}

closeTutorialButton.addEventListener("click", closeTutorial);

// Automatically play tutorial open sound when the page loads
window.onload = () => {
    tutorialScreen.style.display = "flex";
    setTimeout(() => {
        tutorialScreen.style.opacity = "1";
        tutorialOpenSound.play();
    }, 200);
};
