const { executeInstruction } = require("./passOneInstructions");

function getLinesArray (data) {
    const linesArray = []
    const lines = data.split('\n');
    for (const line of lines) {
        linesArray.push(line);
    }
    return linesArray;
}

function getPassOneAddress(data){
    const linesFromData = getLinesArray(data);
    let prevAddress = linesFromData[0].trim().split(/\s+/)[linesFromData[0].trim().split(/\s+/).length - 1];
    let currAddress = prevAddress;
    const addressesArray = [];
    for (let i=0; i < linesFromData.length; i++){
        const currentInstruction = linesFromData[i].trim().split(/\s+/).length > 2 ? linesFromData[i].trim().split(/\s+/)[1] : linesFromData[i].trim().split(/\s+/)[0];
        const wordWithCurrInstruction = linesFromData[i].trim().split(/\s+/)[linesFromData[i].trim().split(/\s+/).length - 1];
        currAddress = (i === 0 || i === 1) ? 0 : calculateAddress(prevAddress, currentInstruction, wordWithCurrInstruction);
        prevAddress = currAddress;
        addressesArray.push(currAddress);
    }
    console.log(addressesArray, 'array');
    return addressesArray;
}

function calculateAddress(prevAddress, currInst, currWord) {
    const num1 = prevAddress;
    const num2 = executeInstruction(currInst, currWord);

    const hex1 = num1.toString(16);
    const hex2 = num2.toString(16);
    const sum = parseInt(hex1, 16) + parseInt(hex2, 16);
    const hexSum = sum.toString(16);
    return hexSum;
}

module.exports = { getLinesArray, getPassOneAddress }