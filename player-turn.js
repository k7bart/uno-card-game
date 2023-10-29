import Card from "./card.js";
import state, { updateMainCard } from "./state.js";

export default function handlePlayerTurn() {
    document.getElementById("deck").addEventListener("click", () => {
        state.player.draw(1);
        state.player.renderCards();
    });

    document.getElementById("container").addEventListener("click", (event) => {
        const clickedCardElement = event.target.closest("#player-cards .card");

        if (!clickedCardElement) return;
        if (clickedCardElement) handlePlayingCard(clickedCardElement);
    });
}

//TODO: поділити на функції, виправити логіку
function handlePlayingCard(clickedCardElement) {
    const clickedCard = {
        color: returnElementColor(clickedCardElement),
        symbol: returnElementSymbol(clickedCardElement),
    };

    Object.setPrototypeOf(clickedCard, Card.prototype);

    const wrong =
        !(clickedCard.color === state.mainCard.color) &&
        !(clickedCard.symbol === state.mainCard.symbol);

    const skip =
        (clickedCard.color === state.mainCard.color &&
            clickedCard.symbol === "skip") ||
        (clickedCard.symbol === "skip" && state.mainCard.symbol === "skip");

    const drawTwo =
        (clickedCard.color === state.mainCard.color &&
            clickedCard.symbol === "drawTwo") ||
        (clickedCard.symbol === "drawTwo" &&
            state.mainCard.symbol === "drawTwo");

    if (wrong) {
        clickedCardElement.classList.add("shake");
        setTimeout(() => clickedCardElement.classList.remove("shake"), 500);
        return;
    }

    if (skip || drawTwo) {
        updateCards(clickedCard);
        if (drawTwo) giveCards(2, computer);
        return;
    }

    if (
        clickedCard.color === state.mainCard.color ||
        clickedCard.symbol === state.mainCard.symbol
    ) {
        updateCards(clickedCard);
        setTimeout(() => state.computer.goTurn(), 1000);
        return;
    }

    if (clickedCard.color === "black") {
        updateCards(clickedCard);

        if (clickedCard.symbol === "wildDrawFour") {
            giveCards(4, state.computer);
            state.computer.renderCards();
        }
        opacity.style.display = "block";
        colorsMenu.style.display = "flex";

        return;
    }
}

function updateCards(card) {
    state.player.removeCard(card);
    state.player.renderCards();
    updateMainCard(card);
}

function returnElementColor(element) {
    return element.classList.value.replace("card ", "");
}
function returnElementSymbol(element) {
    return element.innerText.split("\n")[0].trim();
}

// // якщо вибрано наступний колір
// const clickedColorElement = event.target.closest(".color");

// if (clickedColorElement) {
//     const clickedColorElementColor =
//         clickedColorElement.classList.value.replace("color ", ""); // визначили обраний колір

//     discard.push(mainCard); // поклали основну карту у відбій

//     mainCard = { color: clickedColorElementColor, symbol: "" }; // призначили основну карту із визначеним кольором

//     mainCardContainer.innerHTML = renderCard(
//         //перемалювали основну карту
//         clickedColorElementColor,
//         "wild"
//     );

//     opacity.style.display = "none";
//     colorsMenu.style.display = "none";

//     setTimeout(() => {
//         computerGoTurn(computer);
//     }, 1000);

//     return;
// }
