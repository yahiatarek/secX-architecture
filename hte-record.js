const { extendInSpecificBits, getLinesArray } = require("./generics");
const { getPassOneAddress } = require("./read-file");

function getHteRecord(data) {
    return ['H', getProgramNameFromData(data), '000000', getLastAddressFromData(data),'T', '000000']
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

module.exports = { getHteRecord }