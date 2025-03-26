import { expect } from '@playwright/test'
import { Given, Then } from './fixture.ts'

Given('I finish the quiz', async function () {
    await this.page.goto('quiz/score')
})

Then('I see the result 2 correct out of 2, 100%, passed', async function () {
    const correctAnswers = await this.quizScorePage.correctAnswers()
    expect(correctAnswers).toBe(2)

    const totalQuestions = await this.quizScorePage.totalQuestions()
    expect(totalQuestions).toBe(2)

    const result = await this.quizScorePage.percentageResult()
    expect(result).toBe(100.0)

    const textResult = await this.quizScorePage.textResult()
    expect(textResult).toBe('passed')
})

Then('I see the result 1 correct out of 2, 50%, failed', async function () {
    const correctAnswers = await this.quizScorePage.correctAnswers()
    expect(correctAnswers).toBe(1)

    const totalQuestions = await this.quizScorePage.totalQuestions()
    expect(totalQuestions).toBe(2)

    const result = await this.quizScorePage.percentageResult()
    expect(result).toBe(50.0)

    const textResult = await this.quizScorePage.textResult()
    expect(textResult).toBe('failed')
})
