import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    private questionLocator = () => this.page.locator('h1')
    questionText = () => this.questionLocator().textContent()

    answersLocator = () => this.page.locator('li')
    answerLocator = (answer: string) => this.page.locator(`li:has(input[value="${answer}"])`)

    answerRowLocator = (answer: string) => this.answerLocator(answer).locator('.answer-input-row')
    answerFeedbackLocator = (answer: string) => this.answerRowLocator(answer).locator('.answer-feedback')
    answerCheckLocator = (answer: string) => this.answerRowLocator(answer).locator('input')
    answerExplanationLocator = (answer: string) => this.answerLocator(answer).locator('.explanation')

    selectAnswer = (answer: string) => this.answerCheckLocator(answer).check()
    unselectAnswer = (answer: string) => this.answerCheckLocator(answer).uncheck()
    isAnswerSelected = (answer: string) => this.answerCheckLocator(answer).isChecked()
    selectedAnswersLocator = () => this.answersLocator().locator('input:checked')

    private submitButtonLocator = () => this.page.locator('input[type="submit"]')
    submit = () => this.submitButtonLocator().click()
    submitButtonIsDisabled = () => this.submitButtonLocator().isDisabled()

    questionFeedbackLocator = () => this.page.locator('p.question-feedback')
    questionExplanationLocator = () => this.page.locator('p.question-explanation')
}
