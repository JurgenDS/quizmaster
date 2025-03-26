import type { QuestionResult } from 'model/quiz-question'

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

export const QuizScore = (props: QuestionResult[]) => {
    const [correctAnswerCount, countAll, quizPercentage] = getQuizStatistic(props)
    ;<>
        <span id="correct-answers">{correctAnswerCount}</span>
        <span id="total-questions">{countAll}</span>
        <span id="percentage-result">{quizPercentage}</span>
        <span id="text-result">{getQuizResult(quizPercentage)}</span>
    </>
}
