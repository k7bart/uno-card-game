import Actor from "./actor.js";
import handlePlayerTurn from "./player-turn.js";

export default class Player extends Actor {
    constructor(cards, name, score) {
        super(cards, name, score);
    }

    renderCards() {
        document.getElementById("player-cards").innerHTML = this.cards.reduce(
            (total, card) => total + card.renderFace(),
            ""
        );
    }

    goTurn() {
        handlePlayerTurn();
    }
}
