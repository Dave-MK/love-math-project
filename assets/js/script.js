// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
	let buttons = document.getElementsByTagName("button");

	for (let button of buttons) {
		button.addEventListener("click", function () {
			if (this.getAttribute("data-type") === "submit") {
				alert("You clicked submit!");
			} else {
				let gameType = this.getAttribute("data-type");
				runGame(gameType);
			}
		})
	}

	runGame("addition");
})

/**
 * The main game loop, which will run when the game starts
 */
function runGame(gameType) {

	// The random numbers should be between 1 and 25
	let num1 = Math.floor(Math.random() * 25) + 1;
	let num2 = Math.floor(Math.random() * 25) + 1;

	if (gameType === "addition") {
		displayAdditionQuestion(num1, num2);
	} else {
		alert(`Unknown game type: ${gameType}`);
		throw `Unknown game type: ${gameType}. Aborting!`;
	}
}

function checkAnswer() {

}

/**
 * Fetches the operands and operator for the question from the DOM
 * Checks the answer against the value in the user's answer box for correctness
 */
function calculateCorrectAnswer() {
	let operand1 = parseInt(document.getElementById("operand1").textContent);
	let operand2 = parseInt(document.getElementById("operand2").textContent);
	let operator = document.getElementById("operator").textContent;

	let correctAnswer = 0;

	if (operator === "+") {
		return [operand1 + operand2, "addition"];
	} else {
		alert(`Unknown operator: ${operator}`);
		throw `Unknown operator: ${operator}. Aborting!`;
	}

	function incrementScore() {

	}

	function incrementWrongAnswer() {

	}

	function displayAdditionQuestion(operand1, operand2) {
		document.getElementById("operand1").textContent = operand1;
		document.getElementById("operand2").textContent = operand2;
		document.getElementById("operator").textContent = "+";
	}

	function displaySubtractQuestion() {

	}

	function displayMultiplyQuestion() {

	}

	function displayDivisionQuestion() {

	}