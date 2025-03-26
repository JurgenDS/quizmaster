import type { QuizQuestion, QuizResult, QuestionResult } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { QuizScore } from './quiz-score'

interface QuizQuestionProps {
    readonly currentQuestionIndex: number
    readonly currentQuestion: QuizQuestion
    readonly submitted: boolean
    readonly isLastQuestion: boolean
    readonly onSubmitted: () => void
    readonly nextQuestionHandler: () => void
    readonly handleStateChanged: (answerIndex: number, selected: boolean) => void
    readonly quizState: Record<string, number[]>
}

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    return (
        <div>
            <h2>Quiz</h2>
            {
                <>
                    <span>
                        You are on a question {props.currentQuestionIndex + 1} / {quiz.length}
                    </span>
                    <br />
                    <progress id="progress-bar" value={props.currentQuestionIndex + 1} max={quiz.length} />
                </>
            }
            <QuestionForm
                key={props.currentQuestion.id}
                question={props.currentQuestion}
                isSubmitted={props.submitted}
                onSubmitted={props.onSubmitted}
                onAnswerChange={props.handleStateChanged}
                quizState={props.quizState}
            />
            {props.submitted && !props.isLastQuestion && <NextQuestionButton onClick={props.nextQuestionHandler} />}
            {props.submitted && props.isLastQuestion && (
                <Link className="submit-btn submit-btn-evaluate" to="score" id="evaluate-button">
                    Evaluate
                </Link>
            )}
        </div>
    )
}

interface NextQuestionButtonProps {
    onClick: () => void
}

export const NextQuestionButton = (props: NextQuestionButtonProps) => {
    return (
        <div>
            <button className="submit-btn" type="button" onClick={props.onClick} id="next-question">
                Next Question
            </button>
        </div>
    )
}
const sessionKey = 'quizState'

// Clear session storage on page load or refresh
sessionStorage.removeItem(sessionKey)

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
const getSessionQuizState = (): Record<string, number[]> => {
    const sessionStorageValue = sessionStorage.getItem(sessionKey)
    const quizState = sessionStorageValue ? JSON.parse(sessionStorageValue) : {}
    return quizState
}

const useQuizState = () => {
    const [quizState, setQuizState] = useState(() => getSessionQuizState())

    return [
        quizState,
        (state: Record<string, number[]>) => {
            setQuizState(state)
            sessionStorage.setItem(sessionKey, JSON.stringify(state))
        },
    ] as const
}

export const Quiz = () => {
    const [quizState, setQuizState] = useQuizState()

    const isAlreadyAnswered = (questionId: number) => {
        return Boolean(quizState[questionId]?.length)
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const currentQuestion = useMemo(() => {
        return quiz[currentQuestionIndex]
    }, [currentQuestionIndex])

    const [submitted, setSubmitted] = useState(isAlreadyAnswered(currentQuestion.id))
    const isLastQuestion = currentQuestionIndex === quiz.length - 1

    const nextQuestionHandler = () => {
        console.log('Next question')
        const nextQuestionIndex = currentQuestionIndex + 1
        setCurrentQuestionIndex(nextQuestionIndex)

        if (nextQuestionIndex < quiz.length) {
            const nextQuestion = quiz[nextQuestionIndex]
            setSubmitted(isAlreadyAnswered(nextQuestion.id))
        }
    }

    const [questionResults, setQuestionResults] = useState<QuestionResult[]>([])
    const [quizResult, setQuizResult] = useState<QuizResult>({ questions: [] })

    const onSubmitted = () => {
        setSubmitted(true)
    }
    const resolveAnswers = (question: QuizQuestion, lastAnswers: number[], answerIndex: number, selected: boolean) => {
        const isMultiple = question.correctAnswers.length > 1
        if (!isMultiple) {
            return [answerIndex]
        }
        const answers = Array.from(new Set([...lastAnswers, answerIndex]))
        const removingAnswers = !selected ? [answerIndex] : []
        return answers.filter(i => !removingAnswers.includes(i))
    }

    const saveResults = (id: string, answer: number[], result: boolean) => {
        setQuestionResults(prevResults => {
            const existingIndex = prevResults.findIndex(res => res.question === Number(id))
            let updatedResults: QuestionResult[] // Explicitly typed as QuestionResult[]
            if (existingIndex !== -1) {
                // Update existing result
                updatedResults = [...prevResults]
                updatedResults[existingIndex] = { question: Number(id), answer, result }
            } else {
                // Insert new result
                updatedResults = [...prevResults, { question: Number(id), answer, result }]
            }
            console.log('Updated questionResults:', JSON.stringify(updatedResults))

            // Update quizResult
            setQuizResult({
                questions: updatedResults.map(res => ({
                    question: res.question,
                    answer: res.answer,
                    result: res.result,
                })),
            })

            return updatedResults
        })
    }
    console.log(questionResults)

    const handleStateChanged = (answerIndex: number, selected: boolean) => {
        const questionId = currentQuestion.id
        const lastAnswers = quizState[questionId] ?? []
        const currentAnswers = resolveAnswers(currentQuestion, lastAnswers, answerIndex, selected)
        const isCorrect =
            currentAnswers.length === currentQuestion.correctAnswers.length &&
            currentAnswers.every(answerIndex => currentQuestion.correctAnswers.includes(answerIndex))
        console.log('currentAnswers', JSON.stringify(currentAnswers))
        saveResults(questionId.toString(), currentAnswers, isCorrect)
        setQuizState({ ...quizState, [questionId]: currentAnswers })
    }

    return (
        <Routes>
            <Route path="/score" element={<QuizScore quizResult={quizResult} />} />
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
                        quizState={quizState}
                    />
                }
            />
        </Routes>
    )
}
