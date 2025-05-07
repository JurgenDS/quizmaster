import type { Page } from '@playwright/test'

export class QuizWelcomePage {
    constructor(private page: Page) {}

    headerLocator = () => this.page.locator('h2')
    startButtonLocator = () => this.page.locator('button#start')

    start = () => this.startButtonLocator().click()

}
