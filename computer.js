import Actor from "./actor.js";
import handleComputerTurn from "./computer-turn.js";
import robotNames from "./robot-names.js";

export default class Computer extends Actor {
    constructor(cards, name) {
        super(cards, name);
    }

    renderCards() {
        document.getElementById("computer-cards").innerHTML = this.cards.reduce(
            (total, card) => total + card.renderFace(),
            ""
        );
    }

    goTurn() {
        handleComputerTurn(this);
    }

    drawAnotherCard() {
        const [nextCard] = this.draw(1);
        // this.renderCards();

        if (
            nextCard.color === state.mainCard.color ||
            nextCard.symbol === state.mainCard.symbol ||
            nextCard.symbol === "wild" ||
            nextCard.symbol === "+4"
        ) {
            setTimeout(() => {
                this.renderCards();
            }, 500);

            return nextCard;
        }

        return this.drawAnotherCard();
    }
}

export function getRandomRobotName() {
    const randomIndex = Math.floor(Math.random() * robotNames.length);
    return robotNames[randomIndex].name;
}
