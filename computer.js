export default class Computer {
    constructor() {
        this.domElement = document.getElementById("computer-cards");
    }

    findMatchedCard() {
        const matchedColors = this.cards.filter(
            (card) => card.color === mainCard.color
        );

        let foundMatchCard;

        if (matchedColors.length > 0) {
            const matchedColorAndDrawTwo = matchedColors.find(
                (card) => card.symbol === "drawTwo"
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

        const matchedSymbol = this.cards.find(
            (card) => card.symbol === mainCard.symbol
        );
        if (matchedSymbol) {
            foundMatchCard = matchedSymbol;
            return foundMatchCard;
        }

        const matchedWild = this.cards.find((card) => card.symbol === "wild");
        if (matchedWild) {
            foundMatchCard = matchedWild;
            return foundMatchCard;
        }

        const matchedWildDrawFour = this.cards.find(
            (card) => card.symbol === "wildDrawFour"
        );
        if (matchedWildDrawFour) {
            foundMatchCard = matchedWildDrawFour;
            return foundMatchCard;
        }

        return foundMatchCard;
    }

    findMostCommonColor() {
        let maxItems = 0;
        let maxItemsColor;

        ["red", "yellow", "blue", "green"].forEach((color) => {
            const cards = this.cards.filter((card) => card.color === color);

            if (cards.length <= maxItems) return;

            maxItems = cards.length;
            maxItemsColor = color;
        });

        return maxItemsColor;
    }

    drawAnotherCard() {
        let matchedCard;

        if (deck.isEmpty) {
            deck = shuffle(discard);
            discard = [];
        }

        const nextCard = deck.shift(); // взяли наступну карту

        this.cards.push(nextCard); // запхали в віртуальну "руку" компʼютера

        this.domElement.innerHTML += renderCard("black", nextCard.symbol); // відмалювали сорочку нової карти і символ, із символом попрацювати

        if (nextCard.color === mainCard.color) {
            matchedCard = nextCard;
        } else if (nextCard.symbol === mainCard.symbol) {
            matchedCard = nextCard;
        } else if (nextCard.symbol === "wild") {
            matchedCard = nextCard;
        } else if (nextCard.symbol === "wildDrawFour") {
            matchedCard = nextCard;
        }

        if (matchedCard) return matchedCard;

        return this.drawAnotherCard();
    }

    computerGoTurn() {
        if (computer.cards.length === 1) console.log("UNO!"); // якщо у компʼютера одна карта за правилами має про це повідомити, переписати

        let foundMatchedCard = findMatchedCard(); // шукає карту в "руці", повертає обʼєкт

        // якщо обʼєкт пустий -- тягне карти поки не витягне потрібну
        if (!foundMatchedCard) {
            foundMatchedCard = computerDrawAnotherCard();
        }

        computer.cards.splice(computer.cards.indexOf(foundMatchedCard), 1); // забирає обʼєкт з віртуальної "руки"

        updateCardsElement(computer); // оновлює відображення карт компʼютера, потім замінити на рубашки

        if (mainCard.symbol !== "") discard.push(mainCard); // кладе діючу основну карту в колоду

        console.log(discard);

        mainCard = foundMatchedCard; // призначає знайдену карту основною

        mainCardContainer.innerHTML = renderCard(
            mainCard.color,
            mainCard.symbol
        ); // відмальовує нову основну карту

        if (computer.cards.length === 0) congratulateWinner(computer);

        if (foundMatchedCard.symbol === "skip") {
            setTimeout(() => {
                computerGoTurn();
            }, 1000);
            return;
        }

        if (foundMatchedCard.symbol === "drawTwo") {
            giveCards(2, player);
            setTimeout(() => {
                computerGoTurn();
            }, 1000);
            return;
        }

        if (
            foundMatchedCard.symbol === "wild" ||
            foundMatchedCard.symbol === "wildDrawFour"
        ) {
            const mostCommonColor = findMostCommonColor();
            discard.push(mainCard);
            mainCard = { color: mostCommonColor, symbol: "" };
            mainCardContainer.innerHTML = renderCard(
                mostCommonColor,
                foundMatchedCard.symbol
            );

            if (foundMatchedCard.symbol === "wildDrawFour") {
                giveCards(4, player);
                setTimeout(() => {
                    computerGoTurn();
                }, 1000);
                return;
            }
        }
    }
}
