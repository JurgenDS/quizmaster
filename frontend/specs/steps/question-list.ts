import { expectedNumberOfChildrenToBe, expectTextToBe } from './common.ts'
import { Then } from './fixture.ts'

Then('I see the empty question list', async function () {
    await expectedNumberOfChildrenToBe(this.page.getByTestId('question-holder'), 0)
})

Then('I see question list title {string}', async function (title: string) {
    await expectTextToBe(this.page.getByTestId('question-list-title'), title)
})
