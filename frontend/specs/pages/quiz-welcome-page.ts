import type { Page } from '@playwright/test'

export class QuizWelcomePage {
    constructor(private page: Page) {}

    headerLocator = () => this.page.locator('h2')
    nameLocator = () => this.page.locator('h3#quiz-name')
    descriptionLocator = () => this.page.locator('p#quiz-description')
    questionCountLocator = () => this.page.locator('p#question-count')
    feedbackLocator = () => this.page.locator('p#question-feedback')
    passScoreLocator = () => this.page.locator('p#pass-score')
    startButtonLocator = () => this.page.locator('button#start')

    start = () => this.startButtonLocator().click()
}
