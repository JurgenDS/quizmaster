import { type QuizQuestion, type AnswerIdxs, isAnsweredCorrectly } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { EvaluateButton, NextButton, BackButton } from './quiz/buttons'
import { useParams } from 'react-router-dom'

interface QuizQuestionProps {
    readonly onEvaluate: (quizScore: QuizScore) => void
    readonly afterEach: boolean
}

type QuizState = readonly AnswerIdxs[]

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const currentQuestion = quiz.questions[currentQuestionIdx]
    const isLastQuestion = currentQuestionIdx === quiz.questions.length - 1
    const isFirstQuestion = currentQuestionIdx === 0

    const [quizState, setQuizState] = useState<QuizState>([])
    const isAnswered = quizState[currentQuestionIdx] !== undefined

    const onSubmitted = (selectedAnswerIdxs: AnswerIdxs) => {
        const newQuizState = Array.from(quizState)
        newQuizState[currentQuestionIdx] = selectedAnswerIdxs
        setQuizState(newQuizState)
    }

    const onNext = () => setCurrentQuestionIdx(prev => prev + 1)
    const onBack = () => setCurrentQuestionIdx(prev => prev - 1)
    const onEvaluate = () => {
        props.onEvaluate({
            correct: quiz.questions.filter((question, idx) =>
                isAnsweredCorrectly(quizState[idx], question.correctAnswers),
            ).length,
            total: quiz.questions.length,
        })
        quiz.questions.forEach((question, idx) => {
            question.userInput = quizState[idx]
        })
    }

    return (
        <div>
            <h2>Quiz</h2>
            <ProgressBar current={currentQuestionIdx + 1} total={quiz.questions.length} />
            <QuestionForm
                key={currentQuestion.id}
                question={currentQuestion}
                onSubmitted={onSubmitted}
                afterEach={props.afterEach}
            />
            <div>
                {!isFirstQuestion && <BackButton onClick={onBack} />}
                {isAnswered &&
                    (!isLastQuestion ? <NextButton onClick={onNext} /> : <EvaluateButton onClick={onEvaluate} />)}
            </div>
        </div>
    )
}

const quizQuestion1: QuizQuestion = {
    id: 1,
    question: 'What is the standard colour of sky?',
    answers: ['Red', 'Blue', 'Green', 'Black'],
    explanations: [
        'Red is not the standard colour of sky',
        'Blue is the standard colour of sky',
        'Green is not the standard colour of sky',
        'Black is not the standard colour of sky',
    ],
    questionExplanation: 'Sky is blue because of Rayleigh scattering',
    correctAnswers: [1],
}
const quizQuestion2: QuizQuestion = {
    id: 2,
    question: 'What is capital of France?',
    answers: ['Marseille', 'Lyon', 'Paris', 'Toulouse'],
    explanations: [],
    questionExplanation: '',
    correctAnswers: [2],
}

const quizQuestionB1: QuizQuestion = {
    id: 2,
    question: 'Is this the B quiz?',
    answers: ['Yes', 'No', 'Idk', 'Not'],
    explanations: [],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC1: QuizQuestion = {
    id: 3,
    question: 'Co je DevOps: ',
    answers: [
        'Integrace vývoje a provozu pro rychlejší a spolehlivější nasazení.',
        'Spolupráce dvou programátorů na jednom úkolu pro zlepšení kvality kódu.',
    ],
    explanations: ['', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC2: QuizQuestion = {
    id: 4,
    question: 'Continuous Integration/Continuous Deployment (CI/CD) je: ',
    answers: ['Automatizace testování a nasazení kódu.', 'Automobilizace testování a nasazení kódu.'],
    explanations: ['', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC3: QuizQuestion = {
    id: 5,
    question: 'Test-Driven Development (TDD): ',
    answers: [
        'Psaní testů před samotným kódem pro zajištění kvality.',
        'Rozdělení aplikace na menší, nezávislé služby.',
    ],
    explanations: ['', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC4: QuizQuestion = {
    id: 6,
    question: 'Code Review: ',
    answers: [
        'Pravidelné kontroly kódu pro zajištění kvality a sdílení znalostí. Drunk based development Proč má komplexita zadání vliv na rychlost dodávky? ',
        'Využití kódových služeb pro škálovatelnost a flexibilitu.',
    ],
    explanations: ['', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC5: QuizQuestion = {
    id: 7,
    question: 'Drunk based development: ',
    answers: [
        'humoristický nebo satirický termín, který naznačuje, že vývoj probíhá v neformálním nebo chaotickém prostředí',
        'metodologie vývoje softwaru, která se zaměřuje na práci s jednou hlavní větví (trunk) v systému pro správu verzí',
    ],
    explanations: ['', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizQuestionC6: QuizQuestion = {
    id: 8,
    question: 'Proč má komplexita zadání vliv na rychlost dodávky?',
    answers: [
        'Komplexní zadání vyžaduje důkladnější analýzu, aby se plně pochopily všechny požadavky a souvislosti.',
        'Žádné změny a úpravy',
        'S rostoucí komplexitou neroste i riziko chyb, které mohou zpomalit vývoj kvůli potřebě oprav a úprav.',
    ],
    explanations: ['', '', ''],
    questionExplanation: '',
    correctAnswers: [0],
}

const quizA = {
    afterEach: false,
    questions: [quizQuestion1, quizQuestion2],
}
const quizB = {
    afterEach: true,
    questions: [quizQuestionB1, quizQuestionB1],
}

const quizC = {
    afterEach: true,
    questions: [quizQuestionC1, quizQuestionC2, quizQuestionC3, quizQuestionC4, quizQuestionC5, quizQuestionC6],
}
let quiz = quizA

export const Quiz = () => {
    const params = useParams()
    const quizId = params.id
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null

    if (quizId === 'a') {
        quiz = quizA
    } else if (quizId === 'b') {
        quiz = quizB
    } else if (quizId === 'c') {
        quiz = quizC
    }

    return isEvaluated ? (
        <QuizScore score={quizScore} questions={quiz.questions} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} afterEach={quiz.afterEach} />
    )
}
