import type { Page, TestInfo } from '@playwright/test'

import { CreateQuestionPage, QuizQuestionPage as QuizQuestionPage, TakeQuestionPage, QuizScorePage, CreateQuizPage, QuizWelcomePage } from '../../pages'
import type { Question } from './question'
import { QuizOverviewPage } from '../../pages/quiz-overview-page.ts'

export class QuizmasterWorld {
    constructor(
        public page: Page,
        public testInfo: TestInfo,
    ) {
        this.createQuestionPage = new CreateQuestionPage(this.page)
        this.takeQuestionPage = new TakeQuestionPage(this.page)
        this.quizQuestionPage = new QuizQuestionPage(this.page)
        this.quizWelcomePage = new QuizWelcomePage(this.page)
        this.quizScorePage = new QuizScorePage(this.page)
        this.quizOverviewPage = new QuizOverviewPage(this.page)
        this.createQuizPage = new CreateQuizPage(this.page)
    }

    readonly createQuizPage: CreateQuizPage
    readonly createQuestionPage: CreateQuestionPage
    readonly takeQuestionPage: TakeQuestionPage
    readonly quizQuestionPage: QuizQuestionPage
    readonly quizWelcomePage: QuizWelcomePage
    readonly quizScorePage: QuizScorePage
    readonly quizOverviewPage: QuizOverviewPage

    questionWip: Question = { url: '', editUrl: '', question: '', answers: [], explanation: '' }
    nextAnswerIdx = 0
    bookmarks: Record<string, Question> = {}
    activeBookmark = ''
    get activeQuestion() {
        return this.bookmarks[this.activeBookmark]
    }

    parseAnswers(answersString: string) {
        return answersString.split(',').map(answer => answer.trim())
    }
}
