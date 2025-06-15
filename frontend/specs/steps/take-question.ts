import type { DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, expectTextToContain } from './common.ts'
import { Then, When } from './fixture.ts'
import type { Question } from './world/question.ts'
import type { TakeQuestionPage } from '../pages/take-question-page.ts'

When('I take question {string}', async function (bookmark: string) {
    await this.page.goto(this.bookmarks[bookmark].url)
    this.activeBookmark = bookmark
})

export async function expectQuestion(takeQuestionPage: TakeQuestionPage, question: Question) {
    await expectTextToBe(takeQuestionPage.questionLocator(), question.question)
    const answers = question.answers
    const answerLocators = takeQuestionPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
}

Then('I see the question and the answers', async function () {
    await expectQuestion(this.takeQuestionPage, this.activeQuestion)
})

When('I answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.selectAnswer(answer)
    }
    await this.takeQuestionPage.submit()
})

When('I uncheck answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.unselectAnswer(answer)
    }
})

When('I check answer {string}', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const answer of answers) {
        await this.takeQuestionPage.selectAnswer(answer)
    }
})

When('I submit question', async function () {
    await this.takeQuestionPage.submit()
})

Then('I see feedback {string}', async function (feedback: string) {
    await expectTextToBe(this.takeQuestionPage.feedbackLocator(), `The answer is:\u00A0${feedback}`)
})

Then('no answer is selected', async function () {
    expect(await this.takeQuestionPage.selectedAnswersLocator().count()).toBe(0)
})

Then('I see the answer explanation {string}', async function (answerExplanation: string) {
    await expectTextToBe(this.takeQuestionPage.answerExplanationLocator(), answerExplanation)
})

Then('I see the question explanation', async function () {
    await expectTextToBe(this.takeQuestionPage.questionExplanationLocator(), this.activeQuestion.explanation)
})

Then('I see individual explanations per answer:', async function (dataTable: DataTable) {
    const rows = dataTable.hashes()
    for (const row of rows) {
        const { answer, explanation } = row
        await expect(this.takeQuestionPage.answerExplanationLocatorForAnswer(answer)).toHaveText(explanation)
    }
})

Then('I see the {string} question for the quiz', async function (questionName: string) {
    await expectTextToContain(this.takeQuestionPage.questionLocator(), questionName)
})

const answerRowClass: { [key in string]: string } = {
    '🟩': 'correctly-selected',
    '🟥': 'incorrect',
    '◼️': 'correctly-not-selected',
}

const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })

Then('I see individual color feedback per answer:', async function (dataTable: DataTable) {
    for (const { answer, color } of dataTable.hashes()) {
        const graphemes = Array.from(segmenter.segment(color), s => s.segment)
        const className = answerRowClass[graphemes[0]]
        const checkMark = graphemes[2]

        const answerRow = this.takeQuestionPage.answerRowLocator(answer)
        await expect(answerRow).toHaveClass(new RegExp(className))

        const feedbackLocator = this.takeQuestionPage.answerFeedbackLocator(answer)
        await expect(feedbackLocator).toHaveText(checkMark)
    }
})

Then('no explanation answer is displayed', async function () {
    expect(await this.takeQuestionPage.answerExplanationLocator().count()).toBe(0)
})
