import type { QuizQuestion, AnswerIdxs } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { EvaluateButton, NextQuestionButton } from './quiz/buttons'

interface QuizQuestionProps {
    readonly currentQuestionIndex: number
    readonly currentQuestion: QuizQuestion
    readonly submitted: boolean
    readonly isLastQuestion: boolean
    readonly onSubmitted: () => void
    readonly nextQuestionHandler: () => void
    readonly handleStateChanged: (answerIndex: number, selected: boolean) => void
}

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    return (
        <div>
            <h2>Quiz</h2>
            <ProgressBar current={props.currentQuestionIndex + 1} total={quiz.length} />
            <QuestionForm
                key={props.currentQuestion.id}
                question={props.currentQuestion}
                onSubmitted={props.onSubmitted}
                onAnswerChange={props.handleStateChanged}
            />
            {props.submitted &&
                (!props.isLastQuestion ? (
                    <NextQuestionButton onClick={props.nextQuestionHandler} />
                ) : (
                    <EvaluateButton />
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

    const onSubmitted = () => setSubmitted(true)

    const resolveAnswers = (
        question: QuizQuestion,
        lastAnswers: AnswerIdxs,
        answerIndex: number,
        selected: boolean,
    ) => {
        const isMultiple = question.correctAnswers.length > 1
        if (!isMultiple) {
            return [answerIndex]
        }
        const answers = Array.from(new Set([...lastAnswers, answerIndex]))
        const removingAnswers = !selected ? [answerIndex] : []
        return answers.filter(i => !removingAnswers.includes(i))
    }

    const handleStateChanged = (answerIndex: number, selected: boolean) => {
        const questionId = currentQuestion.id
        const lastAnswers = quizState[questionId] ?? []
        const currentAnswers = resolveAnswers(currentQuestion, lastAnswers, answerIndex, selected)
        setQuizState({ ...quizState, [questionId]: currentAnswers })
    }

    return (
        <Routes>
            <Route path="/score" element={<QuizScore score={quizScore} />} />
            <Route
                index
                path=""
                element={
                    <QuizQuestionForm
                        currentQuestion={currentQuestion}
                        currentQuestionIndex={currentQuestionIndex}
                        submitted={submitted}
                        isLastQuestion={isLastQuestion}
                        onSubmitted={onSubmitted}
                        nextQuestionHandler={nextQuestionHandler}
                        handleStateChanged={handleStateChanged}
                    />
                }
            />
        </Routes>
    )
}
