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
        this.isOver = true;

        // opacity.style.display = "block";

        if (winner === state.player)
            console.log(
                `Congratulations ${state.player.name} on your victory in the UNO game! 🎉🥳 Your ability to outmaneuver your opponents and play those wild cards at just the right moment is truly impressive. Enjoy your well-deserved victory and bask in the glory of being the reigning UNO champion! Keep up the great work and continue spreading joy through friendly competition. Bravo! 👏`
            );

        if (winner === state.computer)
            console.log(
                `This time won ${winner.name}! ${state.player.name}, even though you didn't emerge as the victor in the UNO game, don't let that dampen your spirits! 🌟 Remember that the true joy lies in the thrill of the game itself, the laughter shared, and the memories created. Losing is just a part of the journey towards improvement and growth.  So, keep your head held high, embrace the lessons learned, and get ready for the next UNO adventure. You're a true champion in your own right! 💪🌟`
            );
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
                <div id="player-score">00</div>
            </div>
            <div id="computer-score-container">
                <div id="computer-name">${state.computer.name}</div>
                <div id="computer-score">00</div>
            </div>
        </div>

        <div style="display: flex">
            <div id="computer-cards"></div>
        </div>

        <div id="table">
            <div id="deck" class="card back">
                <div class="gradient-text logo">UNO</div>
            </div>
            <div id="main-card-container"></div>
        </div>

        <div style="display: flex">
            <div id="player-cards"></div>
        </div>`;
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

function renderColorPicker() {
    return `    <div id="colors-menu">
    <button class="color red"></button>
    <button class="color yellow"></button>
    <button class="color green"></button>
    <button class="color blue"></button>
</div>`;
}
