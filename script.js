

// displays 
const inputDisplay = document.querySelector('#user-input-display');
const calculationDisplay = document.querySelector('#calculation-display');



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

//operators
const deleteButton = document.querySelector('#del');
const percentButton = document.querySelector('#percent');
const divideButton = document.querySelector('#divide');
    divideButton.addEventListener('click', () => addInput('÷'));
const multiplyButton = document.querySelector('#multiply');
    multiplyButton.addEventListener('click', () => addInput('x'));
const subtractButton = document.querySelector('#subtract');
    subtractButton.addEventListener('click', () => addInput('-'));
const addButton = document.querySelector('#add');
    addButton.addEventListener('click', () => addInput('+'));
const parenthesisButton = document.querySelector('#parenthesis');
const dotButton = document.querySelector('#dot');
    dotButton.addEventListener('click', () => addInput('.'));
const clearButton = document.querySelector('#ac');
    clearButton.addEventListener('click', ()=> inputDisplay.innerText = "")
const equalsButton = document.querySelector('#equals');
    equalsButton.addEventListener('click', calculate);
        





function addInput(e) {
    if(inputDisplay.innerText.length > 25)
        console.log ('error');
    else{
        inputDisplay.innerText = `${inputDisplay.innerText}${e}`;
    console.log(inputDisplay);
    }

    
}


// calculations 
function sum(a, b){
    return Number(a) + Number(b);
}
function difference(a, b){
    return Number(a) - Number(b);
}

function product (a,b){
    return Number(a) * Number(b);
}
function quotient (a,b){
    if (b === 0) return 'ERROR, cannot divide by 0';
    else{ return Number(a) / Number(b)};
}
// operations
function calculate(){
    if (inputDisplay.innerText.length < 1) {
        console.log('no expression');
        return};
            
        let expression = inputDisplay.innerText;

    if (expression.includes('x')){
        let aExpression = expression.slice(0,expression.indexOf('x'));
        let bExpression = expression.slice(expression.indexOf('x')+1);
        calculationDisplay.innerText = product(aExpression,bExpression);
        return;
    }
    if (expression.includes('÷')){
        let aExpression = expression.slice(0,expression.indexOf('÷'));
        let bExpression = expression.slice(expression.indexOf('÷')+1);
        calculationDisplay.innerText = quotient(aExpression,bExpression);
        return;
    }
    if (expression.includes('-')){
        let aExpression = expression.slice(0,expression.indexOf('-'));
        let bExpression = expression.slice(expression.indexOf('-')+1);
        calculationDisplay.innerText = difference(aExpression,bExpression);
        return;
    }
    if (expression.includes('+')){
        let aExpression = expression.slice(0,expression.indexOf('+'));
        let bExpression = expression.slice(expression.indexOf('+')+1);
        calculationDisplay.innerText = sum(aExpression,bExpression);
        return;
    }
}
