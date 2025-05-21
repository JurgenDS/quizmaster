import type { Page, TestInfo } from '@playwright/test'


import {
    CreateQuestionPage,
    CreateQuestionListPage,
    QuizQuestionPage,
    TakeQuestionPage,
    QuizScorePage,
    CreateQuizPage,
    QuizWelcomePage,
    QuestionListPage,
} from '../../pages'
import type { Question } from './question'

export class QuizmasterWorld {
    constructor(
        public page: Page,
        public testInfo: TestInfo,
    ) {
        this.createQuestionPage = new CreateQuestionPage(this.page)
        this.createQuestionListPage = new CreateQuestionListPage(this.page)
        this.takeQuestionPage = new TakeQuestionPage(this.page)
        this.quizQuestionPage = new QuizQuestionPage(this.page)
        this.quizWelcomePage = new QuizWelcomePage(this.page)
        this.quizScorePage = new QuizScorePage(this.page)
        this.createQuizPage = new CreateQuizPage(this.page)
        this.questionListPage = new QuestionListPage(this.page)
    }

    readonly createQuizPage: CreateQuizPage
    readonly createQuestionPage: CreateQuestionPage
    readonly createQuestionListPage: CreateQuestionListPage
    readonly takeQuestionPage: TakeQuestionPage
    readonly quizQuestionPage: QuizQuestionPage
    readonly quizWelcomePage: QuizWelcomePage
    readonly quizScorePage: QuizScorePage
    readonly questionListPage: QuestionListPage
    quizId = ''

    questionWip: Question = { url: '', editUrl: '', question: '', answers: [], explanation: '' }
    questionListWipGuid: string = ''
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
