import Card from "./card.js";
import state, { updateMainCard } from "./state.js";
import { renderColorPicker } from "./game.js";

export default function handlePlayerTurn() {
    document.getElementById("deck").addEventListener("click", () => {
        if (state.currentPlayer === state.computer) return;
        state.player.draw(1);
        state.player.renderCards();
    });

    document.getElementById("container").addEventListener("click", (e) => {
        if (state.currentPlayer === state.computer) return;

        const clickedCard = e.target.closest("#player-cards .card");

        if (!clickedCard) return;
        if (clickedCard) handlePlayingCard(clickedCard);
    });
}

//TODO: поділити на функції, виправити логіку
function handlePlayingCard(clickedCard) {
    // const state.player.hasNoCards = state.player.cards.length === 0 ? true : false;
    // const state.player.hasOneCard = state.player.cards.length === 1 ? true : false;

    const card = {
        color: returnColor(clickedCard),
        symbol: returnSymbol(clickedCard),
    };

    Object.setPrototypeOf(card, Card.prototype);

    const wrong =
        card.color !== state.mainCard.color &&
        card.symbol !== state.mainCard.symbol;

    const skip =
        (card.color === state.mainCard.color && card.symbol === "skip") ||
        (card.symbol === "skip" && state.mainCard.symbol === "skip");

    const drawTwo =
        (card.color === state.mainCard.color && card.symbol === "+2") ||
        (card.symbol === "+2" && state.mainCard.symbol === "+2");

    if (skip || drawTwo) {
        updateCards(card);

        if (state.player.hasOneCard) {
            console.log("UNO!"); // TODO: придумати щось інше
        }

        if (drawTwo) {
            state.computer.draw(2);
            state.computer.renderCards();
        }

        if (state.player.hasNoCards) {
            state.game.onEnd(state.player);
            return;
        }

        return;
    }

    if (card.color === "black") {
        updateCards(card);

        if (state.player.hasOneCard) {
            console.log("UNO!"); // TODO: придумати щось інше
        }

        if (card.symbol === "+4") {
            state.computer.draw(4);
            state.computer.renderCards();
        }

        if (state.player.hasNoCards) {
            state.game.onEnd(state.player);
            return;
        }

        opacity.style.display = "block";

        renderColorPicker();

        document
            .getElementById("colors-menu")
            .addEventListener("click", (e) => handleColorPicking(e, card));

        return;
    }

    if (
        card.color === state.mainCard.color ||
        card.symbol === state.mainCard.symbol
    ) {
        updateCards(card);

        if (state.player.hasOneCard) {
            console.log("UNO!"); // TODO: придумати щось інше
        }

        if (state.player.hasNoCards) {
            state.game.onEnd(state.player);
            return;
        }
        setTimeout(() => state.computer.goTurn(), 1000);
        return;
    }

    if (wrong) {
        clickedCard.classList.add("shake");
        setTimeout(() => clickedCard.classList.remove("shake"), 500);
        return;
    }
}

function updateCards(card) {
    state.player.removeCard(card);
    state.player.renderCards();
    updateMainCard(card);
}
function returnColor(element) {
    return element.classList.value.replace("card ", "");
}
function returnSymbol(element) {
    return element.innerText.split("\n")[0].trim();
}
function handleColorPicking(e, card) {
    const clickedColor = e.target.closest(".color");

    if (!clickedColor) return;

    const color = clickedColor.classList.value.replace("color ", "");

    state.mainCard.color = color;

    updateMainCard(state.mainCard);

    opacity.style.display = "none";
    document.getElementById("colors-menu").remove();

    if (card.symbol === "+4") return;

    setTimeout(() => {
        state.computer.goTurn();
    }, 1000);

    return;
}
