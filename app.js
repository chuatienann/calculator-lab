/*-------------------------------- Constants --------------------------------*/
const valuesToCalculate = [];           
const operatorsToCalculate = []; 
/*-------------------------------- Variables --------------------------------*/
let result = "";                      
let displayString = "";                 
let currentValue = ""; 
/*------------------------ Cached Element References ------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');
const displayDiv = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
    buttonText = event.target.innerText;

    switch(event.target.className) {
        case "button number":

            if (result){                
                result = null;          
                displayString = "";    
            } 

            if (currentValue !== null) {
                currentValue = Number(currentValue.toString() + buttonText);
            }       
            
            else {
                currentValue = Number(buttonText);
            }                          

            displayString += buttonText; 
            showDisplay();
            break;

        case "button equals":
            finaliseCurrentValue();
                if (valuesToCalculate.length !== operatorsToCalculate.length+1) {
                    error();
                    return;
                } else {
                    displayString = "";
                    calculate();
                    result = valuesToCalculate[0];
                    currentValue = null;
                    showResult();
                    valuesToCalculate.length = 0;
                    operatorsToCalculate.length = 0;
                    return;
                }
            
            break;

        case "button operator":

            switch(buttonText) {
                case "C":
                    finaliseCurrentValue();
                    clear();
                    break;
                
                default: 
                    finaliseCurrentValue();
                    displayString += buttonText;
                    showDisplay();
                    operatorsToCalculate.push(buttonText);
            }
            break;
    }
  });
});

/*-------------------------------- Functions --------------------------------*/
function showDisplay() {
    displayDiv.textContent = displayString;
}

function clear() {
    currentValue = null;
    result = null;
    displayString = "";
    valuesToCalculate.length = 0;
    operatorsToCalculate.length = 0;

    displayDiv.textContent = "C";
    setTimeout(() => {
        displayDiv.textContent = "";
    }, 1000);
}


function calculate() {

    while (operatorsToCalculate.length !== 0) {

        operatorsToCalculate.forEach((operator, index) => {
            if (operator === "/") {
                valuesToCalculate.splice(index, 2, valuesToCalculate[index]/valuesToCalculate[index+1]);
                operatorsToCalculate.splice(index, 1);
            } 
            if (operator === "*") {
                valuesToCalculate.splice(index, 2, valuesToCalculate[index]*valuesToCalculate[index+1]);
                operatorsToCalculate.splice(index, 1);
            } 
                
        });

        if (!operatorsToCalculate.some((operator) => {return operator === "/" || operator === "*";})) {
            operatorsToCalculate.forEach((operator, index) => {
                if (operator === "+") {
                    valuesToCalculate.splice(index, 2, valuesToCalculate[index]+valuesToCalculate[index+1]);
                    operatorsToCalculate.splice(index, 1);
                } 
                if (operator === "-") {
                    valuesToCalculate.splice(index, 2, valuesToCalculate[index]-valuesToCalculate[index+1]);
                    operatorsToCalculate.splice(index, 1);
                }
            });
        }
    }
}

function finaliseCurrentValue() { 
    if (result === null) {
        if (currentValue !== null) {
            valuesToCalculate.push(currentValue);
            currentValue = null;
        } else if (valuesToCalculate.length === 0) {
            valuesToCalculate.push(0) 
        }
    } else {
        valuesToCalculate.push(result);
        result = null;
    }
}

function showResult() {
    displayDiv.textContent = result.toString();
    displayString = result.toString();
}

function error() {
    clear()
    displayDiv.textContent = "error";
}

