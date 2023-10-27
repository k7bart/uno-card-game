import Deck from "./deck.js";
import state from "./state.js";
import { computer } from "./computer.js";
import { player } from "./player.js";

export default class Game {
    start() {
        state.deck = new Deck();
        state.deck.shuffle();

        state.mainCard = state.deck.items.shift();
        document.getElementById("main-card-container").innerHTML +=
            state.mainCard.renderFace();

        player.draw(7);
        computer.draw(7);

        player.renderCards();
        computer.renderCards();

        player.goTurn();
    }

    onEnd(winner) {
        this.isOver = true;

        // opacity.style.display = "block";

        if (winner === player)
            console.log(
                `Congratulations ${player.name} on your victory in the UNO game! 🎉🥳 Your ability to outmaneuver your opponents and play those wild cards at just the right moment is truly impressive. Enjoy your well-deserved victory and bask in the glory of being the reigning UNO champion! Keep up the great work and continue spreading joy through friendly competition. Bravo! 👏`
            );

        if (winner === computer)
            console.log(
                `This time won ${winner.name}! ${player.name}, even though you didn't emerge as the victor in the UNO game, don't let that dampen your spirits! 🌟 Remember that the true joy lies in the thrill of the game itself, the laughter shared, and the memories created. Losing is just a part of the journey towards improvement and growth.  So, keep your head held high, embrace the lessons learned, and get ready for the next UNO adventure. You're a true champion in your own right! 💪🌟`
            );
    }
}
