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
    "BASE": (word) => {
        return 0000;
    },
};

function executeInstruction(inst, word) {
    if (inst in instructions && inst === "BASE"){
        return 0003;
    }

    if (inst in instructions) {
        return instructions[inst](word);
    }
    
    return 0003;
}

module.exports = {executeInstruction}