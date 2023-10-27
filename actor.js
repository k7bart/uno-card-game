import state from "./state.js";
import Deck from "./deck.js";

export default class Actor {
    constructor(name) {
        this.name = name;
        this.cards = [];
    }

    draw(num) {
        if (state.deck.items.isEmpty) {
            state.deck = new Deck();
            state.deck.shuffle();
        }

        let drawnCards = state.deck.items.splice(0, num);

        this.cards.push(...drawnCards);

        return drawnCards;
    }

    removeCard(cardToRemove) {
        // витягти і повернути обʼєкт клікнутої карти
        const foundCardIndex = this.cards.findIndex(
            (card) =>
                card.color === cardToRemove.color &&
                card.symbol === cardToRemove.symbol
        );

        let removedCard = this.cards.splice(foundCardIndex, 1)[0];

        return removedCard;
    }
}
