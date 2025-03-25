import type { QuizQuestion } from 'model/quiz-question.ts'
import type { QuestionCreateResponse } from 'model/question-create-response.ts'
import { fetchJson, postJson, patchJson } from './helpers.ts'

export const getQuestion = async (questionId: number | string) =>
    await fetchJson<QuizQuestion>(`/api/quiz-question/${questionId}`)

export type QuestionApiData = Omit<QuizQuestion, 'id'>

export const saveQuestion = async (question: QuestionApiData) =>
    await postJson<QuestionApiData, QuestionCreateResponse>('/api/quiz-question', question)

export const updateQuestion = async (question: QuestionApiData, id: number) =>
    await patchJson<QuestionApiData, number>(`/api/quiz-question/${id}`, question)
