const container = document.getElementById("container"),
    opacity = document.getElementById("opacity"),
    colorsMenu = document.getElementById("colors-menu"),
    computerName = document.getElementById("computer-name");

function updateCardsElement(actor) {
    let actorCards;
    if (actor === player) actorCards = playerCards;
    if (actor === computer) {
        actorCards = computerCards;
    }

    actorCards.innerHTML = actor.cards
        .map(function (card) {
            if (actor === computer) return renderCard("black", card.symbol); //із символом попрацювати
            return renderCard(card.color, card.symbol);
        })
        .join("");

    // if (actor === computer) {
    //     const cards = computerCards.children;
    // for (let i = 0, len = cards.length; i < len; i++) {
    //     // cards[i].style.left = Math.ceil(i - len / 2) * 50 + "px";
    //     cards[i].style.zIndex = len - i;
    // }
}

function returnElementColor(element) {
    return element.classList.value.replace("card ", "");
}
