var timeEl = document.querySelector(".timer-count");
var startBtn = document.querySelector("#startBtn");
var questionArea = document.querySelector(".questionArea");
var paragraph = document.querySelector('p');
var content = document.querySelector('#content');
var question = document.querySelector('.question');
var correctBtn = document.querySelector('.correct');
var initials;
var saveBtn = document.querySelector("#saveBtn");
var highscoresBtn = document.querySelector(".highscores");
var pastScores = JSON.parse(localStorage.getItem('playerScore'));
var questions = [
    {
        quizQ: "Which of the following is calling a function?",
        answers: ['someFunction', 'someFunction()', 'someFunction[]', 'somFuntion{}'],
        correct: 'someFunction()',
    },
    {
        quizQ: "What is bootstrap?",
        answers: ["css Framework", "pirate of the carribean", "shoe apparatus", "html Framework"],
        correct: "css Framework",
    },
    {
        quizQ: "What symbol designates an object?",
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
    startBtn.style.display = "none";
};
function hideSave() {
    saveBtn.style.display = "none";
};
function getValues(event) {
    event.preventDefault()
    var n = document.forms[scoreForm][initials].value;
    alert(n);
};
function renderScores() {
    content.innerHTML = "<h1>High Scores</h1>";
  
    for (var i = 0; i < pastScores.length; i++) {
      var scoreX = pastScores[i];

      var div = document.createElement("div");
      div.setAttribute("class", "container");
      content.appendChild(div);

      var pTag1 = document.createElement("p");
      pTag1.textContent = scoreX.player;
      var pTag2 = document.createElement("p");
      pTag2.textContent = scoreX.score;


      div.appendChild(pTag1);
      div.appendChild(pTag2);

      hideBtn();
      hideSave();
    }
};

function saveScores(event) {
    event.preventDefault();
    console.log(initials);
    console.log(pastScores);
    var newScore = {
        player: initials.value,
        score: pointsEarned,
    };
    console.log(newScore);
    pastScores.push(newScore);
    localStorage.setItem("playerScore", JSON.stringify(pastScores));
    renderScores();
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
    content.innerHTML =
        `<form name="scoreForm">
            <label for="initials" id="initialsText">Enter your initials here:</label><br>
            <input type="text" id="initials" name="initials"><br>
            
        </form> 
        <h5>Your Score</h5>`+ pointsEarned;
    initials = document.getElementById('initials');
    secondsLeft = 1;
    saveBtn.style.display="block";
    document.addEventListener("submit", saveScores)
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
    if(clickedanswer.tagName==="BUTTON" && clickedanswer.innerText===questions[currentIndex].correct && currentIndex <= 10) {
        pointsEarned += 10;
        nextQuestion();
    }else if(clickedanswer.tagName==="BUTTON" && clickedanswer.innerText!==questions[currentIndex].correct && currentIndex <= 10) {
        secondsLeft -= 10;
        nextQuestion();
    };
};

content.addEventListener("click", (e)=> checkAnswer(e));

saveBtn.addEventListener("click", (e)=> saveScores(e));

highscoresBtn.addEventListener("click", function(event) {
        renderScores();
    });

// to solve
// Need to get the button on the gameOver page to function on click
// Need scores array to push objects from local storage
// Any div click running checkAnswer
