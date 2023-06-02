const { extendInSpecificBits, getLinesArray } = require("./generics");
const { getObjectCode } = require("./op-codes");
const { getPassOneAddress, breakPointsArray } = require("./read-file");

function getHteRecord(data) {
    return [
        'H', 
        getProgramNameFromData(data), 
        '000000', getLastAddressFromData(data),
        'T',
        breakPointsArray[0],
        ...getFirstOrSecondObjectCode(data, true, false),
        'T',
        getLastAddressFromData(data),
        ...getFirstOrSecondObjectCode(data, false, true)
    ]
}

function getProgramNameFromData(data) {
    const firstLine = getLinesArray(data)[0];
    return extendInSpecificBits(firstLine.split(' ')[0], 6, 'X');
}

function getLastAddressFromData(data){
    const addresses = getPassOneAddress(data)
    const lastAddress = addresses[addresses.length - 1]
    return extendInSpecificBits(lastAddress, 6, '0', false, true)
}

function getFirstOrSecondObjectCode(data, displayFirstArray, displaySecondArray){
    const objCodeArray = displayFirstArray ? getObjectCode(data, getPassOneAddress(data))[0] : displaySecondArray ? getObjectCode(data, getPassOneAddress(data))[1] : [];
    return objCodeArray
}

module.exports = { getHteRecord }