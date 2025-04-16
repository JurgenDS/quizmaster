import { fetchJson, putJson } from './helpers.ts'
import { Quiz } from '../model/quiz-question.ts'

export const getQuiz = async (quizId: string) => await fetchJson<Quiz>(`/api/quiz/${quizId}`)

export const putQuiz = async (quiz: Quiz, id: string) => await putJson<Quiz, string>(`/api/quiz/${id}`, quiz)
