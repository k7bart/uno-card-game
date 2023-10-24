import { deck, Deck } from "./deck.js";

class Actor {
    constructor() {
        this.cards = [];
    }

    draw(num) {
        if (deck.items.isEmpty) {
            deck.items = new Deck();
            deck.items.shuffle();
        }

        this.cards.push(...deck.items.splice(0, num));
    }
}

export class Computer extends Actor {
    constructor(cards) {
        super(cards);
    }

    renderCards() {
        const computerCardsElement = document.getElementById("computer-cards");

        computerCardsElement.innerHTML += this.cards.reduce(
            (total, card) => total + card.renderBack(),
            ""
        );
    }
}

export class Player extends Actor {
    constructor(cards) {
        super(cards);
    }

    renderCards() {
        const playerCardsElement = document.getElementById("player-cards");

        playerCardsElement.innerHTML += this.cards.reduce(
            (total, card) => total + card.renderFace(),
            ""
        );
    }
}
