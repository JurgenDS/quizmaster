import { useParams } from 'react-router-dom'
import FlagConfiguration from './quiz-overview/flag-configuration.tsx'
import { useEffect, useState } from 'react'
import type { Quiz } from '../model/quiz-question.ts'
import { getQuiz, putQuiz } from '../api/quiz.ts'

export default function QuizOverview() {
    const { id } = useParams<{ id: string }>()

    const [quiz, setQuiz] = useState<Quiz>()

    useEffect(() => {
        const fetchQuiz = async () => {
            if (id) {
                setQuiz(await getQuiz(id))
            }
        }
        fetchQuiz()
    }, [id])

    if (!quiz) {
        return <div>quiz doesnt exist</div>
    }

    async function saveQuiz() {
        if (!quiz || !id) return
        await putQuiz(quiz, id)
    }

    return (
        <>
            <h1>Quiz overview</h1>
            <h2>{id}</h2>
            <p>{JSON.stringify(quiz)}</p>
            {quiz && (
                <FlagConfiguration value={quiz.afterEach} updateQuiz={setQuiz}>
                    Show feedback after each question
                </FlagConfiguration>
            )}

            <button type="button" id="save" onClick={saveQuiz}>
                save
            </button>
        </>
    )
}
