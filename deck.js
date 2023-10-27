import Card from "./card.js";

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

const wildSymbols = ["wild", "wildDrawFour"];

export default class Deck {
    constructor() {
        this.items = [];

        for (let color of colors) this.items.push(new Card(color, "0"));

        for (let color of colors) {
            for (let symbol of symbols) {
                let card = new Card(color, symbol);
                this.items.push(card, card);
            }
        }

        for (let symbol of wildSymbols) {
            for (let i = 0; i < 4; i++) {
                this.items.push(new Card("black", symbol));
            }
        }
    }

    get isEmpty() {
        return !!this.items.length;
    }

    shuffle() {
        for (let i = this.items.length - 1; i > 0; i--) {
            const j = Math.trunc(Math.random() * i);
            [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        }
    }
}
