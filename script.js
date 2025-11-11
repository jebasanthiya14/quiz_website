
const questions = {
    football: [
        {
            question: "Which country won the 2018 FIFA World Cup?",
            options: ["Brazil", "Germany", "France", "Argentina"],
            answer: "France"
        },
        {
            question: "Who is the all-time top scorer in the UEFA Champions League?",
            options: ["Lionel Messi", "Cristiano Ronaldo", "Robert Lewandowski", "Raul"],
            answer: "Cristiano Ronaldo"
        },
        {
            question: "Which club has won the most Champions League titles?",
            options: ["Barcelona", "Bayern Munich", "Real Madrid", "AC Milan"],
            answer: "Real Madrid"
        },
        {
            question: "Who is the only player to win the World Cup as both player and manager?",
            options: ["Franz Beckenbauer", "Didier Deschamps", "Mario Zagallo", "Zinedine Zidane"],
            answer: "Mario Zagallo"
        },
        {
            question: "Which player has scored the most goals in a single Premier League season?",
            options: ["Mohamed Salah", "Alan Shearer", "Erling Haaland", "Andy Cole"],
            answer: "Erling Haaland"
        }
    ],
    basketball: [
        {
            question: "Which team has won the most NBA championships?",
            options: ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "Golden State Warriors"],
            answer: "Boston Celtics"
        },
        {
            question: "Who is the NBA's all-time leading scorer?",
            options: ["Kareem Abdul-Jabbar", "LeBron James", "Karl Malone", "Kobe Bryant"],
            answer: "LeBron James"
        },
        {
            question: "Which player has the most triple-doubles in NBA history?",
            options: ["Magic Johnson", "Russell Westbrook", "Jason Kidd", "Oscar Robertson"],
            answer: "Russell Westbrook"
        },
        {
            question: "What is the height of a basketball hoop in feet?",
            options: ["8", "9", "10", "12"],
            answer: "10"
        },
        {
            question: "Which country won the first FIBA Basketball World Cup in 1950?",
            options: ["United States", "Argentina", "Soviet Union", "Brazil"],
            answer: "Argentina"
        }
    ],
    tennis: [
        {
            question: "Who has won the most Grand Slam singles titles in men's tennis?",
            options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
            answer: "Novak Djokovic"
        },
        {
            question: "Which surface is the French Open played on?",
            options: ["Grass", "Hard", "Clay", "Carpet"],
            answer: "Clay"
        },
        {
            question: "Who was the first African American to win a Grand Slam title?",
            options: ["Arthur Ashe", "Althea Gibson", "Venus Williams", "Serena Williams"],
            answer: "Althea Gibson"
        },
        {
            question: "What is the scoring sequence in a standard tennis game?",
            options: ["15, 30, 40, game", "1, 2, 3, game", "10, 20, 30, game", "5, 10, 15, game"],
            answer: "15, 30, 40, game"
        },
        {
            question: "Which country has won the most Davis Cup titles?",
            options: ["United States", "Australia", "France", "Spain"],
            answer: "United States"
        }
    ],
    olympics: [
        {
            question: "Which city hosted the first modern Olympic Games in 1896?",
            options: ["Paris", "Athens", "London", "Rome"],
            answer: "Athens"
        },
        {
            question: "Which country has won the most medals in Summer Olympics history?",
            options: ["China", "Russia", "United States", "Great Britain"],
            answer: "United States"
        },
        {
            question: "Who is the only athlete to win gold in both Summer and Winter Olympics?",
            options: ["Michael Phelps", "Usain Bolt", "Eddie Eagan", "Carl Lewis"],
            answer: "Eddie Eagan"
        },
        {
            question: "Which sport was added to the Olympics in 2020 (held in 2021)?",
            options: ["Skateboarding", "Cricket", "Squash", "Karate"],
            answer: "Skateboarding"
        },
        {
            question: "Which city has hosted the Summer Olympics three times?",
            options: ["Los Angeles", "London", "Paris", "Tokyo"],
            answer: "London"
        }
    ]
};


let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedQuestions = [];


const categorySelection = document.getElementById('category-selection');
const gameArea = document.getElementById('game-area');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');
const scoreboard = document.getElementById('scoreboard');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');


function initGame() {
    
    gameArea.style.display = 'none';
    scoreboard.style.display = 'none';
    
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            startGame();
        });
    });
    
   
    nextButton.addEventListener('click', nextQuestion);
    
   
    restartButton.addEventListener('click', restartGame);
}


function startGame() {
    categorySelection.style.display = 'none';
    gameArea.style.display = 'block';
    scoreboard.style.display = 'none';
    
    currentQuestionIndex = 0;
    score = 0;
    selectedQuestions = [...questions[currentCategory]];
    
    showQuestion();
}


function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}`;
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option, question.answer, button));
        optionsElement.appendChild(button);
    });
    
    nextButton.disabled = true;
}


function selectAnswer(selectedOption, correctAnswer, button) {
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => {
        opt.disabled = true;
        if (opt.textContent === correctAnswer) {
            opt.classList.add('correct');
        }
    });
    
    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }
    
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        endGame();
    }
}


function endGame() {
    gameArea.style.display = 'none';
    scoreboard.style.display = 'block';
    finalScoreElement.textContent = `Your Score: ${score}/${selectedQuestions.length}`;
}


function restartGame() {
    scoreboard.style.display = 'none';
    categorySelection.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', initGame);