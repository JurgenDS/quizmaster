import type { Page } from '@playwright/test'

export class CreateQuizPage {
    constructor(private page: Page) {}

    gotoNew = () => this.page.goto('/quiz/new')

    waitForLoaded = () => this.page.isHidden('#is-loaded[value="loaded"]')

    quizLocator = () => this.page.locator('#quiz-text')
    questionLocator = (index: number) => this.page.locator(`#question-${index}`)
    private quizUrlLocator = () => this.page.locator('#quiz-link')

    createQuiz = (quiz: string) => this.quizLocator().fill(quiz)

    enterQuestion = async (index: number, value: string) => {
        await this.questionLocator(index).fill(value)
    }

    addQuestion = async (index: number) => {
        await this.page.locator('button#add-question').click()
        await this.page.waitForSelector(`#question-text-${index}`)
    }

    submit = () => this.page.locator('button[type="submit"]').click()

    quizUrl = () => this.quizUrlLocator().textContent()
    followQuizUrl = () => this.quizUrlLocator().click()

    errorMessage = () => this.page.textContent('#error-message')

    reloadPage = () => this.page.reload({ waitUntil: 'networkidle' })
}
