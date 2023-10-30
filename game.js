import Deck from "./deck.js";
import state from "./state.js";
import Computer, { getRandomRobotName } from "./computer.js";
import Player from "./player.js";

export default class Game {
    onStart() {
        state.computer = new Computer(getRandomRobotName());
        renderGreet();
        const container = document.getElementById("greeting-container");
        container.addEventListener("click", (e) => {
            if (e.target !== container.querySelector("button")) return;
            state.player = new Player(container.querySelector("input").value);
            container.remove();
            state.game.start();
        });
    }

    start() {
        renderBoard();
        state.deck = new Deck();
        state.deck.shuffle();

        state.mainCard = state.deck.items.shift();
        document.getElementById("main-card-container").innerHTML +=
            state.mainCard.renderFace();

        state.player.draw(7);
        state.computer.draw(7);

        state.player.renderCards();
        state.computer.renderCards();

        state.player.goTurn();
    }

    onEnd(winner) {
        const playerWon = `Congratulations <b class="gradient-text">${state.player.name}</b> on your victory in the UNO game! 🎉🥳 Your ability to outmaneuver your opponents and play those wild cards at just the right moment is truly impressive. Enjoy your well-deserved victory and bask in the glory of being the reigning UNO champion! Keep up the great work and continue spreading joy through friendly competition. Bravo!👏`;
        const playerLost = `This time won <b class="gradient-text">${winner.name}</b>! <b class="gradient-text">${state.player.name}</b>, even though you didn't emerge as the victor in the UNO game, don't let that dampen your spirits! 🌟 Losing is just a part of the journey towards improvement and growth. So, keep your head held high, embrace the lessons learned, and get ready for the next UNO adventure. You're a true champion in your own right!💪🌟`;

        const announcement = document.createElement("div");
        announcement.id = "announcement";
        announcement.className = "black";
        announcement.innerHTML = `
            <p class="announcement-text">
                ${winner === state.player ? playerWon : playerLost} 
            </p>
            <button id="another-round-button">
                <p class="gradient-text">Another round!</p>
            </button>
        `;

        opacity.style.display = "block";
        document.getElementById("container").appendChild(announcement);

        winner.score += getRoundScore(winner);
        updateScoreboard(winner);

        document
            .getElementById("another-round-button")
            .addEventListener("click", () => {
                announcement.remove();
                opacity.style.display = "none";

                state.computer.cards = [];
                state.player.cards = [];

                this.start();
            });
    }
}

function renderGreet() {
    document.getElementById("container").innerHTML = `
    <div id="greeting-container" class="black">
            <p>
                Welcome! Prepare to immerse yourself in a world of thrilling
                card matches and strategic <b class="gradient-text">UNO</b>
                gameplay. Whether you're a seasoned Uno pro or a newcomer to
                the game, we have everything you need to have a fantastic
                time. Your opponent for this time is
                <b class="gradient-text">${state.computer.name}</b>.
            </p>
            <p>Would you kindly provide your name?</p>
            <div id="input-container">
                <input type="text" maxlength="20" />
                <button class="confirm-button green">
                    <div id="button-logo"></div>
                </button>
            </div>
        </div>
    `;
}

function renderBoard() {
    document.getElementById("container").innerHTML = `
        <div id="score">
            <div id="player-score-container">
                <div id="player-name">${state.player.name}</div>
                <div id="player-score">${state.player.score}</div>
            </div>
            <div id="computer-score-container">
                <div id="computer-name">${state.computer.name}</div>
                <div id="computer-score">${state.computer.score}</div>
            </div>
        </div>

        <div id="computer-cards"></div>

        <div id="table">
            <div id="deck" class="card back">
                <div class="gradient-text logo">UNO</div>
            </div>
            <div id="main-card-container"></div>
        </div>

        <div id="player-cards"></div>
        `;
}

function renderUnoButton() {
    return `    
    <div id="uno-buttons-container">
    <button class="uno-button">
        <p class="gradient-text">! UNO !</p>
    </button>
    <button class="uno-button">
        <p class="gradient-text">! UNO !</p>
    </button>
</div>`;
}

export function renderColorPicker() {
    const colorsMenu = document.createElement("div");
    colorsMenu.id = "colors-menu";
    colorsMenu.innerHTML = `
    <div id="colors-menu">
        <button class="color red"></button>
        <button class="color yellow"></button>
        <button class="color green"></button>
        <button class="color blue"></button>
    </div>`;

    document.getElementById("container").appendChild(colorsMenu);
}

function updateScoreboard(winner) {
    const scoreElement =
        winner === state.player
            ? document.getElementById("player-score")
            : document.getElementById("computer-score");

    scoreElement.innerText = winner.score;
}

function getRoundScore(winner) {
    let loser;
    winner === state.player ? (loser = state.computer) : (loser = state.player);

    const score = loser.cards.reduce((totalScore, card) => {
        if (card.symbol === "+4" || card.symbol === "wild") {
            return totalScore + 50;
        }
        if (
            card.symbol === "skip" ||
            card.symbol === "reverse" ||
            card.symbol === "+2"
        ) {
            return totalScore + 20;
        }
        return totalScore + Number(card.symbol);
    }, 0);

    return score;
}
