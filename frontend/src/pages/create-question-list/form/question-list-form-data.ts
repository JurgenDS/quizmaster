import type { QuestionListApiData } from 'api/question-list'

export interface QuestionListFormData {
    readonly title: string
}

export const emptyQuestionListFormData = (): QuestionListFormData => ({
    title: '',
})

export const toQuestionListApiData = (questionData: QuestionListFormData): QuestionListApiData => {
    return {
        title: questionData.title,
    }
}
