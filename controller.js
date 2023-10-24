deckElement.addEventListener("click", () => giveCards(1, player));

container.addEventListener("click", (event) => {
    // якщо вибрано наступний колір
    const clickedColorElement = event.target.closest(".color");

    if (clickedColorElement) {
        const clickedColorElementColor =
            clickedColorElement.classList.value.replace("color ", ""); // визначили обраний колір

        discard.push(mainCard); // поклали основну карту у відбій

        mainCard = { color: clickedColorElementColor, symbol: "" }; // призначили основну карту із визначеним кольором

        mainCardContainer.innerHTML = renderCard(
            //перемалювали основну карту
            clickedColorElementColor,
            "wild"
        );

        opacity.style.display = "none";
        colorsMenu.style.display = "none";

        setTimeout(() => {
            computerGoTurn(computer);
        }, 1000);

        return;
    }

    // якщо гравець вибрав карту
    const clickedCardElement = event.target.closest("#player-cards .card");
    if (!clickedCardElement) return;

    const clickedCard = {
        color: returnElementColor(clickedCardElement),
        symbol: returnElementSymbol(clickedCardElement),
    };

    function handleMainCard() {
        const removedCard = removeCardFromPlayerCards(clickedCard);

        if (mainCard.symbol === "") return;

        discard.push({ ...mainCard });

        mainCard = removedCard;

        console.log(discard);

        mainCardContainer.replaceChildren(clickedCardElement);

        return;
    }

    if (clickedCard.color === "black") {
        handleMainCard();

        updateCardsElement(player);

        if (isGameOver) return;

        if (clickedCard.symbol === "wildDrawFour") {
            giveCards(4, computer);
        }
        opacity.style.display = "block";
        colorsMenu.style.display = "flex";

        return;
    } else if (
        !(clickedCard.color === mainCard.color) &&
        !(clickedCard.symbol === mainCard.symbol)
    ) {
        clickedCardElement.classList.add("shake");

        setTimeout(() => {
            clickedCardElement.classList.remove("shake");
        }, 500);

        return;
    } else if (
        (clickedCard.color === mainCard.color &&
            clickedCard.symbol === "skip") ||
        (clickedCard.symbol === "skip" && mainCard.symbol === "skip")
    ) {
        handleMainCard();

        return;
    } else if (
        (clickedCard.color === mainCard.color &&
            clickedCard.symbol === "drawTwo") ||
        (clickedCard.symbol === "drawTwo" && mainCard.symbol === "drawTwo")
    ) {
        giveCards(2, computer);

        handleMainCard();

        return;
    } else if (
        clickedCard.color === mainCard.color ||
        clickedCard.symbol === mainCard.symbol
    ) {
        handleMainCard();

        setTimeout(() => {
            computerGoTurn(computer);
        }, 1000);

        return;
    }
});
