

// displays 
const inputDisplay = document.querySelector('#user-input-display');
const calculationDisplay = document.querySelector('#calculation-display');

// operations
let currentOperator;
let aExpression;
let bExpression;
let firstChar;


const plus = '+';
const minus = '-';
const times = 'x';
const dividedBy = '÷'; 
// const ops = '[/+]|x|-|÷';
const ops = /\+|-|x|÷/g;
const opArraytions = ['+', '-', 'x', '÷'];
const zeroErrorMessage = `ERROR, divide by zero`;


  
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
    percentButton.addEventListener('click', ()=> operation('%'));
    
const clearButton = document.querySelector('#ac');
    clearButton.addEventListener('click', ()=> {
        inputDisplay.innerText = "";
        calculationDisplay.innerText = "";
        aExpression = 0;
        bExpression = 0;
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
    if (b === '0') return zeroErrorMessage;
    
    else{ let theQuotient = Number(a) / Number(b);
        return round(theQuotient);
}
}


function operation(e){
    // evaluate last function, if any 
    calculate();
    // reassign new operation if any 
    currentOperator = e;
    addInput(e);
}

function addInput(e) {
    if(inputDisplay.innerText.length > 25)
        console.log ('error');
    
    // if (e === '%' 
    //     && (inputDisplay.innerHTML !== ""
    //     || !inputDisplay.innerHTML.includes('/+|-|x|÷|%/'))
    //     ){
    //         console.log(inputDisplay.innerText);
    //         console.log(bExpression);
    //     return;
    // }

    // Check for zero 
    // check for dot
    if(e === '.'){
        addPoint();
        return;
    }
    if(inputDisplay.innerText === '0'){
        inputDisplay.innerText = e;
        return;
    }
    // append selected input 
    else{
        inputDisplay.innerText += e;
        return;
    }
}

function addPoint(){
    let thereIsSymbol = (inputDisplay.innerText.match(ops) || []).length;
    let lastIsSymbol = (inputDisplay.innerText.slice(-1).match(ops) || []).length;
    let thereIsPoint = (inputDisplay.innerText.match(/\./g) || []).length;
    // check if empty 
    if (inputDisplay.innerText.length === 0){
        inputDisplay.innerText = '0.';
        console.log('empty')
        return;

    // check no symbol, single point
    }else if(thereIsSymbol === 0
        && thereIsPoint > 0 && thereIsPoint < 2){
        console.log('no symbol, single point')
        return;
    
    // check for symbol, last is a symbol, and a single point 
    }else if (thereIsSymbol === 1
        && lastIsSymbol === 1
        && thereIsPoint > 0 && thereIsPoint < 2){
        inputDisplay.innerText += '0.';
        console.log('symbol, last is symbol, single point')
        return;
    // check for symbol, last is not a symbol, and a single point
    }else if(thereIsSymbol === 1
        && lastIsSymbol === 0
        && thereIsPoint > 0 && thereIsPoint < 2){
        inputDisplay.innerText += '.';
        console.log('symbol, last is not symbol, single point')
    // check for symbol, last is not a symbol, and two points
    }else if(thereIsSymbol === 1
        && lastIsSymbol === 0
        && thereIsPoint === 2){
        console.log('symbol, last not symbol, 2 points')
        return;
    }else {
        inputDisplay.innerText += '.';
        console.log('else we add .')
    } 
} 
    

function calculate(){
    const operatorPosition = [];
    if (inputDisplay.innerText.length < 1) {
        return};
    
    if (currentOperator ==='%'
        && (inputDisplay.innerHTML !== ""
        || !inputDisplay.innerHTML.includes('/+|-|x|÷|%/'))){

        return;
    }
    if (currentOperator === '%'){
            inputDisplay.innerText = product(inputDisplay.innerText.slice(0,-1), 0.01);
            return;
        }
    assignExpressions(inputDisplay.innerText);
    
    if (currentOperator === minus){
        inputDisplay.innerText = difference(aExpression, bExpression);
        return;
    }
    if (currentOperator === plus){
        inputDisplay.innerText = sum(aExpression,bExpression);
        return;
    }
    if (currentOperator === dividedBy){
        inputDisplay.innerText = quotient(aExpression,bExpression);
        return;
    }
    if (currentOperator === times){
        inputDisplay.innerText = product(aExpression,bExpression);
        return;
    }
    
}

function assignExpressions(fullExpression){
    // create an array that matches operators in the expresssion and maps their indexes 
    operatorPosition = [...fullExpression.matchAll(ops)].map(a => a.index);
    let firstChar = fullExpression.slice(0,1);

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
    inputDisplay.innerText = string.slice(0, -1);
    return;
}

