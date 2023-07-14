const { instructions } = require("./pass-one-instructions-sicxe");

function getObjectCodeSicXe(data, addresses) {
    const objectCodesArray = [];
    const objectCodesArray1 = [];
    const NO_OBJ_CODE = 'no obj code'

    data.split('\n').forEach((line)=>{
        const lineArray = line.trim().split(/\s+/);
        const reference = lineArray[lineArray.length - 1];
        const instruction = lineArray.length > 2 ? lineArray[1] : lineArray[0];
        const symbolTableArray = getSymbolTableArray(data, addresses);

        if(instruction === 'RESW'){
            objectCodesArray.push(NO_OBJ_CODE);
        }else if(instruction === 'START' || instruction === 'END'){
            objectCodesArray.push(Number(0).toString(16));
        }else if(instructions[instruction]?.format === '1'){
            if(objectCodesArray[objectCodesArray.length - 1] === NO_OBJ_CODE){
                objectCodesArray1.push(Number(instructions[instruction]?.opcode).toString(16));
            }else {
                objectCodesArray.push(Number(instructions[instruction]?.opcode).toString(16));
            };
        } else if(instructions[instruction]?.format === '3' || instructions[instruction]?.format === '4'){
            if(objectCodesArray[objectCodesArray.length - 1] === NO_OBJ_CODE){
                objectCodesArray1.push(Number(constructObjectCode(constructObjectCodeParams(instructions[instruction], reference, symbolTableArray))).toString(16));
            }else {
                objectCodesArray.push(Number(constructObjectCode(constructObjectCodeParams(instructions[instruction], reference, symbolTableArray))).toString(16));
            };
        }
    })

    
    return [objectCodesArray, objectCodesArray1];
  }

function getSymbolTableArray(data, addresses){
    const symbolTableArray = [];
    data.split('\n').forEach((line, index) => {
        const lineArray = line.trim().split(/\s+/);
        (lineArray.length > 2) ? symbolTableArray.push({inst: lineArray[0], address: addresses[index]}) : null;
    });
    return symbolTableArray;
}

function constructObjectCode(params) {
    const format = params?.format;
    const opcodeBinary = parseInt(params.opcode, 16).toString(2).slice(0, -2);
    const objectCode = opcodeBinary + params.n + params.i + params.x + params.b + params.p + params.e;

    if(format === '3') {return parseInt(params.opcode, 16).toString(2), objectCode + params.disp}

    if(format === '4') {return parseInt(params.opcode, 16).toString(2), objectCode + params.address}

    return '0000000'
}

constructObjectCodeParams = (instruction, reference, symbolTableArray) => {
    return {
        format: instruction?.format,
        opcode: instruction?.opcode,
        n: instruction?.addr.indirect,
        i: instruction?.addr.immediate,
        x: instruction?.addr.indexed,
        b: instruction?.addr.baseRelative,
        p: instruction?.addr.pcRelative,
        e: instruction?.addr.extended,
        disp: instruction?.addr.displacement,
        address: instruction?.addr.displacement ? null : calcAddress(reference, symbolTableArray),
    }
};

calcAddress = (reference, symbolTableArray) => {
    return symbolTableArray.map((symbol) => {
        if(symbol.inst.includes(reference)){
            return symbol.address;
        }
    })
};

  module.exports = { getObjectCodeSicXe };