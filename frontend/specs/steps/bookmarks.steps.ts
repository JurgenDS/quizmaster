import { expect } from '@playwright/test'
import { When, Then } from './fixture.ts'

Then('I see bookmarked question {string}', async function () {
    await expect(this.quizQuestionPage.bookmarkIndicator()).toHaveClass(/bookmarked/)
})

When('I click bookmark {string}', async function (questionTitle: string) {
    await this.quizQuestionPage.clickBookmark(questionTitle)
})

When('I bookmark question {string}', async function (questionTitle: string) {
    await this.quizQuestionPage.clickAddQuestionToBookmark(questionTitle)
})
