const instructions = {
    "RESW": (word) => {
        return parseInt(word) * 3;
    },
    "RESB": (word) => {
        return parseInt(word) * 3;
    },
    "BYTE": (word) => {
        return word.length / 2;
    },
};

function executeInstruction(inst, word) {
    if (inst in instructions) {
        return instructions[inst](word);
    } else {
        return 0003;
    }
}

module.exports = {executeInstruction}