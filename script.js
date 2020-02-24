'use strict';

const quizQuestions = [
	{
	question: 'Which stock car goes fastest in a 1/4 mile straight?',
	answers: [
		'Porsche gt3', 'Honda Civic', 'Toyota Corolla', 'Pruis'
		],
	correctAnswer: 'Porsche gt3'
	},
	{
	question: 'How many Wheels are on the average car? ',
	answers: [
		'2', '5', '4', '1'
		],
	correctAnswer: '4'
	},
	{
	question: 'Which type of transportation would be ideal for an 8 hour drive?',
	answers: [
		'Motorcycle','Tricycle','Roller Skates','Minivan'
		],
	correctAnswer: 'Minivan'
	},
	{
	question: 'What is the fastest production electric Vehicle?',
	answers: [
		'Toyota Pruis', 'Nissan Leaf', 'Tesla Roadster', 'Chevy Volt'
		],
	correctAnswer: 'Tesla Roadster'
	},
	{
	question: 'Which car would be fastest in an off road race?',
	answers: [
		'Lexus G350', 'Trophey Truck', 'Audi A4', 'Toyota Pruis' 
		],
	correctAnswer: 'Trophy Truck'
	},

];

let questionIndex = 0;
let answersCorrect = 0;
let answersIncorrect = 0;


// start button to begin the quiz and render questions
function startClick(){
	$('#start-button').on('click', event => {
		event.preventDefault();
		renderQuestions();
	});
}

//displays questions after startClick toggled
function renderQuestions(){
		const questionNumber = parseInt([questionIndex]) + 1;
		const quizForm = `
			<div class='question-box'>
				<p class='question-number'>Question ${questionNumber} of ${quizQuestions.length}</p>
				<form>
					<p class='question'>${quizQuestions[questionIndex].question}</p>
					<button class='answer' value='${quizQuestions[questionIndex].answers[0]}'>${quizQuestions[questionIndex].answers[0]}</button>
	        		<button class='answer' value='${quizQuestions[questionIndex].answers[1]}'>${quizQuestions[questionIndex].answers[1]}</button>
	        		<button class='answer' value='${quizQuestions[questionIndex].answers[2]}'>${quizQuestions[questionIndex].answers[2]}</button>
	        		<button class='answer' value='${quizQuestions[questionIndex].answers[3]}'>${quizQuestions[questionIndex].answers[3]}</button>
				</form>
				<p class='current-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
			</div>
			`;		
		$('body').html(quizForm);
	}

// checks reasult of answer clicked 
function answerClick(){
	$('body').on('click', '.answer', event => {
		event.preventDefault();
		let answerButton = event.target.value;
		if (answerButton == quizQuestions[questionIndex].correctAnswer) {
			answersCorrect ++;
			correctFeedBack();
			progressButton();
			}
		else {
			answersIncorrect ++;
			incorrectFeedBack();
			progressButton();
			}
			
		});
}

// displays result of the answerClick
function correctFeedBack(){
	const feedback = `
		<div class='feedback'>
			<p class='feedback-text'>Correct!</p>
			<p class='feedback-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
		</div>
		`;
		$('body').html(feedback);
}

// displays what was inccorect about answerClick
function incorrectFeedBack(){
	const feedback = `
		<div class='feedback'>
			<p class='feedback-text'>Incorrect! The correct answer is "${quizQuestions[questionIndex].correctAnswer}"</p>
			<p class='feedback-score'>You have ${answersCorrect} correct and ${answersIncorrect} incorrect.</p>
		</div>
		`;
		$('body').html(feedback);
}

//displays progress/ amount of right and wrong answers 
function progressButton(){
	if (questionIndex + 1 < quizQuestions.length) {
		$('.feedback').append(`
			<button class='next-question'>Next Question</button>
		`);
	}
	else {
		$('.feedback').append(`
			<button class='final-score'>See Final Score</button>
		`);
	}
}

// renders next question
function progressClick(){
	$('body').on('click', '.next-question', event => {
		event.preventDefault();
		questionIndex ++;
		renderQuestions();
	});
	$('body').on('click', '.final-score', event => {
		event.preventDefault();
		questionIndex ++;
		renderEndScreen();
	});
}

// displays final outcome of quiz 
function renderEndScreen(){
	const endScreen = `
		<div class='end-screen'>     		
			<p class='end-score'>You got ${answersCorrect} out of ${quizQuestions.length} correct!</p>
      		<button class='play-again'>Play Again</button>
    	</div>
    `;
    $('body').html(endScreen);
}


// restart quiz
function playAgainClick(){
	$('body').on('click', '.play-again', event => {
		event.preventDefault();
		questionIndex = 0;
		answersCorrect = 0;
		answersIncorrect = 0;
		renderQuestions();
	});	
}

function handleQuiz(){
	startClick();
	answerClick();
	progressClick();
	playAgainClick();
}

$(handleQuiz);