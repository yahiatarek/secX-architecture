const instructions = {
    "RESW": () => {
        return 0003;
    },
    "RESB": () => {
        return 0003;
    },
    "BYTE": () => {
        return 0003;
    },
};

function executeInstruction(word) {
    if (word in instructions) {
        return instructions[word]();
    } else {
        return 0003;
    }
}

module.exports = {executeInstruction}