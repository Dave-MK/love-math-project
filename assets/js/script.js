// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
	let buttons = document.getElementsByTagName("button");

	for (let button of buttons) {
		button.addEventListener("click", function () {
			if (this.getAttribute("data-type") === "submit") {
				checkAnswer();
			} else {
				let gameType = this.getAttribute("data-type");
				runGame(gameType);
			}
		})
	}
	document.getElementById("answer-box").addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			checkAnswer();
		}
	})



	runGame("addition");
})

/**
 * The main game loop, which will run when the game starts
 */
function runGame(gameType) {
	document.getElementById("answer-box").value = "";
	document.getElementById("answer-box").focus();


	// The random numbers should be between 1 and 25
	let num1 = Math.floor(Math.random() * 25) + 1;
	let num2 = Math.floor(Math.pow(Math.random(), num1) * 25) + 1;


	if (gameType === "addition") {
		displayAdditionQuestion(num1, num2);
	} else if (gameType === "subtract") {
		displaySubtractQuestion(num1, num2);
	} else if (gameType === "multiply") {
		displayMultiplyQuestion(num1, num2);
	} else if (gameType === "division") {
		displayDivisionQuestion(num1, num2);
	} else {
		alert(`Unknown game type: ${gameType}`);
		throw `Unknown game type: ${gameType}. Aborting!`;
	}
}

/**
 * Checks the user answer agaianst the first item in the array returned by calculateCorrectAnswer
 */
function checkAnswer() {
	let userAnswer = parseInt(document.getElementById("answer-box").value);
	let calculateAnswer = calculateCorrectAnswer();
	let isCorrect = userAnswer === calculateAnswer[0];

	if (isCorrect) {
		alert("Correct!");
		incrementScore();
	} else {
		alert(`Wrong! The correct answer is ${calculateAnswer[0]}`);
		incrementWrongAnswer();
	}

	runGame(calculateAnswer[1]);

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
	} else if (operator === "-") {
		return [operand1 - operand2, "subtract"];
	} else if (operator === "x") {
		return [operand1 * operand2, "multiply"];
	} else if (operator === "/") {
		return [operand1 / operand2, "division"];
	} else {
		alert(`Unknown operator: ${operator}`);
		throw `Unknown operator: ${operator}. Aborting!`;
	}
}

/**
 * Reads old correct score and updates it with the new score if answer is correct
 */
function incrementScore() {
	let oldScore = parseInt(document.getElementById("score").innerText);
	document.getElementById("score").innerText = ++oldScore;
}

/**
 * Reads old incorrect score and updates it with the new score if answer is incorrect
 */
function incrementWrongAnswer() {
	let oldScore = parseInt(document.getElementById("incorrect").innerText);
	document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
	document.getElementById("operand1").textContent = operand1;
	document.getElementById("operand2").textContent = operand2;
	document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
	document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
	document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
	document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
	document.getElementById("operand1").textContent = operand1;
	document.getElementById("operand2").textContent = operand2;
	document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
	document.getElementById("operand1").textContent = operand1 > operand2 && operand1 % operand2 === 0 ? operand1 : operand1;
	document.getElementById("operand2").textContent = operand1 > operand2 && operand1 % operand2 === 0 ? operand2 : operand1;
	document.getElementById("operator").textContent = "/";
}