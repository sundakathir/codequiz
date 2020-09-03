//Arrey of Questions

var arrOfQuestions = [
  {
      question: "Which of the following tag is used to mark a begining of paragraph ?",
      choices: ["<TD>", "<br>", "<P>", "<TR>"],
      answer: "<P>"
  },
  {
      question: "From which tag descriptive list starts ?",
      choices: ["<LL>", "<DD>", "<DL>", "<DS>"],
      answer: "<DL>"
  },
  {
      question: "Correct HTML tag for the largest heading is",
      choices: ["<head>", "<h6>", "<heading>", "<h1>"],
      answer: "<h1>"
  },
  {
      question: "Which of the following attributes of text box control allow to limit the maximum character?",
      choices: ["size", "len", "maxlength", "all of these"],
      answer: "maxlength"
  },
  {
      question: "The attribute of <form> tag:",
      choices: ["Method", "Action", "Method and Action", "None"],
      answer: "Method and Action"
  },

];
// Declared variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");

// Seconds left is 15 seconds per question: 5 *15  =75
var secondsLeft = 75;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new ul element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
   if (holdInterval === 0) {
      holdInterval = setInterval(function () {
          secondsLeft--;
          currentTime.textContent = "Time: " + secondsLeft;

          if (secondsLeft <= 0) {
              clearInterval(holdInterval);
              Completed();
              currentTime.textContent = "Time's up!";
          }
      }, 1000);
  }
  render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
  // Clears existing data 
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  // For loops to loop through all info in array
  for (var i = 0; i < arrOfQuestions.length; i++) {
      // Appends question title only
      var userQuestion = arrOfQuestions[questionIndex].question;
      var userChoices = arrOfQuestions[questionIndex].choices;
      questionsDiv.textContent = userQuestion;
  }
  // New for each for question choices
  userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsDiv.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", (compare));
  })
}
// Event to compare choices with answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {

      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // Correct condition 
      if (element.textContent == arrOfQuestions[questionIndex].answer) {
          score++;
          createDiv.textContent = "It is Correct! The answer is:  " + arrOfQuestions[questionIndex].answer;
          // Correct condition 
      } else {
          // Will deduct -5 seconds off secondsLeft for wrong answers
          secondsLeft = secondsLeft - penalty;
          createDiv.textContent = "Your selection is Wrong! The correct answer is:  " + arrOfQuestions[questionIndex].answer;
      }

  }
  // Question Index determines number question user is on
  questionIndex++;

  if (questionIndex >= arrOfQuestions.length) {
      // All done will append last page with user stats
      Completed();
      createDiv.textContent = "Completed ." + "  " + "You have  selected" + " " + score +" " + "out of" +" " + arrOfQuestions.length +" "+ " Correct answers";
  } else {
      render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);

}
// All done will append last page
function Completed() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  // Heading:
  var createH3 = document.createElement("h3");
  createH3.setAttribute("id", "createH3");
  createH3.textContent = "All questions are answered!"

  questionsDiv.appendChild(createH3);

  // Paragraph
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  // Calculates time remaining and replaces it with score
  if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      createP.textContent = "Your total score is: " + timeRemaining;

      questionsDiv.appendChild(createP2);
  }

  // Label
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsDiv.appendChild(createLabel);

  // input
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsDiv.appendChild(createInput);

  // submit
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "button");
  createSubmit.setAttribute("class", "btn btn-secondary");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsDiv.appendChild(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
      var initials = createInput.value;

      if (initials === null) {

          console.log("No value entered!");

      } else {
          var finalScore = {
              initials: initials,
              score: timeRemaining
          }
          console.log(finalScore);
          var allScores = localStorage.getItem("allScores");
          if (allScores === null) {
              allScores = [];
          } else {
              allScores = JSON.parse(allScores);
          }
          allScores.push(finalScore);
          var newScore = JSON.stringify(allScores);
          localStorage.setItem("allScores", newScore);
          window.location.replace("HighScores.html");
      }
  });

}
