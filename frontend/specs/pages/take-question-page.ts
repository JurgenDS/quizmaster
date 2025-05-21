import type { Page } from '@playwright/test'

export class TakeQuestionPage {
    constructor(private page: Page) {}

    questionLocator = () => this.page.locator('h1')

    answersLocator = () => this.page.locator('li')

    answerLocator = (answer: string) =>
        this.page.locator(`input[type="checkbox"][value="${answer}"],input[type="radio"][value="${answer}"]`)

    answerExplanationLocatorForAnswer = (answer: string) => this.page.getByTestId(`answer-row-${answer}-explanation`)

    selectAnswer = (answer: string) => this.answerLocator(answer).check()
    unselectAnswer = (answer: string) => this.answerLocator(answer).uncheck()

    submitButtonLocator = () => this.page.locator('input[type="submit"]')

    submit = () => this.submitButtonLocator().click()
    submitButtonIsDisabled = () => this.submitButtonLocator().isDisabled()

    feedbackLocator = () => this.page.locator('p.question-correctness')

    answerExplanationLocator = () => this.page.locator('span.explanationText')

    questionExplanationLocator = () => this.page.locator('p.question-explanation')

    selectedAnswersLocator = () => this.page.locator('input:checked')

    checkAnswer = (answer: string) => this.answerLocator(answer).isChecked()
}
