const symbolMap = {
    drawTwo: "+2",
    wildDrawFour: "+4",
};

export default class Card {
    constructor(color, symbol) {
        this.color = color;
        this.symbol = symbol;
    }

    renderFace() {
        this.symbol = symbolMap[this.symbol] || this.symbol;

        const isNumber = !isNaN(parseInt(this.symbol));
        const isWild = this.symbol === "wild" || this.symbol === "+4";
        const isActive = !isNumber && !isWild;

        const gradientClass = isWild ? "gradient-text" : "";
        const centerContainerClassess = [];

        if (isNumber) centerContainerClassess.push("big-number");
        if (isActive) centerContainerClassess.push("active-card");

        return `
            <div class="card-wrapper">
                <div class="card ${this.color}">
                    <div class="small-symbol ${gradientClass}">${
            this.symbol
        }</div>
                    <div class="small-symbol central-symbol ${gradientClass} ${centerContainerClassess.join(
            " "
        )}">${this.symbol}</div>
                    <div class="small-symbol ${gradientClass}">${
            this.symbol
        }</div>
                </div>
            </div>
        `;
    }

    renderBack() {
        return `
            <div class="card-wrapper">
                <div class="card back">    
                    <div class="gradient-text logo">UNO</div>
                </div>
            </div>
        `;
    }
}
