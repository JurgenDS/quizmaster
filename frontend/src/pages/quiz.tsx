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

    const [quizState, setQuizState] = useState<QuizState>([])
    const isAnswered = quizState[currentQuestionIdx] !== undefined

    const onSubmitted = (selectedAnswerIdxs: AnswerIdxs) => {
        const newQuizState = Array.from(quizState)
        newQuizState[currentQuestionIdx] = selectedAnswerIdxs
        setQuizState(newQuizState)
    }

    const onNext = () => setCurrentQuestionIdx(prev => prev + 1)
    const onEvaluate = () =>
        props.onEvaluate({
            correct: quiz.questions.filter((question, idx) =>
                isAnsweredCorrectly(quizState[idx], question.correctAnswers),
            ).length,
            total: quiz.questions.length,
        })

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
            <BackButton onClick={() => {}} />
            {isAnswered &&
                (!isLastQuestion ? <NextButton onClick={onNext} /> : <EvaluateButton onClick={onEvaluate} />)}
        </div>
    )
}

const quizQuestion1: QuizQuestion = {
    id: 1,
    question: 'What is the standard colour of sky?',
    answers: ['Red', 'Blue', 'Green', 'Black'],
    explanations: [],
    questionExplanation: '',
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

const quizA = {
    afterEach: false,
    questions: [quizQuestion1, quizQuestion2],
}
const quizB = {
    afterEach: true,
    questions: [quizQuestionB1, quizQuestionB1],
}
let quiz = quizA

export const Quiz = () => {
    const params = useParams()
    const quizId = params.id
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null

    quiz = quizId === 'b' ? quizB : quizA

    return isEvaluated ? (
        <QuizScore score={quizScore} questions={quiz.questions} />
    ) : (
        <QuizQuestionForm onEvaluate={setQuizScore} afterEach={quiz.afterEach} />
    )
}
