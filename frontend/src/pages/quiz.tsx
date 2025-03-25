import type { QuizQuestion } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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
    correctAnswers: [2, 0],
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
    const handleStateChanged = (answerIndex: number, selected: boolean) => {
        const questionId = currentQuestion.id
        const lastAnswers = quizState[questionId] ?? []
        const currentAnswers = resolveAnswers(currentQuestion, lastAnswers, answerIndex, selected)
        setQuizState({ ...quizState, [questionId]: currentAnswers })
    }

    return (
        <div>
            <h2>Quiz</h2>
            <QuestionForm
                question={currentQuestion}
                isSubmitted={submitted}
                onSubmitted={onSubmitted}
                onAnswerChange={handleStateChanged}
                quizState={quizState}
            />
            {submitted && !isLastQuestion && <NextQuestionButton onClick={nextQuestionHandler} />}
            {submitted && isLastQuestion && (
                <Link className="submit-btn submit-btn-evaluate" to="/evaluation" id="evaluate-button">
                    Evaluate
                </Link>
            )}
            {
                <>
                    <span>You are on a question {currentQuestionIndex + 1} / {quiz.length}</span> - <progress id="progress-bar" value={currentQuestionIndex + 1} max={quiz.length} />
                </>
            }

        </div>
    )
}
