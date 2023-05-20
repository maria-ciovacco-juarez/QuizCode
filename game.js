const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEl = document.querySelector("#timer");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is an Array?",
    choice1: 'A step-by-step method to prove or solve a problem or complete a task',
    choice2: 'A collection of similar data elements stored at contiguous memory locations',
    choice3: 'A start tag or an end tag',
    answer: 2
  },
  {
    question: "What is CSS?",
    choice1: 'The language used to style a webpage',
    choice2: 'An attribute used to specify a unique id for an HTML element',
    choice3: 'A selector and declaration block',
    answer: 1,
  },
  {
    question: "What is a Variable?",
    choice1: 'Performs arithmetic operators perform arithmetic on numbers',
    choice2: 'A block of code designed to perform a particular task',
    choice3: 'A container for storing data',
    answer: 3,
  },
{
  question: 'Inside which HTML element do we put the javascript?', 
  choice1: '<body>', 
  choice2:  '<h1>',  
  choice3: '<script>',  
  answer: 1,
},
];

const scorePoints = 100;
const maxQuestions = 4;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(scorePoints);
    } else {
      timeleft -= 5; // Penalize 5 seconds for incorrect answer
      if (timeleft < 0) {
        timeleft = 0; // Ensure the timer does not go negative
      }
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

// Start time at 30 seconds.
let timeleft = 30;
let timerCheck;

const setTime = () => {
  timerEl.innerText = timeleft;

  timerCheck = setInterval(() => {
    timeleft--;

    if (timeleft >= 0) {
      timerEl.innerText = timeleft;
    } else {
      showScore();
      timerEl.innerText = 0;
      clearInterval(timerCheck);
    }
  }, 1000);
};

startGame();
setTime();
