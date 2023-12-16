let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("quiz-container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;


const quizArray = [
    {
        id: "0",
        question: "Which is the most widely spoken language in the world?",
        options: ["Spanish", "Mandarin", "English", "German"],
        correct: "Mandarin",
    },
    {
        id: "1",
        question: "What is the only planet that rotates on its side?",
        options: ["Earth", "Mars", "Uranus", "Neptune"],
        correct: "Uranus",
    },
    {
        id: "2",
        question: "Who invented Computer?",
        options: ["Charles Babbage", "Henry Sy", "Charles Coleman", "Henry Babbage"],
        correct: "Charles Babbage",
    },
    {
        id: "3",
        question: "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?",
        options: ["1st", "2nd", "3rd", "4th"],
        correct: "3rd",
    },
    {
        id: "4",
        question: "Jimmy's father has three sons- Paul I and Paul II. Can you guess the name of the third son?",
        options: ["Paul III", "Jennie", "Jimmy", "None"],
        correct: "Jimmy",
    },
    {
        id: "5",
        question: "A doctor gives you 3 pills and tells you take 1 every half an hour, how long would it be before the pills have been taken?",
        options: ["30 minutes", "45 minutes", "60 minutes" , "90 minutes"],
        correct: "60 minutes",
    }, {
        id: "6",
        question: "An old man was looking at a photograph of a young man. Somebody asked him who it was. The man's answer was the following: Brothers and sisters, I have none. But that man's father is my father's son. Who was in the photograph?",
        options: ["His cousin", "His nephew ", "His son", "His grandfather"],
        correct: "His son",
    },
    {
        id: "7",
        question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        options: ["The letter 'M'", "The number '1'", "The word 'Now'", "The letter 'E'"],
        correct: "The letter 'M'",
    },
    {
        id: "8",
        question: "The person who makes it, sells it. The person who buys it never uses it. What is it?",
        options: ["A pen", "A book", "A coffin", "A mirror"],
        correct: "A coffin",
    },
    {
        id: "9",
        question: "I'm not alive, but I can grow; I don't have lungs, but I need air. What am I?",
        options: ["Ice", "Fire", "Mold", "balloon"],
        correct: "balloon",
    },
];


restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});


nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 21;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        } 
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    // Hide all cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // Show the current card
    quizCards[questionCount].classList.remove("hide");
};


//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 21;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});


window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
