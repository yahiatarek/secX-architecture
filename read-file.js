function getLinesArray (data) {
    const linesArray = []
    const lines = data.split('\n');
    for (const line of lines) {
        linesArray.push(line);
    }
    return linesArray;
}

function getPassOneAddress(data){
    for (let i=0; i < getLinesArray(data).length; i++){
        const inst1 = getLinesArray(data)[i].trim().split(/\s+/).length > 2 ? getLinesArray(data)[i].trim().split(/\s+/)[1] : getLinesArray(data)[i].trim().split(/\s+/)[0];
        const inst2 = getLinesArray(data)[i-1].trim().split(/\s+/).length > 2 ? getLinesArray(data)[i-1].trim().split(/\s+/)[1] : getLinesArray(data)[i-1].trim().split(/\s+/)[0];
        console.log(inst1,1, inst2, '2')
    }
}

module.exports = { getLinesArray, getPassOneAddress }