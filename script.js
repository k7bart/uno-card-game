import robotNames from "./robot-names";
import Deck from "./deck";
import { shuffle } from "./utils";

function setRandomRobotName() {
    const randomIndex = Math.floor(Math.random() * robotNames.length);
    computerName.innerText = robotNames[randomIndex].name;
}

function returnElementSymbol(element) {
    let symbol = element.innerText.split("\n")[0];

    if (symbol === "+2") symbol = "drawTwo";
    if (symbol === "+4") symbol = "wildDrawFour";

    return symbol;
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

createDeck();
shuffle(deck);
giveCards(7, computer);
giveCards(7, player);
startGame();

//кінець раунду і кінець гри
