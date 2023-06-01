const OP_CODES = {
    "LDA": "00",
    "LDX": "04",
    "LDL": "08",
    "STA": "0C",
    "STX": "10",
    "STL": "14",
    "ADD": "18",
    "SUB": "1C",
    "MUL": "20",
    "DIV": "24",
    "COMP": "28",
    "TIX": "2C",
    "JLT": "38",
    "JEQ": "30",
    "JGT": "34",
    "AND": "40",
    "OR": "44",
    "JSUB": "48",
    "RSUB": "4C",
    "LDCH": "50",
    "STCH": "54",
    "RD": "D8",
    "WD": "DC",
    "TD": "E0",
    "STSW": "E8",
    "SSK": "EC",
    "LDB": "68",
    "STB": "78",
    "SIO": "F0",
    "HIO": "F4",
    "TIO": "F8"
  };

function getObjectCode(data, addresses) {
    const regex = /\b.+?,X\b/;
    const objectCodesArray = [];
    const objectCodesArray1 = [];
    const NO_OBJ_CODE = 'no obj code'
    const symbolTableArray = getSymbolTableArray(data, addresses);

    data.split('\n').forEach((line)=>{
        const lineArray = line.trim().split(/\s+/);
        const reference = lineArray[lineArray.length - 1];
        const instruction = lineArray.length > 2 ? lineArray[1] : lineArray[0];
        if(reference === 'Start'){
            objectCodesArray.push('0000');
        } else if(instruction === 'WORD') {
            if(objectCodesArray[objectCodesArray.length - 1] === NO_OBJ_CODE){
                objectCodesArray1.push(Number(reference).toString(16));
            }else {
                objectCodesArray.push(Number(reference).toString(16));
            }
        } else if(instruction === 'RESW'){
            objectCodesArray.push(NO_OBJ_CODE);
        } else if(regex.test(reference)){
            const address = symbolTableArray.find((line)=> {
                if(reference.includes(line.inst)){
                    return line.address;
                }
            }).address

            if(objectCodesArray[objectCodesArray.length - 1] === NO_OBJ_CODE){
                objectCodesArray1.push(OP_CODES[instruction] + '8' + address.slice(1));
            }else {
                objectCodesArray.push(OP_CODES[instruction] + '8' + address.slice(1));
            }

        } else if(!regex.test(reference)){
            const address = symbolTableArray.find((line)=> {
                if(reference === (line.inst)){
                    return line.address;
                }
            })?.address

            if(objectCodesArray[objectCodesArray.length - 1] === NO_OBJ_CODE){
                objectCodesArray1.push(OP_CODES[instruction] + address);
            }else {
                objectCodesArray.push(OP_CODES[instruction] + address);
            }
        }
    })

    
    return [...objectCodesArray, ...objectCodesArray1];
  }

  function getSymbolTableArray(data, addresses){
    const symbolTableArray = [];
    data.split('\n').forEach((line, index) => {
        const lineArray = line.trim().split(/\s+/);
        (lineArray.length > 2) ? symbolTableArray.push({inst: lineArray[0], address: addresses[index]}) : null;
    });

    return symbolTableArray;
  }

  module.exports = { getObjectCode };