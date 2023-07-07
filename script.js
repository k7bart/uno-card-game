const container = document.getElementById("container"),
    computerCards = document.getElementById("computer-cards"),
    table = document.getElementById("table"),
    deckElement = document.getElementById("deck"),
    mainCardContainer = document.getElementById("main-card-container"),
    playerCards = document.getElementById("player-cards"),
    opacity = document.getElementById("opacity"),
    colorsMenu = document.getElementById("colors-menu"),
    unoButtons = document.getElementById("uno-buttons-container"),
    computerName = document.getElementById("computer-name");

const robotNames = [
    { name: "R2-D2", franchise: "Star Wars" },
    { name: "C-3PO", franchise: "Star Wars" },
    { name: "Terminator", franchise: "Terminator series" },
    { name: "Wall-E", franchise: "Wall-E" },
    { name: "Optimus Prime", franchise: "Transformers" },
    { name: "Ultron", franchise: "Avengers: Age of Ultron" },
    { name: "Data", franchise: "Star Trek: The Next Generation" },
    { name: "HAL 9000", franchise: "2001: A Space Odyssey" },
    { name: "Bender", franchise: "Futurama" },
    { name: "RoboCop", franchise: "RoboCop" },
    { name: "Rosie the Robot", franchise: "The Jetsons" },
    { name: "Johnny 5", franchise: "Short Circuit" },
    { name: "Ava", franchise: "Ex Machina" },
    { name: "T-800", franchise: "Terminator series" },
    { name: "Astro Boy", franchise: "Astro Boy" },
    { name: "B-9", franchise: "Lost in Space" },
    { name: "Marvin", franchise: "The Hitchhiker's Guide to the Galaxy" },
    { name: "Gort", franchise: "The Day the Earth Stood Still" },
    { name: "Bishop", franchise: "Aliens" },
    { name: "David", franchise: "AI: Artificial Intelligence" },
    { name: "K-2SO", franchise: "Rogue One: A Star Wars Story" },
    { name: "Roy Batty", franchise: "Blade Runner" },
    { name: "Sonny", franchise: "I, Robot" },
    { name: "TARS", franchise: "Interstellar" },
    { name: "Gigolo Joe", franchise: "AI: Artificial Intelligence" },
    { name: "Mechagodzilla", franchise: "Godzilla series" },
    { name: "ED-209", franchise: "RoboCop" },
    { name: "Chappie", franchise: "Chappie" },
    { name: "The Iron Giant", franchise: "The Iron Giant" },
    { name: "Tik-Tok", franchise: "Return to Oz" },
    { name: "Baymax", franchise: "Big Hero 6" },
    { name: "T-1000", franchise: "Terminator 2: Judgment Day" },
    { name: "Aibo", franchise: "Sony's robotic pet" },
    { name: "Pris", franchise: "Blade Runner" },
    { name: "Rosie", franchise: "Rosie the Riveter robot" },
    { name: "Gisaku", franchise: "Castle in the Sky" },
    { name: "Mechadon", franchise: "Pacific Rim" },
    { name: "Andrew", franchise: "Bicentennial Man" },
    { name: "Robot B-9", franchise: "Forbidden Planet" },
    { name: "KITT", franchise: "Knight Rider" },
    { name: "H.A.R.D.A.C.", franchise: "Batman: The Animated Series" },
    { name: "Bender", franchise: "Futurama" },
];
function getRandomRobotName() {
    const randomIndex = Math.floor(Math.random() * robotNames.length);
    return robotNames[randomIndex].name;
}
const randomRobotName = getRandomRobotName();
computerName.innerText = randomRobotName;

const playerName = "Kate"; // отримувати потім з форми

const deck = [];
const discard = [];
const colors = ["red", "yellow", "green", "blue"];
const symbols = [
    "0",
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

let computer = { isActive: false };
let player = { isActive: true };

let mainCard = {};

let isGameOver = false;

function createCards() {
    for (let color of colors) {
        for (let i = 0; i < symbols.length; i++) {
            let card = {
                color: color,
                symbol: symbols[i],
            };

            deck.push(card);

            if (i !== 0) {
                deck.push(card);
            }
        }
    }

    for (let joker of jokers) {
        let card = {
            color: "black",
            symbol: joker,
        };

        deck.push(card);
        deck.push(card);
        deck.push(card);
        deck.push(card);
    }
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

const symbolMap = {
    drawTwo: "+2",
    wildDrawFour: "+4",
};

function renderCard(color, symbol) {
    symbol = symbolMap[symbol] || symbol;

    const isNumber = !isNaN(parseInt(symbol));
    const isWild = symbol === "wild" || symbol === "+4";
    const isActive = !isNumber && !isWild;

    const gradientClass = isWild ? "gradient-text" : "";
    const centerContainerClassess = [];

    if (isNumber) centerContainerClassess.push("big-number");
    if (isActive) centerContainerClassess.push("active-card");

    if (symbol === "UNO") {
        return `
        <div class="card-wrapper">
            <div class="card ${color}">
            <div class="central-symbol gradient-text">${symbol}</div>
        </div>
    </div>
`;
    }

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

function startGame() {
    let firstCard = deck.shift();

    // if number
    if (!isNaN(parseInt(firstCard.symbol))) {
        mainCard = firstCard;
        mainCardContainer.innerHTML += renderCard(
            mainCard.color,
            mainCard.symbol
        );
        return;
    }

    deck.push(firstCard);

    startGame(deck);
}

function congratulateWinner(actor) {
    isGameOver = true;

    opacity.style.display = "block";

    if (actor === player)
        console.log(
            `Congratulations ${playerName} on your victory in the UNO game! 🎉🥳 Your ability to outmaneuver your opponents and play those wild cards at just the right moment is truly impressive. Enjoy your well-deserved victory and bask in the glory of being the reigning UNO champion! Keep up the great work and continue spreading joy through friendly competition. Bravo! 👏`
        );

    if (actor === computer)
        console.log(
            `This time won ${randomRobotName}! ${playerName}, even though you didn't emerge as the victor in the UNO game, don't let that dampen your spirits! 🌟 Remember that the true joy lies in the thrill of the game itself, the laughter shared, and the memories created. Losing is just a part of the journey towards improvement and growth.  So, keep your head held high, embrace the lessons learned, and get ready for the next UNO adventure. You're a true champion in your own right! 💪🌟`
        );
}

function checkIfDeckEmpty() {
    if (deck.length) return;

    deck = shuffleCards(discard);
    discard = [];
}

function giveCards(num, actor) {
    if (!actor.cards) actor.cards = [];

    checkIfDeckEmpty();

    actor.cards.push(...deck.splice(0, num));

    updateCardsElement(actor);
}

function returnElementColor(element) {
    return element.classList.value.replace("card ", "");
}

function returnElementSymbol(element) {
    let symbol = element.innerText.split("\n")[0];

    if (symbol === "+2") symbol = "drawTwo";
    if (symbol === "+4") symbol = "wildDrawFour";

    return symbol;
}

function findMatchedCard(actor) {
    const matchedColors = actor.cards.filter(
        (card) => card.color === mainCard.color
    );

    let foundMatchCard;

    if (matchedColors.length > 0) {
        const matchedColorAndDrawTwo = matchedColors.find(
            (card) => card.symbol === "drawTwo"
        );
        if (matchedColorAndDrawTwo) {
            foundMatchCard = matchedColorAndDrawTwo;
            return foundMatchCard;
        }

        const matchedColorAndSkip = matchedColors.find(
            (card) => card.symbol === "skip"
        );
        if (matchedColorAndSkip) {
            foundMatchCard = matchedColorAndSkip;
            return foundMatchCard;
        }

        foundMatchCard = matchedColors.shift();
        return foundMatchCard;
    }

    const matchedSymbol = actor.cards.find(
        (card) => card.symbol === mainCard.symbol
    );
    if (matchedSymbol) {
        foundMatchCard = matchedSymbol;
        return foundMatchCard;
    }

    const matchedWild = actor.cards.find((card) => card.symbol === "wild");
    if (matchedWild) {
        foundMatchCard = matchedWild;
        return foundMatchCard;
    }

    const matchedWildDrawFour = actor.cards.find(
        (card) => card.symbol === "wildDrawFour"
    );
    if (matchedWildDrawFour) {
        foundMatchCard = matchedWildDrawFour;
        return foundMatchCard;
    }

    return foundMatchCard;
}

function findMostCommonColor() {
    const redCards = computer.cards.filter((card) => card.color === "red");
    const yellowCards = computer.cards.filter(
        (card) => card.color === "yellow"
    );
    const blueCards = computer.cards.filter((card) => card.color === "blue");
    const greenCards = computer.cards.filter((card) => card.color === "green");

    const lengths = [
        redCards.length,
        yellowCards.length,
        blueCards.length,
        greenCards.length,
    ];
    const maxLength = Math.max(...lengths);
    if (maxLength === redCards.length) {
        return "red";
    }
    if (maxLength === yellowCards.length) {
        return "yellow";
    }
    if (maxLength === blueCards.length) {
        return "blue";
    }

    return "green";
}

function removeCardFromPlayerCards(cardToRemove) {
    const foundCardIndex = player.cards.findIndex(
        (card) =>
            card.color === cardToRemove.color &&
            card.symbol === cardToRemove.symbol
    );

    let removedCard = player.cards.splice(foundCardIndex, 1)[0];

    if (player.cards.length === 0) congratulateWinner(player);

    return removedCard;
}

function computerDrawAnotherCard() {
    let matchedCard;

    checkIfDeckEmpty();

    const nextCard = deck.shift(); // взяли наступну карту

    computer.cards.push(nextCard); // запхали в віртуальну "руку" компʼютера

    computerCards.innerHTML += renderCard("black", nextCard.symbol); // відмалювали сорочку нової карти і символ, із символом попрацювати

    if (nextCard.color === mainCard.color) {
        matchedCard = nextCard;
    } else if (nextCard.symbol === mainCard.symbol) {
        matchedCard = nextCard;
    } else if (nextCard.symbol === "wild") {
        matchedCard = nextCard;
    } else if (nextCard.symbol === "wildDrawFour") {
        matchedCard = nextCard;
    }

    if (matchedCard) return matchedCard;

    return computerDrawAnotherCard();
}

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

function computerGoTurn() {
    if (computer.cards.length === 1) console.log("UNO!"); // якщо у компʼютера одна карта за правилами має про це повідомити, переписати

    let foundMatchedCard = findMatchedCard(computer); // шукає карту в "руці", повертає обʼєкт

    // якщо обʼєкт пустий -- тягне карти поки не витягне потрібну
    if (!foundMatchedCard) {
        foundMatchedCard = computerDrawAnotherCard();
    }

    computer.cards.splice(computer.cards.indexOf(foundMatchedCard), 1); // забирає обʼєкт з віртуальної "руки"

    updateCardsElement(computer); // оновлює відображення карт компʼютера, потім замінити на рубашки

    if (mainCard.symbol !== "") discard.push(mainCard); // кладе діючу основну карту в колоду

    console.log(discard);

    mainCard = foundMatchedCard; // призначає знайдену карту основною

    mainCardContainer.innerHTML = renderCard(mainCard.color, mainCard.symbol); // відмальовує нову основну карту

    if (computer.cards.length === 0) congratulateWinner(computer);

    if (foundMatchedCard.symbol === "skip") {
        setTimeout(() => {
            computerGoTurn();
        }, 1000);
        return;
    }

    if (foundMatchedCard.symbol === "drawTwo") {
        giveCards(2, player);
        setTimeout(() => {
            computerGoTurn();
        }, 1000);
        return;
    }

    if (
        foundMatchedCard.symbol === "wild" ||
        foundMatchedCard.symbol === "wildDrawFour"
    ) {
        const mostCommonColor = findMostCommonColor();
        discard.push(mainCard);
        mainCard = { color: mostCommonColor, symbol: "" };
        mainCardContainer.innerHTML = renderCard(
            mostCommonColor,
            foundMatchedCard.symbol
        );

        if (foundMatchedCard.symbol === "wildDrawFour") {
            giveCards(4, player);
            setTimeout(() => {
                computerGoTurn();
            }, 1000);
            return;
        }
    }
}

// function isTheLastCard() {
//     if (player.cards.length > 1) {
//         unoButtons.style.display = "none";
//         return;
//     }

//     unoButtons.style.display = "flex";
// }

container.addEventListener("click", (event) => {
    // якщо натиснули на deck
    const clickedDeckElement = event.target.closest("#deck");
    if (clickedDeckElement) {
        giveCards(1, player);
        return;
    }

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

createCards();
shuffleCards(deck);
giveCards(7, computer);
giveCards(7, player);
startGame();

//кінець раунду і кінець гри
