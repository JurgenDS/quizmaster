import type { Page } from '@playwright/test'

export class QuizQuestionPage {
    constructor(private page: Page) {}

    goto = (quizId: string) => this.page.goto(`/quiz/${quizId}`)

    backButtonLocator = () => this.page.locator('button#back')
    nextButtonLocator = () => this.page.locator('button#next')
    skipButtonLocator = () => this.page.locator('button#skip')
    evaluateButtonLocator = () => this.page.locator('button#evaluate')

    private progressBarLocator = () => this.page.locator('#progress-bar')
    progressCurrent = async () => Number.parseInt((await this.progressBarLocator().getAttribute('value')) ?? '')
    progressMax = async () => Number.parseInt((await this.progressBarLocator().getAttribute('max')) ?? '')

    back = () => this.backButtonLocator().click()
    next = () => this.nextButtonLocator().click()
    skip = () => this.skipButtonLocator().click()
    evaluate = () => this.evaluateButtonLocator().click()
}
