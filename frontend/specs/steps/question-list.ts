import { expectedNumberOfChildrenToBe, expectTextToBe, expectTextToContain } from './common.ts'
import { Given, When, Then } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'

const openQuestionList = async (world: QuizmasterWorld, guid: string) => {
    await world.questionListPage.goto(guid)
    world.questionListWipGuid = guid
}

const createQuestionToList = async (world: QuizmasterWorld, question: string) => {
    await world.questionListPage.createNewQuestion()
    await world.createQuestionPage.enterQuestion(question)
    world.questionWip.question = question
    await world.createQuestionPage.enterAnswer(0, 'Ne', true, '')
    world.questionWip.answers[0] = { answer: 'Ne', isCorrect: true, explanation: 'ne' }
    await world.createQuestionPage.enterAnswer(1, 'Ano', false, '')
    world.questionWip.answers[1] = { answer: 'Ano', isCorrect: false, explanation: 'jo' }
    await world.createQuestionPage.submit()
}

Given('I open question list {string}', async function (guid: string) {
    await openQuestionList(this, guid)
})

When('I create new question to list {string}', async function (question: string) {
    await createQuestionToList(this, question)
})

Then('I see an empty question list', async function () {
    await expectedNumberOfChildrenToBe(this.page.getByTestId('question-holder'), 0)
})

Then('I see question in list {string}', async function (question: string) {
    await expectTextToContain(this.page.getByText(question), question)
})

Then('I see question list title {string}', async function (title: string) {
    await expectTextToBe(this.page.getByTestId('question-list-title'), title)
})
