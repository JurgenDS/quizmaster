import { expect } from '@playwright/test'
import { Given, Then, When } from './fixture.ts'

Given('a quiz with 10 questions', async () => {
    // Step: Given a quiz with 10 questions
    // From: specs/QuizScore.feature:4:5
})

When('I answer 5 questions correctly and 5 questions incorrectly', async () => {
    // Step: When I answer 5 questions correctly and 5 questions incorrectly
    // From: specs/QuizScore.feature:5:5
})

Then('I see the score', async function () {
    await this.page.goto('/quiz-score')
    const correctAnswers = await this.quizScorePage.correctAnswers()
    expect(correctAnswers).toBe('5')

    const totalQuestions = await this.quizScorePage.totalQuestions()
    expect(totalQuestions).toBe('10')

    const result = await this.quizScorePage.percentageResult()
    expect(result).toBe('50')

    const textResult = await this.quizScorePage.textResult()
    expect(textResult).toBe('failed')

    // Step: Then I see the score
    // From: specs/QuizScore.feature:6:5
})
