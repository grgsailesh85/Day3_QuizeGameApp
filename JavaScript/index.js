const questions = [
  {
    question : "Which is the largest animal in the world?",
    answers : [
      {Text:"Shark", correct: false},
      {Text:"Blue Whale", correct: true},
      {Text:"Elephant", correct: false},
      {Text:"Giraffe", correct: false},
    ]
  },
  {
    question : "Which is the smallest country in the world?",
    answers : [
      {Text:"Vatican City", correct: true},
      {Text:"Bhutan", correct: false},
      {Text:"Nepal", correct: false},
      {Text:"Sri Lanka", correct: false},
    ]
  },
  {
    question : "Which is the largest desert in the world?",
    answers : [
      {Text:"Kalahari", correct: false},
      {Text:"Gobi", correct: false},
      {Text:"Sahara", correct: false},
      {Text:"Antarctica", correct: true},
    ]
  },
  {
    question : "Which is the smallest continent in the world?",
    answers : [
      {Text:"Asia", correct: false},
      {Text:"Australia", correct: true},
      {Text:"Arctic", correct: false},
      {Text:"Africa", correct: false},
    ]
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuize(){
  //keeps track of the index of the current question being displayed in the quize.
  currentQuestionIndex = 0;
  // keeps track of the users score in the quize
  score = 0;
  //updates the text displayed inside the "nextBUtton" elements to "Next", indicating to the user that clicking this button will take them to the next question in the quize
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // represents an array of answer objects associated with the current question and each answer object has a 'text' property containing the answer text and each answer is iterated over
  currentQuestion.answers.forEach(answer => {
    //creates a new button element
    const button = document.createElement("button");
    //sets the inner HTML content of the button to the answer text and display the answer text as the button label
    button.innerHTML = answer.Text;
    //adds the CSS class "btn" to the button element
    button.classList.add("btn");
    // appends newly created button element to an element referenced by "answerButton"
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  //hides the "Next" button by setting its 'diplay' CSS property to 'none'
  nextButton.style.display = "none";
  //runs as long as there are child elements in the 'answerButtons' container.
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
 function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score ++;
  } else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from (answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true ;
  });
  nextButton.style.display = "block";
 }
 function showScore(){
  resetState();
  questionElement.innerHTML = `You Score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display ="block";
 }



 function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex< questions.length){
    showQuestion();
  } else {
    showScore();
  }
 }





 nextButton.addEventListener("click",() =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuize();
  }
 });

 startQuize();
