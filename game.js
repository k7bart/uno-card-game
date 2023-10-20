import Deck from "./deck";
import { isNumber } from "./utils";

export default class Game {
    constructor() {
        this.deck = new Deck();
    }

    start() {
        let firstCard = this.deck.shift();

        if (isNumber(firstCard.symbol)) {
            mainCard = firstCard;

            mainCardContainer.innerHTML += renderCard(
                mainCard.color,
                mainCard.symbol
            );

            return;
        }

        this.deck.push(firstCard);

        this.start();
    }

    onEnd(actor) {
        this.isOver = true;

        // opacity.style.display = "block";

        if (actor === player)
            console.log(
                `Congratulations ${playerName} on your victory in the UNO game! 🎉🥳 Your ability to outmaneuver your opponents and play those wild cards at just the right moment is truly impressive. Enjoy your well-deserved victory and bask in the glory of being the reigning UNO champion! Keep up the great work and continue spreading joy through friendly competition. Bravo! 👏`
            );

        if (actor === computer)
            console.log(
                `This time won ${randomRobotName}! ${playerName}, even though you didn't emerge as the victor in the UNO game, don't let that dampen your spirits! 🌟 Remember that the true joy lies in the thrill of the game itself, the laughter shared, and the memories created. Losing is just a part of the journey towards improvement and growth.  So, keep your head held high, embrace the lessons learned, and get ready for the next UNO adventure. You're a true champion in your own right! 💪🌟`
            );
    }
}
