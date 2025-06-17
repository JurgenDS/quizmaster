export type AnswerIdxs = readonly number[]

export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: string[]
    readonly explanations: string[]
    readonly questionExplanation: string
    readonly correctAnswers: AnswerIdxs
    questionListGuid: string | null
    userInput?: AnswerIdxs
    easyMode: boolean
}

export interface Answers {
    readonly correctAnswers: AnswerIdxs
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}

export interface Quiz {
    id: number
    questions: QuizQuestion[]
    afterEach: boolean
    passScore: number
}

export const isAnsweredCorrectly = (selectedAnswerIdxs: AnswerIdxs, correctAnswers: AnswerIdxs): boolean =>
    selectedAnswerIdxs.length === correctAnswers.length &&
    selectedAnswerIdxs.every(answerIndex => correctAnswers.includes(answerIndex))
