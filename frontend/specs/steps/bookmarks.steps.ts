import { expect } from '@playwright/test'
import { When, Then } from './fixture.ts'

Then('I see bookmarked question {string}', async function () {
    const indicator = this.quizQuestionPage.bookmarkIndicator()
    await indicator.waitFor({ state: 'attached' })
    await expect(indicator).toHaveClass(/bookmarked/)
})

When('I click bookmark {string}', async function (questionTitle: string) {
    await this.quizQuestionPage.clickBookmark(questionTitle)
})

When('I bookmark question {string}', async function (questionTitle: string) {
    await this.quizQuestionPage.clickAddQuestionToBookmark(questionTitle)
})

Then('I see bookmark link {string}', async function (questionTitle: string) {
    await expect(this.quizQuestionPage.bookmarkLink(questionTitle)).toBeVisible()
})
