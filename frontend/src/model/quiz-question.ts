// TODO refactor optional params
export interface QuizQuestion {
    readonly id: number
    readonly question: string
    readonly answers: string[]
    readonly explanations: string[]
    readonly questionExplanation: string
    readonly correctAnswers: number[]
}

export interface Answers {
    readonly correctAnswers: readonly number[]
    readonly explanations: readonly string[]
    readonly questionExplanation: string
}

export interface QuestionResult {
    readonly question: number
    readonly answer: string[]
    readonly result: boolean
}
