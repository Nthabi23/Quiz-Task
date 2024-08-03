let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let answerMessage = document.getElementById("answer-message");
let questionCount;
let scoreCount = 0;

const quizArray = [
    {
        id: "1",
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: "Hyper Text Markup Language"
      },
      {
        id: "2",
        question: "How do you add a background color in HTML?",
        options: ["body style='background-color:yellow;", "background='yellow'", "body bg='yellow'", "body style='color:yellow;'"],
        correct: "body style='background-color:yellow;"
      },
      {
        id: "3",
        question: "What does the term 'DOM' stand for in JavaScript?",
        options: ["Document Object Model", "Data Object Model", "Display Object Management", "Document Oriented Model"],
        correct: "Document Object Model"
      },
      {
        id: "4",
        question: "Which property is used to change the background color in CSS?",
        options: ["color", "background-color", "bgcolor"],
        correct: "background-color"
      },
      {
        id: "5",
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
        correct: "Cascading Style Sheets"
      },
      {
        id: "6",
        question: "Which CSS property is used to change the text color?",
        options: ["text-color", "color", "font-color", "text-style"],
        correct: "color"
      },
      {
        id: "7",
        question: "In JavaScript, what is a function?",
        options: ["A block of code designed to perform a particular task", "A variable that stores a value", "A type of loop", "A way to style an element"],
        correct: "A block of code designed to perform a particular task"
      },
      {
        id: "8",
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction() {}", "def myFunction() {}", "function:myFunction() {}", "func myFunction() {}"],
        correct: "function myFunction() {}"
      },
      {
        id: "9",
        question: "What does the HTML <a> tag define?",
        options: ["A link", "A paragraph", "An image", "A table"],
        correct: "A link"
      },
      {
        id: "10",
        question: "In JavaScript, how do you declare a variable?",
        options: ["var x;", "v x;", "variable x;", "let x;"],
        correct: "var x;"
      },
      {
        id: "11",
        question: "Which attribute specifies the URL of an image in HTML?",
        options: ["src", "href", "link"],
        correct: "src"
      },
      {
        id: "12",
        question: "What does the 'alt' attribute provide for an image tag in HTML?",
        options: ["A tooltip", "Alternate text if the image fails to load", "A link to another page"],
        correct: "Alternate text if the image fails to load"
      },
      {
        id: "13",
        question: "In JavaScript, what is used to store multiple values in a single variable?",
        options: ["Object", "Array", "String", "Function"],
        correct: "Array"
      },
      {
        id: "14",
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size"],
        correct: "font-size"
      },
      {
        id: "15",
        question: "How do you write 'Hello, World!' in an alert box in JavaScript?",
        options: ["msg('Hello, World!');", "alert('Hello, World!');", "alertBox('Hello, World!');"],
        correct: "alert('Hello, World!');"
      }
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            let message = scoreCount >= 7 ? 'Well done!' : 'You can do better.';
            userScore.innerHTML =  + scoreCount + " out of " + questionCount + ".<br> " + message ;
        } else {
            countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
            answerMessage.innerHTML = "";
            quizDisplay(questionCount);
        }
    
    })
);

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
        answerMessage.innerHTML = "Correct!"; 
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
        answerMessage.innerHTML = "Incorrect!";
    }

    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    answerMessage.innerHTML = "";
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