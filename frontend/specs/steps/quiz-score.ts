import { expect } from '@playwright/test'
import { Given, Then, When } from './fixture.ts'
import type { DataTable } from '@cucumber/cucumber'

Given('a quiz with 10 questions', async () => {
    // Step: Given a quiz with 10 questions
    // From: specs/QuizScore.feature:4:5
})

When(
    'I answer {int} questions correctly from {int} total questions',
    async function (correctAnswers: number, totalQuestions: number) {
        // Step: When I answer 5 questions correctly from 10 total questions <correct_answers>
        // From: specs/QuizScore.feature:5:5
        this.correctAnswers = correctAnswers
        this.totalQuestions = totalQuestions
    },
)

Then('I see the score', async function (dataTable: DataTable) {
    await this.page.goto('quiz/score')
    const rows = dataTable.hashes()
    for (const row of rows) {
        const { correct_answers, total_questions, percentage_result, text_result } = row
        const correctAnswers = await this.quizScorePage.correctAnswers()
        expect(correctAnswers).toBe(Number(correct_answers))

        const totalQuestions = await this.quizScorePage.totalQuestions()
        expect(totalQuestions).toBe(Number(total_questions))

        const result = await this.quizScorePage.percentageResult()
        expect(result).toBe(percentage_result)

        const textResult = await this.quizScorePage.textResult()
        expect(textResult).toBe(text_result)
    }
})
