export type AnswerIdxs = readonly number[]

export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: string[]
    readonly explanations: string[]
    readonly questionExplanation: string
    readonly correctAnswers: AnswerIdxs
}

export interface Answers {
    readonly correctAnswers: AnswerIdxs
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}

export interface QuestionResult {
    readonly question: number
    readonly answer: AnswerIdxs
    readonly result: boolean
}

export interface QuizResult {
    readonly questions: QuestionResult[]
}
