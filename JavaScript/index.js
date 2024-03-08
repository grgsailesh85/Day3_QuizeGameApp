//'questions' holds multiple objects, each representing q question, each question object contains the question text and an array of answer objects. Each answer object contains the answer text and a propert 'correct' indicating wheather the answer is correct('true') or incorrect('false')  
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



//'questionElement' , 'answerButtons' and 'nextButton' variable store references to HTML elements where questions , answer buttons and "Next" button will be displayed respectively
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
 

let currentQuestionIndex = 0;
let score = 0;


//this function is called when the quize starts or when the user chooses to restart the quize 
function startQuize(){
  //keeps track of the index of the current question being displayed in the quize.
  currentQuestionIndex = 0;
  // keeps track of the users score in the quize
  score = 0;
  //updates the text displayed inside the "nextBUtton" elements to "Next", indicating to the user that clicking this button will take them to the next question in the quize
  nextButton.innerHTML = "Next";
  showQuestion();
}



//resetState() function reset the quize state
//selects the current question object from the 'questions' array based on the 'currentQuestionIndex'
//updates the 'questionElemsnt' with the current question text
//iterates over the answer for the current question, creates answer button for each answer and appends them to the 'answerButtons' elements
//if an answer is correct, it sets a custom data attribute ('correct') on the button
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


//resets the state of the quize, hides the next button('nextButton') and removes all the child elements (answer buttons) from the 'answerButtons' elements
function resetState(){
  //hides the "Next" button by setting its 'diplay' CSS property to 'none'
  nextButton.style.display = "none";
  //runs as long as there are child elements in the 'answerButtons' container.
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}




//this function is called when a user selects an answer by clicking on an answer button
//it checks if the selected answer is correct based on the custom data attribute 'correct' of the button.
//it adds CSS classes('correct' or 'incorrrect') to the selected button to indicate correctness
//it disables all answer buttons and display the "Next" button
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



 //called to display the users score after completing the quize
 //resets the quize state, updates the "questionElement" with the users score and changes the text of the "Next" button to "Play Again".
 function showScore(){
  resetState();
  questionElement.innerHTML = `You Score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display ="block";
 }



 // this function is called when the next button is clicked 
 //it increments the 'currentQuestionIndex' to move to the next question
 function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex< questions.length){
    showQuestion();
  } else {
    showScore();
  }
 }



 //adds an event listener to the next button
 //when the next button is clicked, it checks if there are more questions remaining
 //if there are more question it calls handleNextButton(), otherwise it calls 'startQuize()' to restart the quize
 nextButton.addEventListener("click",() =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else {
    startQuize();
  }
 });

 //startQuize() function is called initially to start the quize when the page loads
 startQuize();
