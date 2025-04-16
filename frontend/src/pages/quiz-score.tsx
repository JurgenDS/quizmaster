import type { QuizQuestion } from 'model/quiz-question'
import { Question } from './quiz/question'

export interface QuizScore {
    readonly correct: number
    readonly total: number
}

interface QuizScoreProps {
    readonly score: QuizScore
    readonly questions: QuizQuestion[]
}

export const QuizScore = ({ score, questions }: QuizScoreProps) => {
    const { correct, total } = score
    const percentage = (correct / total) * 100
    const result = percentage >= 85 ? 'passed' : 'failed'

    return (
        <>
            <h1>Test result</h1>
            <p>
                Correct answers: <span id="correct-answers">{correct}</span>
            </p>
            <p>
                Total answers: <span id="total-questions">{total}</span>
            </p>
            <p>
                Rate(%): <span id="percentage-result">{percentage.toFixed(2)}</span>
            </p>
            <p>
                State: <span id="text-result">{result}</span>
            </p>

            <hr />

            <h2>Answer overview</h2>
            {questions.map(question => (
                <Question key={question.id} question={question} isMultipleChoice={question.correctAnswers.length > 1} />
            ))}
        </>
    )
}
