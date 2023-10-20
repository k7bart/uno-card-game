const colors = ["red", "yellow", "green", "blue"];

const symbols = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "reverse",
    "skip",
    "drawTwo",
];

const jokers = ["wild", "wildDrawFour"];

export default class Deck {
    constructor() {
        this.items = [];

        for (let color of colors) this.items.push({ color, symbol: "0" });

        for (let color of colors) {
            for (let symbol of symbols) {
                let card = { color, symbol };

                this.items.concat([card, card]);
            }
        }

        for (let symbol of jokers) {
            for (let i = 0; i < 4; i++) {
                this.items.push({ color: "black", symbol });
            }
        }
    }

    get isEmpty() {
        return !!this.items.length;
    }
}
