const symbolMap = {
    drawTwo: "+2",
    wildDrawFour: "+4",
};

export default class Card {
    render(color, symbol) {
        symbol = symbolMap[symbol] || symbol;

        const isNumber = !isNaN(parseInt(symbol));
        const isWild = symbol === "wild" || symbol === "+4";
        const isActive = !isNumber && !isWild;

        const gradientClass = isWild ? "gradient-text" : "";
        const centerContainerClassess = [];

        if (isNumber) centerContainerClassess.push("big-number");
        if (isActive) centerContainerClassess.push("active-card");

        return `
            <div class="card-wrapper">
                <div class="card ${color}">
                    <div class="small-symbol ${gradientClass}">${symbol}</div>
                    <div class="small-symbol central-symbol ${gradientClass} ${centerContainerClassess.join(
            " "
        )}">${symbol}</div>
                    <div class="small-symbol ${gradientClass}">${symbol}</div>
                </div>
            </div>
        `;
    }
}
