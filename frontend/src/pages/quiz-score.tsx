import type { QuizResult, QuestionResult } from 'model/quiz-question'

const getQuizStatistic = (questionResult: QuestionResult[]): number[] => {
    const countCorrect = questionResult.filter(i => i.result === true).length
    const countAll = questionResult.length
    const percentage = (countCorrect / countAll) * 100
    return [countCorrect, countAll, percentage]
}

const getQuizResult = (questionResult: number): string => {
    if (questionResult >= 85) {
        return 'passed'
    }
    return 'failed'
}

interface QuizScoreProps {
    readonly quizResult: QuizResult
}

export const QuizScore = (props: QuizScoreProps) => {
    const [correctAnswerCount, countAll, quizPercentage] = getQuizStatistic(props.quizResult.questions)
    return (
        <>
            <h1>Výsledok testu</h1>
            <p>
                Správne odpovede: <span id="correct-answers">{correctAnswerCount}</span>
            </p>
            <p>
                Celkový počet otázok: <span id="total-questions">{countAll}</span>
            </p>
            <p>
                Úspešnosť(%): <span id="percentage-result">{quizPercentage.toFixed(2)}</span>
            </p>
            <p>
                Stav: <span id="text-result">{getQuizResult(quizPercentage)}</span>
            </p>
        </>
    )
}
