export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.trunc(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function isNumber(value) {
    return !isNaN(parseInt(value));
}
