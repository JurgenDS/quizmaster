import type { Page } from '@playwright/test'

export class QuizScorePage {
    constructor(private page: Page) {}

    private correctAnswerLocator = () => this.page.locator('#correct-answers')
    correctAnswers = () => this.correctAnswerLocator().textContent().then(Number)

    private firstCorrectAnswerLocator = () => this.page.locator('#first-correct-answers')
    firstCorrectAnswers = () => this.firstCorrectAnswerLocator().textContent().then(Number)
    firstCorrectAnswersPresent = () => this.firstCorrectAnswerLocator().isVisible()

    private totalQuestionsLocator = () => this.page.locator('#total-questions')
    totalQuestions = () => this.totalQuestionsLocator().textContent().then(Number)

    private percentageResultLocator = () => this.page.locator('#percentage-result')
    percentageResult = () => this.percentageResultLocator().textContent().then(Number)

    private firstPercentageResultLocator = () => this.page.locator('#first-percentage-result')
    firstPercentageResult = () => this.firstPercentageResultLocator().textContent().then(Number)
    firstPercentageResultPresent = () => this.firstPercentageResultLocator().isVisible()

    private passScoreLocator = () => this.page.locator('#pass-score')
    passScore = () => this.passScoreLocator().textContent().then(Number)

    private textResultLocator = () => this.page.locator('#text-result')
    textResult = () => this.textResultLocator().textContent()

    private firstTextResultLocator = () => this.page.locator('#first-text-result')
    firstTextResult = () => this.firstTextResultLocator().textContent()
    firstTextResultPresent = () => this.firstCorrectAnswerLocator().isVisible()

    private questionsLocator = () => this.page.locator('[id^=question-]')
    questions = () => this.questionsLocator().locator('strong[id^=question-]').allTextContents()

    private questionLocator = (question: string) =>
        this.questionsLocator().locator('strong[id^=question-]').filter({ hasText: question }).locator('..')
    private answertAndExplanationLocator = (question: string) =>
        this.questionLocator(question).locator('li[id^=answers-]')
    answers = (question: string) =>
        this.answertAndExplanationLocator(question).locator('span[id$="-label"]').allTextContents()
    explanations = (question: string) =>
        this.answertAndExplanationLocator(question).locator('.explanationText').allTextContents()
    questionExplanation = (question: string) =>
        this.questionLocator(question).locator('.question-explanation').textContent()

    private checkedUserSelectLocator = (question: string) => this.questionLocator(question).locator('input:checked')
    checkedAnswerLabel = (question: string) =>
        this.checkedUserSelectLocator(question).locator('..').locator('span[id$="-label"]').textContent()

    private questionAnswerLocator = (question: string, answer: string) =>
        this.answertAndExplanationLocator(question).getByText(answer)
    private answerCorrespondingResponseLocator = (question: string, answer: string) =>
        this.questionAnswerLocator(question, answer).locator('..').locator('..').locator('.feedback')
    answerCorrespondingResponse = (question: string, answer: string) =>
        this.answerCorrespondingResponseLocator(question, answer).textContent()
}
