import { expect } from '@playwright/test'
import { When, Then } from './fixture.ts'
import type { DataTable } from '@cucumber/cucumber'

When('I bookmark question {string}', async function (questionTitle: string) {
    await this.quizQuestionPage.toggleBookmark()
    this.activeBookmark = questionTitle
})

When('I bookmark question {string} again', async function () {
    await this.quizQuestionPage.toggleBookmark()
})

Then('the bookmark indicator is active for question {string}', async function () {
    await expect(this.quizQuestionPage.bookmarkIndicator()).toHaveClass(/active/)
})

Then('the bookmark indicator is inactive for question {string}', async function () {
    await expect(this.quizQuestionPage.bookmarkIndicator()).not.toHaveClass(/active/)
})

Then('the bookmark list contains', async function (table: DataTable) {
    const expected = table.raw().flat()
    const actual = await this.quizQuestionPage.bookmarkListItemsText()
    expect(actual).toEqual(expected)
})

Then('the bookmark list shows {int} item', async function (count: number) {
    await expect(this.quizQuestionPage.bookmarkListItems()).toHaveCount(count)
})

Then('the bookmark list is empty', async function () {
    await expect(this.quizQuestionPage.bookmarkListItems()).toHaveCount(0)
})

Then('no question is bookmarked', async function () {
    const count = await this.quizQuestionPage.activeBookmarksCount()
    expect(count).toBe(0)
})

When('I refresh the page', async function () {
    await this.page.reload()
})
