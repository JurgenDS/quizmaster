import type { QuestionListCreateResponse } from 'model/question-list-create-response.ts'
import { postJson } from './helpers.ts'
import { QuestionList } from 'model/question-list.ts'

export type QuestionListApiData = QuestionList

export const getQuestionList = async (questionListApiData: QuestionListApiData) =>
    await postJson<QuestionListApiData, QuestionListCreateResponse>('/api/q-list', questionListApiData)
