import type { Page } from '@playwright/test'

export class QuizWelcomePage {
    constructor(private page: Page) {}

    header = () => this.page.locator('h2').textContent()
    name = () => this.page.locator('h3#quiz-name').textContent()
    description = () => this.page.locator('p#quiz-description').textContent()
    questionCount = async () => Number.parseInt((await this.page.locator('span#question-count').textContent()) ?? '')
    feedback = () => this.page.locator('p#question-feedback').textContent()
    passScore = async () => Number.parseInt((await this.page.locator('span#pass-score').textContent()) ?? '')

    startButton = () => this.page.locator('button#start')
    start = () => this.startButton().click()
}
