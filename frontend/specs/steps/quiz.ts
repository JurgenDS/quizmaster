import { expect } from '@playwright/test'
import { expectTextToBe, expectThatIsNotVisible, expectThatIsVisible } from './common.ts'
import { Given, When, Then } from './fixture.ts'
import { expectQuestion } from './take-question.ts'

Given(/quiz "(\w+)" with (\d+) questions, pass score (\d+)% and (feedback at the end|continuous feedback)/, () => {})

Given('I open quiz {string}', async function (quizId: string) {
    await this.quizQuestionPage.goto(quizId)
})

Given('I start quiz {string}', async function (quizId: string) {
    await this.quizQuestionPage.goto(quizId)
    await this.quizWelcomePage.start()
})

Then('I see question {string}', async function (bookmark: string) {
    const question = this.bookmarks[bookmark]
    await expectQuestion(this.takeQuestionPage, question)
})

Then('I should see the next button', async function () {
    await expect(this.quizQuestionPage.nextButtonLocator()).toBeVisible()
})

Then('I should see the skip button', async function () {
    await expect(this.quizQuestionPage.skipButtonLocator()).toBeVisible()
})

Then('I should not see the skip button', async function () {
    await expect(this.quizQuestionPage.skipButtonLocator()).not.toBeVisible()
})

Then('I should not see the next button', async function () {
    await expect(this.quizQuestionPage.nextButtonLocator()).not.toBeVisible()
})

When('I proceed to the next question', async function () {
    await this.quizQuestionPage.next()
})

When('I click the next button', async function () {
    await this.quizQuestionPage.next()
})

When('I click the skip button', async function () {
    await this.quizQuestionPage.skip()
})

When('I click the start button', async function () {
    await this.quizWelcomePage.start()
})

Then('I should see the evaluate button', async function () {
    await expect(this.quizQuestionPage.evaluateButtonLocator()).toBeVisible()
})

Then('I should not see the evaluate button', async function () {
    await expect(this.quizQuestionPage.evaluateButtonLocator()).not.toBeVisible()
})

Then('I click the evaluate button', async function () {
    await this.quizQuestionPage.evaluate()
})

Given('I refresh page', async function () {
    await this.page.reload()
})

Then('I should see answer {string} is checked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).toBeChecked()
    }
})

Then('I should see answer {string} is unchecked', async function (answerList: string) {
    const answers = this.parseAnswers(answerList)
    for (const element of answers) {
        await expect(this.takeQuestionPage.answerLocator(element)).not.toBeChecked()
    }
})

Then('I should not see the answer', async function () {
    await expectThatIsNotVisible(this.takeQuestionPage.feedbackLocator())
})

Then('I should see the answer', async function () {
    await expectThatIsVisible(this.takeQuestionPage.feedbackLocator())
})

Then('progress shows {int} of {int}', async function (current: number, max: number) {
    expect(await this.quizQuestionPage.progressCurrent()).toBe(current)
    expect(await this.quizQuestionPage.progressMax()).toBe(max)
})

Then('I should see the text "Game over time"', async function () {
    await expectTextToBe(this.page.getByTestId('modal-timeout'), 'Game over time')
})

Then('I should see the back button', async function () {
    await expect(this.quizQuestionPage.backButtonLocator()).toBeVisible()
})

Then('I should not see the back button', async function () {
    await expect(this.quizQuestionPage.backButtonLocator()).not.toBeVisible()
})

When('I click the back button', async function () {
    await this.quizQuestionPage.back()
})

Then('I should see the countdown timer {string}', async function (timer: string) {
    const timerDiv = this.page.getByTestId('timerID')
    await expectTextToBe(timerDiv, timer)
})

Then('I should see the countdown timer after delay is less then {string}', async function (timer: string) {
    await this.page.clock.install({ time: new Date('2023-10-01T00:01:30Z') })
    await expectTextToBe(this.page.getByTestId('timerID'), timer)
    // await this.page.clock.runFor(30000)
    await this.page.clock.fastForward('02:00')
    await expectTextToBe(this.page.getByTestId('timerID'), timer)
})
