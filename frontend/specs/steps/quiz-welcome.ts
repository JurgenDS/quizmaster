import { expectTextToBe } from './common.ts'
import { Then } from './fixture.ts'

Then('I see the welcome page', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.headerLocator(), 'Welcome to the quiz')
})

Then('I see quiz name {string}', async function (quizName: string) {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.nameLocator(), quizName)
})

Then('I see quiz description', async function () {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(
        welcomePage.descriptionLocator(),
        'Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper pellentesque leo at porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam eu massa a neque imperdiet convallis in vel erat.',
    )
})

Then('I see question count {int}', async function (questionCount: number) {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.questionCountLocator(), `Question count: ${questionCount}`)
})

Then('I see feedback type {string}', async function (feedbackType: string) {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.feedbackLocator(), feedbackType)
})

Then('I see pass score {int}%', async function (passScore: number) {
    const welcomePage = this.quizWelcomePage
    await expectTextToBe(welcomePage.passScoreLocator(), `Pass score: ${passScore} %`)
})
