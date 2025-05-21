import type { Page } from '@playwright/test'

export class QuestionListPage {
    constructor(private page: Page) {}

    goto = (guid: string) => this.page.goto(`/q-list/${guid}`)

    private questionListTitleLocator = () => this.page.locator('#question-list-title')
    enterQuestionListTitle = (title: string) => this.questionListTitleLocator().fill(title)
    questionListTitleValue = () => this.questionListTitleLocator().inputValue()

    createNewQuestion = async () => this.page.locator("#create-question").click()
}
