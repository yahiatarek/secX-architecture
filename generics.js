function extendInSpecificBits(word, length, filler, fillerRight, fillerLeft) {
    while (word.length < length) {
        fillerRight ? (word = word + filler) : fillerLeft ? (word = filler + word) : (word = filler + word)
    }
    return word;
}

function getLinesArray (data) {
    const linesArray = []
    const lines = data.split('\n');
    for (const line of lines) {
        linesArray.push(line);
    }
    return linesArray;
}

module.exports = { extendInSpecificBits, getLinesArray }