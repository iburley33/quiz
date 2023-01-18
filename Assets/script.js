
var timeEl = document.querySelector(".timer-count");
var submitEl = document.querySelector("#initialSub");
var startBtn = document.querySelector("#startBtn");
var questionArea = document.querySelector(".questionArea");
var paragraph = document.querySelector('p');
var content = document.querySelector('#content');
var question = document.querySelector('.question');
var correctBtn = document.querySelector('.correct');
var initials = document.getElementById('initialEntry');
var saveBtn = document.querySelector("#saveBtn");
var highscoresBtn = document.querySelector(".highscores");
var scores = [];
var questions = [
    {
        quizQ: "Which of the following is calling a function?",
        answers: ['someFunction', 'someFunction()', 'someFunction[]', 'somFuntion{}'],
        correct: 'someFunction()',
    },
    {
        quizQ: "What is bootstrap",
        answers: ["css Framework", "pirate of the carribean", "shoe apparatus", "html Framework"],
        correct: "css Framework",
    },
    {
        quizQ: "What symbol designates an object",
        answers: ['{}','[]','()','<>'],
        correct: '{}',
    },
    {
        quizQ: "What designates an array?",
        answers: ["{}","[]","()","<>"],
        correct: "[]",
    },
    {
        quizQ: "What does Var stand for?",
        answers: ["Variant", "Varsity", "Variable", "Varmint"],
        correct: "Variable",
    },
    {
        quizQ: "How do you set up a flex box?",
        answers: ["display:flexbox","display:flex","flex-direction","display:flexible"],
        correct: "display:flex",
    },
    {
        quizQ: "How do you set up a response to clicking something?",
        answers: ["Event Listeners", "Computer Ears", "Clickbox", "Event Planners"],
        correct: "Event Listeners",
    },
    {
        quizQ: 'What data type is the following?: "10" ',
        answers: ["String", "Number", "Boolean", "Method"],
        correct: "String", 
    },
    {
        quizQ: 'What data type is the following?: 10 ',
        answers: ["String", "Number", "Boolean", "Method"],
        correct: "Number", 
    },
    {
        quizQ: 'What data type is the following?: true ',
        answers: ["String", "Number", "Boolean", "Method"],
        correct: "Boolean", 
    }
];

var pointsEarned = 0;
var secondsLeft = 60;

function hideBtn() {
    startBtn.style.visibility = "hidden";
};


function renderScores() {
    scores.push()
    questionArea.innerHTML = "";
  
    for (var i = 0; i < scores.length; i++) {
      var scoreX = scores[i];
  
      var li = document.createElement("li");
      li.textContent = scoreX;
      li.setAttribute("data-index", i);
  
      questionArea.appendChild(li);
    }
};

function logScores() {
    localStorage.setItem("playerScore", JSON.stringify(scores))
    console.log(scores);
};

function storeScores(event) {
    event.preventDefault();
    var newScore = {
        player: initialsText.value,
        score: pointsEarned,
    };
    scores.push(newScore);
    logScores();
};

var startTimer = function() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds";
        if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        gameOver();
        }
  }, 1000);
    hideBtn();
    startQuiz();
};

var gameOver = function() {
    questionArea.innerHTML =
        `<form action="/action_page.php">
            <label for="initials" id="initialsText">Enter your initials here:</label><br>
            <input type="text" id="initials" name="initials"><br>
            <input type="submit" class= submit.El id="initialSub" value="Submit you score!">
        </form> 
        <h5>Your Score</h5>`+ pointsEarned;
    secondsLeft = 1;

    questionArea.addEventListener("submit", storeScores());
};

var startQuiz = function() {
    var q1 = questions[0]
    content.innerHTML = `<h1>${q1.quizQ}</h1>
    <button>${q1.answers[0]}</button>
    <button>${q1.answers[1]}</button>
    <button>${q1.answers[2]}</button>
    <button>${q1.answers[3]}</button>
    `
};

var currentIndex = 0;

var nextQuestion = function() {
    currentIndex += 1; 
    if(currentIndex > questions.length-1){
        gameOver()
    } else {
    var currentQ = questions[currentIndex]
    content.innerHTML = `<h1>${currentQ.quizQ}</h1>
    <button>${currentQ.answers[0]}</button>
    <button>${currentQ.answers[1]}</button>
    <button>${currentQ.answers[2]}</button>
    <button>${currentQ.answers[3]}</button>
    `
    }
};

startBtn.addEventListener("click", startTimer);

function checkAnswer(event) {
    var clickedanswer = event.target;
    if(clickedanswer.innerText===questions[currentIndex].correct) {
        console.log("correct")
        pointsEarned += 10;
    }else {
        console.log("incorrect")
        secondsLeft -= 10
    };
    nextQuestion();
};

content.addEventListener("click", (e)=> checkAnswer(e));



highscoresBtn.addEventListener("click", function(event) {
        storeScores();
    });

// to solve
// Need to get the button on the gameOver page to function on click
// Need scores array to push objects from local storage