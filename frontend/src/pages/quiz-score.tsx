import type { QuizQuestion } from 'model/quiz-question'
import { Question } from './quiz/question'

export interface QuizScore {
    readonly correct: number
    readonly firstCorrect: number
    readonly total: number
}

interface QuizScoreProps {
    readonly score: QuizScore
    readonly questions: QuizQuestion[]
    readonly passScore: number
    readonly showFirstAnwers: boolean
}

export const QuizScore = ({ score, questions, passScore, showFirstAnwers }: QuizScoreProps) => {
    const { correct, firstCorrect, total } = score
    const percentage = (correct / total) * 100
    const firstPercentage = (firstCorrect / total) * 100
    const result = percentage >= passScore ? 'passed' : 'failed'

    return (
        <>
            <h1>Test result</h1>
            <p>
                Correct answers: <span id="correct-answers">{correct}</span>
            </p>
            {showFirstAnwers && (
                <p>
                    First correct answers: <span id="first-correct-answers">{firstCorrect}</span>
                </p>
            )}
            <p>
                Total answers: <span id="total-questions">{total}</span>
            </p>
            <p>
                Score(%): <span id="percentage-result">{percentage.toFixed(0)}</span>
            </p>
            {showFirstAnwers && (
                <p>
                    First time score(%): <span id="first-percentage-result">{firstPercentage.toFixed(0)}</span>
                </p>
            )}
            <p>
                Min pass score(%): <span id="pass-score">{passScore}</span>
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
