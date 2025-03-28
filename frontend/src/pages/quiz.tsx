import type { QuizQuestion, AnswerIdxs } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { EvaluateButton, NextQuestionButton } from './quiz/buttons'

interface QuizQuestionProps {
    readonly onEvaluate: (quizScore: QuizScore) => void
}

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    const [quizState, setQuizState] = useState<QuizState>({})

    const quizScore = {
        correct: quiz.filter(question => {
            const selectedAnswerIdxs = quizState[question.id]
            return (
                selectedAnswerIdxs !== undefined &&
                selectedAnswerIdxs.length === question.correctAnswers.length &&
                selectedAnswerIdxs.every(answerIndex => question.correctAnswers.includes(answerIndex))
            )
        }).length,
        total: quiz.length,
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = quiz[currentQuestionIndex]

    const [submitted, setSubmitted] = useState(false)
    const isLastQuestion = currentQuestionIndex === quiz.length - 1

    const nextQuestionHandler = () => {
        const nextQuestionIndex = currentQuestionIndex + 1
        setCurrentQuestionIndex(nextQuestionIndex)

        if (nextQuestionIndex < quiz.length) setSubmitted(false)
    }

    const onSubmitted = (selectedAnswerIdxs: AnswerIdxs) => {
        setQuizState({ ...quizState, [currentQuestion.id]: selectedAnswerIdxs })
        setSubmitted(true)
    }

    const onEvaluate = () => props.onEvaluate(quizScore)

    return (
        <div>
            <h2>Quiz</h2>
            <ProgressBar current={currentQuestionIndex + 1} total={quiz.length} />
            <QuestionForm key={currentQuestion.id} question={currentQuestion} onSubmitted={onSubmitted} />
            {submitted &&
                (!isLastQuestion ? (
                    <NextQuestionButton onClick={nextQuestionHandler} />
                ) : (
                    <EvaluateButton onClick={onEvaluate} />
                ))}
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

const quiz = [quizQuestion1, quizQuestion2]

type QuizState = Record<string, AnswerIdxs>

export const Quiz = () => {
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null

    return isEvaluated ? <QuizScore score={quizScore} /> : <QuizQuestionForm onEvaluate={setQuizScore} />
}
