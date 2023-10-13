

// displays 
const inputDisplay = document.querySelector('#user-input-display');
const calculationDisplay = document.querySelector('#calculation-display');
const operators = '/+|-|x|÷/';


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
    deleteButton.addEventListener('click', ()=> del(inputDisplay.innerText))
const percentButton = document.querySelector('#percent');
    percentButton.addEventListener('click', percent);

//main operators
const divideButton = document.querySelector('#divide');
    divideButton.addEventListener('click', () => operation('÷'));
const multiplyButton = document.querySelector('#multiply');
    multiplyButton.addEventListener('click', () => operation('x'));
const subtractButton = document.querySelector('#subtract');
    subtractButton.addEventListener('click', () => operation('-'));
const addButton = document.querySelector('#add');
    addButton.addEventListener('click', ()=> operation('+'));


const parenthesisButton = document.querySelector('#parenthesis');
const dotButton = document.querySelector('#dot');
    dotButton.addEventListener('click', () => {
        if (!inputDisplay.innerText.includes('.'))
        addInput('.')
    });


const clearButton = document.querySelector('#ac');
    clearButton.addEventListener('click', ()=> {
        inputDisplay.innerText = "0";
        calculationDisplay.innerText = "";});
const equalsButton = document.querySelector('#equals');
    equalsButton.addEventListener('click', calculate);
        

// calculations 
function round2places(num){
    return Math.round(num*100)/100;
}

function sum(a, b){
    let theSum = Number(a) + Number(b);
    return round2places(theSum)
        
        
}
function difference(a, b){
    let theDifference = Number(a) - Number(b);
    return round2places(theDifference);
}

function product (a,b){
    let theProduct = Number(a) * Number(b);
    return round2places(theProduct);
}
function quotient (a,b){
    if (b == 0) return `ERROR, divide by zero`;
    else{ let theQuotient = Number(a) / Number(b);
        return round2places(theQuotient);
}
}
// operations
function operation(e){
    checkOperator(e);
    addInput(e);
}

function addInput(e) {
    if(inputDisplay.innerText.length > 25)
        console.log ('error');
    else{
        inputDisplay.innerText = `${inputDisplay.innerText}${e}`;
    }
}
    

function checkOperator(operation){
    if(inputDisplay.innerText.includes('+')){
        calculate(inputDisplay.innerText.includes(operation));
    }else if(inputDisplay.innerText.includes('-')){
        calculate(inputDisplay.innerText.includes(operation));
    }else if(inputDisplay.innerText.includes('x')){
        calculate(inputDisplay.innerText.includes(operation));
    }else if(inputDisplay.innerText.includes('÷')){
        calculate(inputDisplay.innerText.includes(operation));
    }
    }

function calculate(){
    if (inputDisplay.innerText.length < 1) {
        console.log('no expression');
        return};

    let aExpression;
    let bExpression;

    
            
        
    let expression = inputDisplay.innerText;

    if (expression.includes('x')){
        aExpression = expression.slice(0,expression.indexOf('x'));
        bExpression = expression.slice(expression.indexOf('x')+1);
        inputDisplay.innerText = product(aExpression,bExpression);
        return;
    }
    if (expression.includes('÷')){
        aExpression = expression.slice(0,expression.indexOf('÷'));
        bExpression = expression.slice(expression.indexOf('÷')+1);
        inputDisplay.innerText = quotient(aExpression,bExpression);
        return;
    }
    if (expression.includes('-') && expression.charAt(0) !== '-'){
        aExpression = expression.slice(0,expression.indexOf('-'));
        bExpression = expression.slice(expression.indexOf('-')+1);
        inputDisplay.innerText = difference(aExpression,bExpression);
        return;
    }
    
    if (expression.includes('+')){
        aExpression = expression.slice(0,expression.indexOf('+'));
        bExpression = expression.slice(expression.indexOf('+')+1);
        inputDisplay.innerText = sum(aExpression,bExpression);
        return;
    }
}

//special operations
function del(string){
    inputDisplay.innerText = string.slice(0, -1);
    return;
}
function percent(){
    if (inputDisplay.innerHTML !== ""
        && !inputDisplay.innerHTML.includes('/+|-|x|÷/')){
        addInput('÷100'); 
        }
         
    }






