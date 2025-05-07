import { type AnswerIdxs, isAnsweredCorrectly, type Quiz } from 'model/quiz-question'
import { QuestionForm } from './question-take'
import { useEffect, useState } from 'react'
import { QuizScore } from './quiz-score'
import { ProgressBar } from './quiz/progress-bar'
import { EvaluateButton, NextButton, BackButton, SkipButton } from './quiz/buttons'
import { useParams } from 'react-router-dom'
import { getQuiz } from '../api/quiz.ts'

import { Countdown } from './quiz/countdown.tsx'

interface QuizQuestionProps {
    readonly onEvaluate: (quizScore: QuizScore) => void
    readonly quiz: Quiz
}

type QuizState = readonly AnswerIdxs[]

export const QuizQuestionForm = (props: QuizQuestionProps) => {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
    const [skippedQuestions, setSkippedQuestions] = useState<number[]>([])
    const currentQuestion = props.quiz.questions[currentQuestionIdx]
    const isLastQuestion = currentQuestionIdx === props.quiz.questions.length - 1
    const isFirstQuestion = currentQuestionIdx === 0

    const [quizState, setQuizState] = useState<QuizState>([])
    const isAnswered = quizState[currentQuestionIdx] !== undefined

    const onSubmitted = (selectedAnswerIdxs: AnswerIdxs) => {
        const newQuizState = Array.from(quizState)
        newQuizState[currentQuestionIdx] = selectedAnswerIdxs
        setQuizState(newQuizState)
    }

    const onNext = () => setCurrentQuestionIdx(prev => prev + 1)
    const onSkip = () => {
        setSkippedQuestions(prev => [...prev, currentQuestionIdx])
        const shouldGoOnSkippedQuestion = isLastQuestion
        if (shouldGoOnSkippedQuestion) {
            setCurrentQuestionIdx(skippedQuestions[0])
        } else {
            setCurrentQuestionIdx(prev => prev + 1)
        }
    }
    const onBack = () => setCurrentQuestionIdx(prev => prev - 1)
    const onSubmittedAndNext = (selectedAnswerIdxs: AnswerIdxs) => {
        onSubmitted(selectedAnswerIdxs)
        if (!isLastQuestion) {
            onNext()
        }
    }
    const onEvaluate = () => {
        props.onEvaluate({
            correct: props.quiz.questions.filter((question, idx) =>
                isAnsweredCorrectly(quizState[idx], question.correctAnswers),
            ).length,
            total: props.quiz.questions.length,
        })
        props.quiz.questions.forEach((question, idx) => {
            question.userInput = quizState[idx]
        })
    }
    const anySkippedQuestions = skippedQuestions.length > 0
    const isQuestionSkipable = !isAnswered && (!isLastQuestion || anySkippedQuestions)

    return (
        <div>
            <h2>Quiz</h2>
            <ProgressBar current={currentQuestionIdx + 1} total={props.quiz.questions.length} />
            <QuestionForm
                key={currentQuestion.id}
                question={currentQuestion}
                onSubmitted={props.quiz.afterEach ? onSubmitted : onSubmittedAndNext}
                afterEach={props.quiz.afterEach}
            />
            <div>
                {!isFirstQuestion && <BackButton onClick={onBack} />}
                {isAnswered &&
                    (!isLastQuestion || anySkippedQuestions ? (
                        <NextButton onClick={onNext} />
                    ) : (
                        <EvaluateButton onClick={onEvaluate} />
                    ))}
            </div>
            <div>{isQuestionSkipable && <SkipButton onClick={onSkip} />}</div>
        </div>
    )
}

export const QuizPage = () => {
    const params = useParams()
    const quizId = params.id
    const [quizScore, setQuizScore] = useState<QuizScore | null>(null)
    const isEvaluated = quizScore !== null

    const [quiz, setQuiz] = useState<Quiz>()

    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizId) {
                setQuiz(await getQuiz(quizId))
            }
        }
        fetchQuiz()
    }, [quizId])

    if (quiz) {
        return isEvaluated ? (
            <QuizScore score={quizScore} questions={quiz.questions} passScore={quiz.passScore} />
        ) : (
            <>
                <Countdown />
                <QuizQuestionForm onEvaluate={setQuizScore} quiz={quiz} />
            </>
        )
    }
}
