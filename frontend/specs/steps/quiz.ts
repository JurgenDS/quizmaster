import { expect } from '@playwright/test'
import { expectTextToBe, expectThatIsNotVisible, expectThatIsVisible } from './common.ts'
import { Given, When, Then } from './fixture.ts'

Given('I visit the Quiz create page', async function () {
    await this.page.goto('/quiz/create')
})

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

Then('I should see heading "Create quiz"', async function () {
    await expectTextToBe(this.page.locator('h1'), 'Create quiz')
})

Then('I see the first question', async function () {
    const firstQuestion = this.bookmarks.Sky
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
})

Then('I see the welcome page', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.headerLocator(), 'Welcome to the quiz')
})

Then('I see quiz name', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.nameLocator(), 'a')
})

Then('I see quiz description', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(
        welcomePage.descriptionLocator(),
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper pellentesque leo at porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam eu massa a neque imperdiet convallis in vel erat.',
    )
})

Then('I see question count', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.questionCountLocator(), 'Question count: 2')
})

Then('I see feedback type', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.feedbackLocator(), 'Feedback at the end')
})

Then('I see pass score', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.passScoreLocator(), 'Pass score: 85 %')
})

Then('I see the b question', async function () {
    const firstQuestion = this.bookmarks.BQuestion
    await expectTextToBe(this.takeQuestionPage.questionLocator(), firstQuestion.question)
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

When('I click the next button', async function () {
    await this.quizQuestionPage.next()
})
When('I click the skip button', async function () {
    await this.quizQuestionPage.skip()
})

When('I click the start button', async function () {
    await this.quizWelcomePage.start()
})
Then('I should see the next question', async function () {
    const secondQuestion = this.bookmarks.France
    await expectTextToBe(this.takeQuestionPage.questionLocator(), secondQuestion.question)
})

Then('I should see the first question', async function () {
    await expectTextToBe(this.takeQuestionPage.questionLocator(), 'What is the standard colour of sky?')
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

Then(
    'I should see the progress bar showing page {int} of {int}',
    async function (expectedValue: number, maxValue: number) {
        const progressBarValue = await this.quizQuestionPage.progressBarLocator().getAttribute('value')
        expect(progressBarValue).toBe(expectedValue.toString())
        const progressBarMaxValue = await this.quizQuestionPage.progressBarLocator().getAttribute('max')
        expect(progressBarMaxValue).toBe(maxValue.toString())
    },
)

Then('I should see heading "Quiz overview"', async function () {
    await expectTextToBe(this.page.locator('h1'), 'Quiz overview')
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
