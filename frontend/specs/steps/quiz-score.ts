import { expect } from '@playwright/test'
import { Given, Then, When } from './fixture.ts'
import type { QuizResult } from '../../src/model/quiz-question'

Given('I finish the quiz', async function () {
    await this.page.goto('quiz/score')
})

When('I answer 2 questions correctly from 2 total questions', async function () {
    // Step: When I answer 5 questions correctly from 10 total questions <correct_answers>
    // From: specs/QuizScore.feature:5:5

    const quizResult: QuizResult = {
        questions: [
            {
                question: 1,
                answer: [0],
                result: true,
            },
            {
                question: 2,
                answer: [2],
                result: true,
            },
        ],
    }
    this.quizResult = quizResult
    this.percentageResult = 100
    this.correctAnswersCount = 2
    this.quizScoreResult = 'passed'
})

When('I answer 1 questions incorrectly from 2 total questions', async function () {
    // Step: When I answer 5 questions correctly from 10 total questions <correct_answers>
    // From: specs/QuizScore.feature:5:5

    const quizResult: QuizResult = {
        questions: [
            {
                question: 1,
                answer: [0],
                result: true,
            },
            {
                question: 2,
                answer: [2],
                result: false,
            },
        ],
    }
    this.quizResult = quizResult
    this.percentageResult = 50
    this.correctAnswersCount = 1
    this.quizScoreResult = 'failed'
})

Then('I see the result failed', async function () {
    const correctAnswers = await this.quizScorePage.correctAnswers()
    expect(correctAnswers).toBe(this.correctAnswersCount)

    const totalQuestions = await this.quizScorePage.totalQuestions()
    expect(totalQuestions).toBe(this.quizResult.questions.length)

    const result = await this.quizScorePage.percentageResult()
    expect(result).toBe(this.percentageResult)

    const textResult = await this.quizScorePage.textResult()
    expect(textResult).toBe(this.quizScoreResult)
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
