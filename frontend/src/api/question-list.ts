import type { QuestionListCreateResponse } from 'model/question-list-create-response.ts'
import type { QuestionListGetResponse } from 'model/question-list-get-response.ts'
import { postJson, fetchJson } from './helpers.ts'
import type { QuestionList } from 'model/question-list.ts'
import { QuizQuestion } from 'model/quiz-question.ts'

export type QuestionListApiData = QuestionList

export const postQuestionList = async (questionListApiData: QuestionListApiData) =>
    await postJson<QuestionListApiData, QuestionListCreateResponse>('/api/q-list', questionListApiData)

export const getQuestionList = async (guid: string) => await fetchJson<QuestionListGetResponse>(`/api/q-list/${guid}`)

export const getListQuestions = async (guid: string) =>
    await fetchJson<QuizQuestion[]>(`/api/quiz-question/by-question-list/${guid}`)
