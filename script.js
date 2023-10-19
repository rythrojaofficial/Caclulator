const plus = '+';
const minus = '-';
const times = 'x';
const dividedBy = '÷'; 
const percent = '%';
const ops = /\+|-|x|÷/g;
const symbols = /\+|-|x|÷|%/g;
const pointReg = /\./g;
const zeroErrorMessage = `error: ÷ 0`;

// displays 
const inputDisplay = document.querySelector('#user-input-display');
const calculationDisplay = document.querySelector('#calculation-display');

// operations
let currentOperator;
let aExpression;
let bExpression;
let firstChar;

let thereIsSymbol;
let lastIsSymbol;
let thereIsPoint;
function lastIs(e){
    return (inputDisplay.innerText.slice(-1).match(e) || []).length;
} 
function matchWith(e){
    return (inputDisplay.innerText.match(e) || []).length
}

// numbers 

const oneButton = document.querySelector('#one');
    oneButton.addEventListener('click', () => addInput(1));
const twoButton = document.querySelector('#two');
    twoButton.addEventListener('click', () => addInput(2));
const threeButton = document.querySelector('#three');
    threeButton.addEventListener('click', () => addInput(3));
const fourButton = document.querySelector('#four');
    fourButton.addEventListener('click', () => addInput(4));
const fiveButton = document.querySelector('#five');
    fiveButton.addEventListener('click', () => addInput(5));
const sixButton = document.querySelector('#six');
    sixButton.addEventListener('click', () => addInput(6));
const sevenButton = document.querySelector('#seven');
    sevenButton.addEventListener('click', () => addInput(7));
const eightButton = document.querySelector('#eight');
    eightButton.addEventListener('click', () => addInput(8));
const nineButton = document.querySelector('#nine');
    nineButton.addEventListener('click', () => addInput(9));
const zeroButton = document.querySelector('#zero');
    zeroButton.addEventListener('click', () => addInput(0));

//other function buttons
const deleteButton = document.querySelector('#del');
    deleteButton.addEventListener('click', ()=> del(inputDisplay.innerText))
const percentButton = document.querySelector('#percent');
    percentButton.addEventListener('click', ()=> addInput(percent));
    
const clearButton = document.querySelector('#ac');
    clearButton.addEventListener('click', ()=> {
        inputDisplay.innerText = "";
        calculationDisplay.innerText = "";
        aExpression = undefined;
        bExpression = undefined;
        currentOperator = undefined;
    })
const equalsButton = document.querySelector('#equals');
    equalsButton.addEventListener('click', calculate);

const parenthesisButton = document.querySelector('#parenthesis');
const dotButton = document.querySelector('#dot');
    dotButton.addEventListener('click', () => {
        addInput('.')
    });

//main operation buttons
const divideButton = document.querySelector('#divide');
    divideButton.addEventListener('click', () => operation(dividedBy));
const multiplyButton = document.querySelector('#multiply');
    multiplyButton.addEventListener('click', () => operation(times));
const subtractButton = document.querySelector('#subtract');
    subtractButton.addEventListener('click', () => operation(minus));
const addButton = document.querySelector('#add');
    addButton.addEventListener('click', ()=> operation(plus));



// calculations 
function round(num){
    return Math.round(num*1000)/1000;
}

function sum(a, b){
    let theSum = Number(a) + Number(b);
    return round(theSum) 
}
function difference(a, b){
    let theDifference = Number(a) - Number(b);
    return round(theDifference);
}
function product (a,b){
    let theProduct = Number(a) * Number(b);
    return round(theProduct);
}
function quotient (a,b){
    if (b == 0) return zeroErrorMessage;
    
    else{ let theQuotient = Number(a) / Number(b);
        return round(theQuotient);
    }
}

function operation(e){
    // evaluate last function, if any 
    calculate(e);
    // reassign new operation if any 
    currentOperator = e;
    addInput(e);
        
}

function addInput(e) {
    // check for overflow or error 
    if(inputDisplay.innerText.length > 11 
        || inputDisplay.innerText.includes(zeroErrorMessage)) return;

    // special cases
    else if (e === percent) addPercent();
    else if (e === '.') addPoint();
    else if (inputDisplay.innerText === '0') inputDisplay.innerText = e;

    // normal cases: append input 
    else if (lastIs(percent) === 0) inputDisplay.innerText += e;
    
}
function addPercent(){
    // check if empty 
    if (inputDisplay.innerText === ''){
        // console.log('no expression');
    
    // check if not empty, and last is a symbol
    }else if (inputDisplay.innerText !== ''
        && lastIs(symbols)){
        // console.log ('not empty, last is a symbol')

    // check if not empty and last character is not a symbol
    }else if (inputDisplay.innerText !== ''
        && !lastIs(symbols)){
        inputDisplay.innerText += '%';
        // console.log('not empty, and last character is not symbol')
    }

}
function addPoint(){
    // check if empty 
    if (inputDisplay.innerText.length === 0){
        inputDisplay.innerText = '0.';

    // check no symbol, single point
    }else if(!matchWith(symbols)
        && matchWith(pointReg) === 1){
        return;
    
    // check single symbol, last is percent
    }else if(matchWith(symbols)
        && lastIs(percent)){
        return;

    // check single symbol, for last is operation
    }else if (matchWith(symbols) === 1 && lastIs(ops) === 1){
        inputDisplay.innerText += '0.';

    // check for symbol, last is not a symbol, and a single point
    }else if(matchWith(symbols) === 1
        && !lastIs(symbols)
        && matchWith(pointReg) === 1){
        inputDisplay.innerText += '.';
        
    // check for symbol, last is not a symbol, and two points
    }else if(matchWith(symbols)
        && !lastIs(ops)
        && matchWith(pointReg) === 2){
        return;

    }else{
        console.log(`matching . ${matchWith(pointReg)}`)
        inputDisplay.innerText += '.';        
    }
}

function calculate(){
    if (inputDisplay.innerText.includes(zeroErrorMessage)) return;
    if (inputDisplay.innerText.length < 1) return;
    
    assignExpressions(inputDisplay.innerText);
    // case of % with no operation 
    if (!matchWith(ops) && lastIs(percent)){
        let percentof = inputDisplay.innerText.slice(0,-1)
        inputDisplay.innerText = quotient(percentof, 100)

    }else if(currentOperator === minus){
            inputDisplay.innerText = difference(aExpression, bExpression);
            return;
    }else if (currentOperator === plus){
            inputDisplay.innerText = sum(aExpression,bExpression);
            return;
    }else if (currentOperator === dividedBy){
            inputDisplay.innerText = quotient(aExpression,bExpression);
            return;
    }else if (currentOperator === times){
            inputDisplay.innerText = product(aExpression,bExpression);
            return;
        }
    
}


function assignExpressions(fullExpression){

    let operatorPosition = [];
    // create an array that matches operators in the expresssion and maps their indexes 
    operatorPosition = [...fullExpression.matchAll(ops)].map(a => a.index);
    let firstChar = fullExpression.slice(0,1);

    
    //case of operation and last character is %
    if (matchWith(ops)
        && lastIs(percent)){
        aExpression = fullExpression.slice(0,operatorPosition[0]);
        bExpression = (fullExpression.slice(operatorPosition[0]+1, -1)) * 0.01;
        return
    }
    // case of only negative number, single operand
    if (operatorPosition[0] === 0  && operatorPosition.length === 1){
        aExpression = 0;
        bExpression = fullExpression.slice(operatorPosition[0]+1);
        currentOperator = firstChar;
        return;
    }
    // check for negative sign 
    if (operatorPosition[0] === 0  && operatorPosition.length > 1){
        aExpression = fullExpression.slice(0,operatorPosition[1]);
        bExpression = fullExpression.slice(operatorPosition[1]+1);
        return;
    }
    if (operatorPosition.length === 1){
        aExpression = fullExpression.slice(0,operatorPosition[0]);
        bExpression = fullExpression.slice(operatorPosition[0]+1);
        return;
    }
    // regular single operator evaluation  
    
}

//special operations
function del(string){
    if (inputDisplay.innerText.includes(zeroErrorMessage)) return;

    inputDisplay.innerText = string.slice(0, -1);
    return;
}


