import { expectTextToBe } from './common.ts'
import { Given, Then } from './fixture.ts'

Given('I visit the questionlist page', async function () {
    await this.page.goto('/question-list')
})

Then('I should see a questionlist displayed', async function () {
    await expectTextToBe(this.page.locator('h2'), 'Question list')
})
