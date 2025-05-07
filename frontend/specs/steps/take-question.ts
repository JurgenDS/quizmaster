import type { DataTable } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { expectTextToBe, expectTextToContain } from './common.ts'
import { Then, When } from './fixture.ts'

enum Color {
    GREEN = 'GREEN',
    ORANGE = 'ORANGE',
    RED = 'RED',
    NONE = 'NONE',
}

const colorCssValue: { [key in Color]: string } = {
    [Color.GREEN]: 'rgb(8, 127, 25)',
    [Color.ORANGE]: '2px solid rgb(242, 169, 30)',
    [Color.RED]: 'rgb(243, 87, 87)',
    [Color.NONE]: 'rgba(0, 0, 0, 0)',
}

function getColor(color: string): string {
    return colorCssValue[color as Color] || ''
}

When('I take question {string}', async function (bookmark: string) {
    await this.page.goto(this.bookmarks[bookmark].url)
    this.activeBookmark = bookmark
})

Then('I see the question and the answers', async function () {
    await expectTextToBe(this.takeQuestionPage.questionLocator(), this.activeQuestion.question)
    const answers = this.activeQuestion.answers
    const answerLocators = this.takeQuestionPage.answersLocator()

    expect(await answerLocators.count()).toBe(answers.length)

    for (const [index, { answer }] of answers.entries()) {
        const answerLocator = answerLocators.nth(index)
        await expectTextToBe(answerLocator, answer)
    }
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

Then(/^I see the answer explanations for answers$/, async function (data: DataTable) {
    for (const row of data.rows()) {
        const [answer, expectedExplanation] = row
        const answerExplanationLocator =
            expectedExplanation !== ''
                ? this.takeQuestionPage.answerExplanationLocatorForAnswer(answer)
                : this.takeQuestionPage.emptyAnswerExplanationLocatorForAnswer(answer)
        await expectTextToBe(answerExplanationLocator, expectedExplanation)
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
        const answerRowResult = this.page.getByTestId(`answer-row-${answer}-result`)
        const answerRowResultIconSuccess = this.page.getByTestId(`answer-row-${answer}-icon-success`)
        const answerRowResultTextFailure = this.page.getByTestId(`answer-row-${answer}-icon-failure`)
        if (color === 'ORANGE') {
            await expect(answerRow).toHaveCSS('border', getColor(color))
            await expect(answerRowResult).toBeVisible()
            await expect(answerRowResultIconSuccess).not.toBeVisible()
            await expect(answerRowResultTextFailure).not.toBeVisible()
        } else {
            await expect(answerRow).toHaveCSS('background-color', getColor(color))
            if (color === 'GREEN') {
                await expect(answerRowResultIconSuccess).toBeVisible()
                await expect(answerRowResultTextFailure).not.toBeVisible()
            }
            if (color === 'RED') {
                await expect(answerRowResultTextFailure).toBeVisible()
                await expect(answerRowResultIconSuccess).not.toBeVisible()
            }
        }
    }
})

Then('no explanation answer is displayed', async function () {
    expect(await this.takeQuestionPage.answerExplanationLocator().count()).toBe(0)
})
