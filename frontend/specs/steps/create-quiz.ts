import { expect } from '@playwright/test'

import { Given, Then, When } from './fixture.ts'
import type { QuizmasterWorld } from './world/world.ts'

const openCreatePage = async (world: QuizmasterWorld) => {
    world.createQuizPage.gotoNew()
}

const enterQuestion = async (world: QuizmasterWorld, index: number, question: string) => {
    await world.createQuizPage.enterQuestion(index, question)
}

const createQuiz = async (world: QuizmasterWorld, quiz: string) => {
    await world.createQuizPage.createQuiz(quiz)
}

const addQuestion = async (world: QuizmasterWorld, index: number) => {
    await world.createQuizPage.addQuestion(index)
}

const saveQuiz = async (world: QuizmasterWorld) => {
    await world.createQuizPage.submit()
    world.questionWip.url = (await world.createQuizPage.quizUrl()) || ''
}

Given('I create new quiz', async function () {
    await openCreatePage(this)
})

When('I enter quiz {string}', async function (quiz: string) {
    await createQuiz(this, quiz)
})

When('I fill the question {int} and {string}', async function (index: number, question: string) {
    await enterQuestion(this, index, question)
})

When('I add question {int}', async function (index: number) {
    await addQuestion(this, index)
})

When('I save the quiz', async function () {
    await saveQuiz(this)
})

Then('I see a link to take the quiz', async function () {
    const url = await this.createQuizPage.quizUrl()
    expect(url).not.toBe('')
})
