export interface QuestionListData {
    readonly title: string
}

export const emptyQuestionListData = (): QuestionListData => ({
    title: 'Michaeluv list',
})
