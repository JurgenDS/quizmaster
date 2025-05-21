import type { QuizQuestion } from 'model/quiz-question'

export interface QuestionListData {
    readonly title: string
    readonly questions: QuizQuestion[]
}

export const emptyQuestionListData = (): QuestionListData => ({
    title: '',
    questions: [],
})

export const questionListAData = (): QuestionListData => ({
    title: 'Michaeluv list',
    questions: [],
})
