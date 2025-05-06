import type { Page } from '@playwright/test'

export class QuizPage {
    constructor(private page: Page) {}

    backButtonLocator = () => this.page.locator('button#back')
    nextButtonLocator = () => this.page.locator('button#next')
    skipButtonLocator = () => this.page.locator('button#skip')
    evaluateButtonLocator = () => this.page.locator('button#evaluate')
    progressBarLocator = () => this.page.locator('#progress-bar')

    back = () => this.backButtonLocator().click()
    next = () => this.nextButtonLocator().click()
    skip = () => this.skipButtonLocator().click()
    evaluate = () => this.evaluateButtonLocator().click()
}
