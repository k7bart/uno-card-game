let state = {
    mainCard: {},
    deck: null,
    game: null,
};

// TODO: перенести звідси?
export const updateMainCard = (newMainCard) => {
    state.mainCard = newMainCard;
    document.getElementById("main-card-container").innerHTML =
        state.mainCard.renderFace();
    return;
};

export default state;