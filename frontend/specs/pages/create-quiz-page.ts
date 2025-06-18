import type { Page } from '@playwright/test'

export class CreateQuizPage {
    constructor(private page: Page) {}

    gotoNew = () => this.page.goto('/quiz/new')

    waitForLoaded = () => this.page.isHidden('#is-loaded[value="loaded"]')

    // Locators
    quizTitleLocator = () => this.page.locator('#quiz-title')
    quizDescriptionLocator = () => this.page.locator('#quiz-description')
    quizModeLocator = () => this.page.locator('input[type="radio"]:checked')
    quizPassscoreLocator = () => this.page.locator('#quiz-passscore')
    quizUrlLocator = () => this.page.locator('#submit-quiz-button')

    // Input methods
    enterTitle = (title: string) => this.quizTitleLocator().fill(title)
    enterDescription = (description: string) => this.quizDescriptionLocator().fill(description)
    selectMode = (mode: string) => this.quizModeLocator().selectOption({ label: mode })
    enterPassscore = (passscore: string) => this.quizPassscoreLocator().fill(passscore)

    // Submission and result
    submit = () => this.page.locator('button[type="submit"]').click()
    quizUrl = () => this.quizUrlLocator().textContent()
    followQuizUrl = () => this.quizUrlLocator().click()

    errorMessage = () => this.page.textContent('#error-message')

    reloadPage = () => this.page.reload({ waitUntil: 'networkidle' })
}
