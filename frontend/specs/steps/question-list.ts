import { expect } from '@playwright/test'
import { expectTextToBe } from './common.ts'
import { Given, Then } from './fixture.ts'

Given('I visit the questionlist for {string} page', async function (hash: string) {
    await this.page.goto(`/question-list/${hash}`)
})

Then('I should see a questionlist displayed', async function () {
    await expectTextToBe(this.page.locator('h2'), 'Question list')
})

Then('I see a link to the question {string}', async function (questionNumber: string) {
    const questionLink = await this.page.locator(`a[href="/question/${questionNumber}?source=questionList"]`)
    await expect(questionLink).toHaveCount(1)
})

Then('I do not see a link to the question {string}', async function (questionNumber: string) {
    const questionLink = await this.page.locator(`a[href="/question/${questionNumber}?source=questionList"]`)
    await expect(questionLink).toHaveCount(0)
})
