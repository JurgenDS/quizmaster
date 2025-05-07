import { expect } from '@playwright/test'
import { Given, Then } from './fixture.ts'

Given('I finish the quiz', async function () {
    await this.page.goto('quiz/score')
})

Then(
    /^I see the result (\d+) correct out of (\d+), (\d+)%, (passed|failed), required passScore (\d+)%/,
    async function (
        expectedCorrectAnswers: number,
        expectedTotalQuestions: number,
        expectedPercentage: number,
        expectedTextResult: string,
        expectedPassScore: number,
    ) {
        const correctAnswers = await this.quizScorePage.correctAnswers()
        expect(correctAnswers).toBe(expectedCorrectAnswers)

        const totalQuestions = await this.quizScorePage.totalQuestions()
        expect(totalQuestions).toBe(expectedTotalQuestions)

        const result = await this.quizScorePage.percentageResult()
        expect(result).toBe(expectedPercentage)

        const textResult = await this.quizScorePage.textResult()
        expect(textResult).toBe(expectedTextResult)

        const passScore = await this.quizScorePage.passScore()
        expect(passScore).toBe(expectedPassScore)
    },
)

Then('I see the question {string}', async function (question: string) {
    const questions: string[] = await this.quizScorePage.questions()
    expect(questions).toContain(question)
})

Then('I see all options for question {string}', async function (question: string) {
    const answersOrig = this.bookmarks[question].answers

    const answers: string[] = await this.quizScorePage.answers(question)

    expect(answers.length).toBe(answersOrig.length)
    for (const answer of answersOrig) {
        expect(answers).toContain(answer.answer)
    }
})

Then('I see explanation {string} for question {string}', async function (explanation: string, question: string) {
    const explanations: string[] = await this.quizScorePage.explanations(question)

    expect(explanations).toContain(explanation)
})

Then(
    'I see question explanation {string} for question {string}',
    async function (explanationOrig: string, question: string) {
        const explanation = await this.quizScorePage.questionExplanation(question)

        expect(explanation).toBe(explanationOrig)
    },
)

Then('I see user select {string} for question {string}', async function (userSelect: string, question: string) {
    const answerLabel = await this.quizScorePage.checkedAnswerLabel(question)

    expect(answerLabel).toBe(userSelect)
})

Then(
    'I see corresponding response {string} for answer {string} for question {string}',
    async function (response: string, answer: string, question: string) {
        const answerResponse = await this.quizScorePage.answerCorrespondingResponse(question, answer)

        expect(answerResponse).toBe(response)
    },
)
