export type AnswerIdxs = readonly number[]

export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: string[]
    readonly explanations: string[]
    readonly questionExplanation: string
    readonly correctAnswers: AnswerIdxs
    userInput?: AnswerIdxs
}

export interface Answers {
    readonly correctAnswers: AnswerIdxs
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}

export interface Quiz {
    id: string
    questions: QuizQuestion[]
    afterEach: boolean
}

export const isAnsweredCorrectly = (selectedAnswerIdxs: AnswerIdxs, correctAnswers: AnswerIdxs): boolean =>
    selectedAnswerIdxs.length === correctAnswers.length &&
    selectedAnswerIdxs.every(answerIndex => correctAnswers.includes(answerIndex))
