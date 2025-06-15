import type { DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, expectTextToContain } from './common.ts'
import { Then, When } from './fixture.ts'
import type { Question } from './world/question.ts'
import type { TakeQuestionPage } from '../pages/take-question-page.ts'

enum Color {
    GREEN = '✅',
    RED = '❌',
    NONE = '⚪',
}

const colorCssValue: { [key in Color]: string } = {
    [Color.GREEN]: 'rgb(178, 223, 178)',
    [Color.RED]: 'rgb(244, 182, 184)',
    [Color.NONE]: 'rgba(0, 0, 0, 0)',
}

const colorExplanationCssValue: { [key in Color]: string } = {
    [Color.GREEN]: 'rgb(15, 62, 15)',
    [Color.RED]: 'rgb(90, 21, 24)',
    [Color.NONE]: 'rgb(0, 0, 0)',
}

function getColor(color: string): string {
    return colorCssValue[color as Color] || ''
}

function getExplanationColor(color: string): string {
    return colorExplanationCssValue[color as Color] || ''
}

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
        await expect(this.takeQuestionPage.answerExplanationLocatorForAnswer(answer)).toHaveText(
            `Explanation: ${explanation}`,
        )
    }
})

Then('I see the {string} question for the quiz', async function (questionName: string) {
    await expectTextToContain(this.takeQuestionPage.questionLocator(), questionName)
})

Then('I see individual color feedback per answer:', async function (dataTable: DataTable) {
    const rows = dataTable.hashes()

    for (const row of rows) {
        const { answer, color } = row
        const answerRow = this.page.getByTestId(`answer-row-${answer}-color`)
        // const explanationRow = this.page.getByTestId(`answer-row-${answer}-explanation`)
        const answerRowResultIconSuccess = this.page.getByTestId(`answer-row-${answer}-icon-success`)
        const answerRowResultIconFailure = this.page.getByTestId(`answer-row-${answer}-icon-failure`)
        // await expect(explanationRow).toHaveCSS('color', getExplanationColor(color))
        await expect(answerRow).toHaveCSS('background-color', getColor(color))
        if (color === Color.NONE) {
            await expect(answerRowResultIconSuccess).not.toBeVisible()
            await expect(answerRowResultIconFailure).not.toBeVisible()
        } else {
            if (color === Color.GREEN) {
                await expect(answerRowResultIconSuccess).toBeVisible()
                await expect(answerRowResultIconFailure).not.toBeVisible()
            }
            if (color === Color.RED) {
                await expect(answerRowResultIconFailure).toBeVisible()
                await expect(answerRowResultIconSuccess).not.toBeVisible()
            }
        }
    }
})

Then('no explanation answer is displayed', async function () {
    expect(await this.takeQuestionPage.answerExplanationLocator().count()).toBe(0)
})
