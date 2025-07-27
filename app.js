/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const calculator = document.querySelector('#calculator');

/*-------------------------------- Variables --------------------------------*/
let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultDisplayed = false;
/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/
function updateDisplay(value) {
	display.textContent = value;
}

function clearDisplay() {
		firstNumber = '';
		secondNumber = '';
		operator = '';
		resultDisplayed = false;
		updateDisplay('');
}

function evaluate() {
		if (firstNumber && operator && secondNumber) {
			const num1 = parseFloat(firstNumber);
			const num2 = parseFloat(secondNumber);
			let result;

			if (operator === '+') {
				result = num1 + num2;
			} else if (operator === '-') {
				result = num1 - num2;
			} else if (operator === '*') {
				result = num1 * num2;
			} else if (operator === '/') {
				result = num1 / num2;
			}

			updateDisplay(result);
			firstNumber = result.toString();
			secondNumber = '';
			operator = '';
			resultDisplayed = true;
		}
}

/*----------------------------- Event Listeners -----------------------------*/
// buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     // This log is for testing purposes to verify we're getting the correct value
//     console.log(event.target.innerText);
//     // Future logic to capture the button's value would go here...
//   });
// });

calculator.addEventListener('click', (event) => {
	const clickedButton = event.target;
	const buttonValue = clickedButton.innerText;

	if (!clickedButton.classList.contains('button')) return;

	if (buttonValue === 'C') {
    clearDisplay();
		return;
	}

	if (buttonValue === '=') {
    evaluate();
		return;
	}

	if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
		if (firstNumber) {
			operator = buttonValue;
			updateDisplay(firstNumber + ' ' + operator);
		}
		return;
	}

	if (!operator) {
		if (resultDisplayed) {
			firstNumber = '';
			resultDisplayed = false;
		}
		firstNumber += buttonValue; // these are still strings
		updateDisplay(firstNumber);
	} else {
		secondNumber += buttonValue; // these are still strings
		updateDisplay(firstNumber + ' ' + operator + ' ' + secondNumber);
	}
});

