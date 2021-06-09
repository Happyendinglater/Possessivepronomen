const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Du und Thomas spielt laute Musik. _____ Musik ist zu laut.",
        choice1: "Eure",
        choice2: 'Unsere',
        choice3: 'Meine',
        choice4: 'Deine',
        answer: 1,
    },
    {
        question:
            "Rico hat viele Poster. _____ Poster hängen an den Wänden.",
        choice1: "Unsere",
        choice2: "Ihre",
        choice3: "Seine",
        choice4: "Meine",
        answer: 3,
    },
    {
        question: "Wir haben Bücherregale. Aber _____ Regale sind voll.",
        choice1: "ihre",
        choice2: "deine",
        choice3: "eure",
        choice4: "unsere",
        answer: 4,
    },
    {
        question: "Hast du einem Fernseher? Wo ist _____ Fernseher?",
        choice1: "dein",
        choice2: "ihr",
        choice3: "uns",
        choice4: "sein",
        answer: 1,
    },
    {
        question: "Mein Mitbewohner hat eine Gitarre. _____ Gitarre ist ein Geschenk von seinem Eltern.",
        choice1: "Dein",
        choice2: "Seine",
        choice3: "Uns",
        choice4: "Sein",
        answer: 2,
    },
    {
        question: "Thomas hat einen Rucksack. _____ Rucksack ist alt.",
        choice1: "Mein",
        choice2: "Meine",
        choice3: "Ihre",
        choice4: "Ihr",
        answer: 4,
    },
    {
        question: "Valerie kauft einen Laptop. _____ Laptop kostet viel Geld.",
        choice1: "Eure",
        choice2: "Dein",
        choice3: "Ihr",
        choice4: "Unsere",
        answer: 3,  
    },
    {
        question: "Ich habe eine Lampe. _____ Lampe ist kaputt.",
        choice1: "Seine",
        choice2: "Meine",
        choice3: "Ihr",
        choice4: "Eure",
        answer: 2,
    },
    {
        question: "Mutti, wo sind _____ Socken?",
        choice1: "unseren",
        choice2: "unser",
        choice3: "unserem",
        choice4: "unsere",
        answer: 4,
    },
    {
        question: "Verkauft ihr _____ Computer?",
        choice1: "euren",
        choice2: "euer",
        choice3: "eure",
        choice4: "eures",
        answer: 1,
    },
    {
        question: "_____ Eltern kommen zu Besuch.",
        choice1: "Meinem",
        choice2: "Mein",
        choice3: "Meine",
        choice4: "Meinen",
        answer: 3,
    },
    {
        question: "Erika kann nicht kommen, denn _____ Auto ist kaputt.",
        choice1: "ihren",
        choice2: "ihr",
        choice3: "ihre",
        choice4: "ihrem",
        answer: 2,
    },
    {
        question: "_____ Zimmer hat drei Fenster.",
        choice1: "Seiner",
        choice2: "Seinen",
        choice3: "Seine",
        choice4: "Sein",
        answer: 2,
    },
    {
        question: "Wir feiern _____ Geburtstag mit dir.",
        choice1: "deiner",
        choice2: "deinen",
        choice3: "deine",
        choice4: "dein",
        answer: 2,
    },
    {
        question: "Die Müllers holen _____ Sohn vom Bahnhof ab.",
        choice1: "ihre",
        choice2: "ihr",
        choice3: "ihren",
        choice4: "ihrem",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
