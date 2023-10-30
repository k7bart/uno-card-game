import state, { updateMainCard } from "./state.js";

export default function handleComputerTurn(computer) {
    let foundMatchedCard = findMatchedCard(computer.cards); // шукає карту в "руці", повертає обʼєкт

    // якщо не знайшло -- тягне карти поки не витягне потрібну
    if (!foundMatchedCard) {
        foundMatchedCard = computer.drawAnotherCard();
    }

    state.computer.removeCard(foundMatchedCard);
    state.computer.renderCards();
    updateMainCard(foundMatchedCard);

    if (foundMatchedCard.symbol === "skip") {
        setTimeout(() => {
            state.computer.goTurn();
        }, 1000);
        return;
    }

    if (foundMatchedCard.symbol === "+2") {
        state.player.draw(2);
        state.player.renderCards();
        setTimeout(() => {
            state.computer.goTurn();
        }, 1000);
        return;
    }

    if (
        foundMatchedCard.symbol === "wild" ||
        foundMatchedCard.symbol === "+4"
    ) {
        handleWildCard(foundMatchedCard.symbol);
    }

    if (state.computer.hasOneCard) console.log("UNO!"); // якщо у компʼютера одна карта за правилами має про це повідомити, переписати
    if (state.computer.hasNoCards) state.game.onEnd(state.computer);
    setTimeout(() => {
        state.currentPlayer = state.player;
    }, 500);
}

// TODO: переписати на щось менше
function findMatchedCard(cards) {
    const matchedColors = cards.filter(
        (card) => card.color === state.mainCard.color
    );

    let foundMatchCard;

    if (matchedColors.length > 0) {
        const matchedColorAndDrawTwo = matchedColors.find(
            (card) => card.symbol === "+2"
        );
        if (matchedColorAndDrawTwo) {
            foundMatchCard = matchedColorAndDrawTwo;
            return foundMatchCard;
        }

        const matchedColorAndSkip = matchedColors.find(
            (card) => card.symbol === "skip"
        );
        if (matchedColorAndSkip) {
            foundMatchCard = matchedColorAndSkip;
            return foundMatchCard;
        }

        foundMatchCard = matchedColors.shift();
        return foundMatchCard;
    }

    const matchedSymbol = cards.find(
        (card) => card.symbol === state.mainCard.symbol
    );
    if (matchedSymbol) {
        foundMatchCard = matchedSymbol;
        return foundMatchCard;
    }

    const matchedWild = cards.find((card) => card.symbol === "wild");
    if (matchedWild) {
        foundMatchCard = matchedWild;
        return foundMatchCard;
    }

    const matchedWildDrawFour = cards.find((card) => card.symbol === "+4");
    if (matchedWildDrawFour) {
        foundMatchCard = matchedWildDrawFour;
        return foundMatchCard;
    }

    return foundMatchCard;
}

function handleWildCard(symbol) {
    const mostCommonColor = findMostCommonColor();
    state.mainCard.color = mostCommonColor;
    updateMainCard(state.mainCard);

    if (symbol === "+4") {
        state.player.draw(4);
        state.player.renderCards();
        setTimeout(() => {
            state.computer.goTurn();
        }, 1000);
        return;
    }
}

function findMostCommonColor() {
    let maxItems = 0;
    let maxItemsColor;

    ["red", "yellow", "blue", "green"].forEach((color) => {
        const cards = state.computer.cards.filter(
            (card) => card.color === color
        );

        if (cards.length <= maxItems) return;

        maxItems = cards.length;
        maxItemsColor = color;
    });

    if (!maxItemsColor)
        return ["red", "yellow", "blue", "green"][
            Math.floor(Math.random() * 4)
        ];

    return maxItemsColor;
}
