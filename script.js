import robotNames from "./robot-names.js";
import { Player, Computer } from "./player.js";
import { deck } from "./deck.js";

function setRandomRobotName() {
    const randomIndex = Math.floor(Math.random() * robotNames.length);
    computerName.innerText = robotNames[randomIndex].name;
}

function removeCardFromPlayerCards(cardToRemove) {
    const foundCardIndex = player.cards.findIndex(
        (card) =>
            card.color === cardToRemove.color &&
            card.symbol === cardToRemove.symbol
    );

    let removedCard = player.cards.splice(foundCardIndex, 1)[0];

    if (player.cards.length === 0) congratulateWinner(player);

    return removedCard;
}

// function isTheLastCard() {
//     if (player.cards.length > 1) {
//         unoButtons.style.display = "none";
//         return;
//     }

//     unoButtons.style.display = "flex";
// }

const mainCardContainer = document.getElementById("main-card-container");

let mainCard = deck.items.shift();
let player = new Player();
let computer = new Computer();

player.draw(7);
computer.draw(7);

mainCardContainer.innerHTML += mainCard.renderFace();
player.renderCards();
computer.renderCards();
