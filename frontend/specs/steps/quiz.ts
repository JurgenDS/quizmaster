import { expect } from '@playwright/test'
import { expectTextToBe, expectThatIsNotVisible, expectThatIsVisible } from './common.ts'
import { Given, When, Then } from './fixture.ts'

Given('I visit the quiz page {string}', async function (quizName: string) {
    await this.page.goto(`/quiz/${quizName}`)
})

Given('I visit the quiz overview page {string}', async function (id: string) {
    await this.page.goto(`/quiz/${id}/overview`)
})

When('I changed the "Show feedback after each question" checkbox {string}', async function (value: string) {
    const booleanValue = value.toLowerCase() === 'true'
    await this.quizOverviewPage.setCheckboxValue(booleanValue)
    await this.quizOverviewPage.saveButtonLocator().click()
})

Then('I should see checkbox {string}', async function (value: string) {
    const expectedValue = value.toLowerCase() === 'true'
    const isChecked = await this.quizOverviewPage.checkboxLocator().isChecked()
    expect(isChecked).toBe(expectedValue)
})

When('I reload page', async function () {
    await this.page.reload()
})

Given('I visit the afterEach quiz page', async function () {
    await this.page.goto('/quiz/aftereach')
})

Then('I should see heading "Quiz"', async function () {
    await expectTextToBe(this.page.locator('h2'), 'Quiz')
})

Then('I see the first question', async function () {
    const firstQuestion = this.bookmarks.Sky
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I see the b question', async function () {
    const firstQuestion = this.bookmarks.BQuestion
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I should see the next button', async function () {
    await expect(this.quizPage.nextButtonLocator()).toBeVisible()
})

Then('I should see the skip button', async function () {
    await expect(this.quizPage.skipButtonLocator()).toBeVisible()
})

Then('I should not see the skip button', async function () {
    await expect(this.quizPage.skipButtonLocator()).not.toBeVisible()
})

Then('I should not see the next button', async function () {
    await expect(this.quizPage.nextButtonLocator()).not.toBeVisible()
})

When('I click the next button', async function () {
    await this.quizPage.next()
})
When('I click the skip button', async function () {
    await this.quizPage.skip()
})
Then('I should see the next question', async function () {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})

Then('I should see the evaluate button', async function () {
    await expect(this.quizPage.evaluateButtonLocator()).toBeVisible()
})

Then('I should not see the evaluate button', async function () {
    await expect(this.quizPage.evaluateButtonLocator()).not.toBeVisible()
})

Then('I click the evaluate button', async function () {
    await this.quizPage.evaluate()
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

Then(
    'I should see the progress bar showing page {int} of {int}',
    async function (expectedValue: number, maxValue: number) {
        const progressBarValue = await this.quizPage.progressBarLocator().getAttribute('value')
        expect(progressBarValue).toBe(expectedValue.toString())
        const progressBarMaxValue = await this.quizPage.progressBarLocator().getAttribute('max')
        expect(progressBarMaxValue).toBe(maxValue.toString())
    },
)

Then('I should see heading "Quiz overview"', async function () {
    await expectTextToBe(this.page.locator('h1'), 'Quiz overview')
})

Then('I should see the back button', async function () {
    await expect(this.quizPage.backButtonLocator()).toBeVisible()
})

Then('I should not see the back button', async function () {
    await expect(this.quizPage.backButtonLocator()).not.toBeVisible()
})

When('I click the back button', async function () {
    await this.quizPage.back()
})

Then('I should see the countdown timer {string}', async function (timer:string) {
    const timerDiv = this.page.getByTestId('timerID');
    await expectTextToBe(timerDiv, timer)
})
