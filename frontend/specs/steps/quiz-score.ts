import { expect } from '@playwright/test'
import { Given, Then } from './fixture.ts'

Given('I finish the quiz', async function () {
    await this.page.goto('quiz/score')
})

Then(
    /^I see the result (\d+) correct out of (\d+), (\d+)%, (passed|failed)/,
    async function (
        expectedCorrectAnswers: number,
        expectedTotalQuestions: number,
        expectedPercentage: number,
        expectedTextResult: string,
    ) {
        const correctAnswers = await this.quizScorePage.correctAnswers()
        expect(correctAnswers).toBe(expectedCorrectAnswers)

        const totalQuestions = await this.quizScorePage.totalQuestions()
        expect(totalQuestions).toBe(expectedTotalQuestions)

        const result = await this.quizScorePage.percentageResult()
        expect(result).toBe(expectedPercentage)

        const textResult = await this.quizScorePage.textResult()
        expect(textResult).toBe(expectedTextResult)
    },
)

Then('I see the question {string}', async function (question: string) {
    const questions: string[] = await this.quizScorePage.questions()
    expect(questions).toContain(question)
})

Then('I see all options for question {string}', async function (question: string) {
    const answers = this.bookmarks[question].answers

    const options: string[] = await this.quizScorePage.options(question)

    expect(options.length).toBe(answers.length)
    for (const answer of answers) {
        expect(options).toContain(answer.answer)
    }
})

Then('I see all explanations for question {string}', async function (question: string) {
    const explanationsOrig = this.bookmarks[question].explanation

    const explanations: string[] = await this.quizScorePage.explanations(question)

    expect(explanations.length).toBe(explanationsOrig.length)
    for (const explanation of explanationsOrig) {
        expect(explanations).toContain(explanation)
    }
})
