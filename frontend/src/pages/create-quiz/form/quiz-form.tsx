import { useRef, useState } from 'react'
import { postQuiz } from '../../../api/quiz.ts'
import type { QuizCreateRequest } from '../../../model/quiz-question.ts'

export interface QuizFormData {
    title: string
    description: string
    mode: string
    passscore: number
}

export const QuizEditForm = () => {
    const [mode, setMode] = useState('exam')
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)
    const passScoreRef = useRef<HTMLInputElement>(null)

    function submitQuiz() {
        const quiz: QuizFormData = {
            title: '',
            description: '',
            mode: 'exam',
            passscore: 0,
        }

        quiz.title = titleRef.current?.value || ''
        quiz.description = descriptionRef.current?.value || ''
        quiz.mode = mode
        quiz.passscore = Number.parseInt(passScoreRef.current?.value ?? '0')
        console.log(quiz)

        const quizApi: QuizCreateRequest = {
            id: 0,
            title: quiz.title,
            description: quiz.description,
            afterEach: quiz.mode === 'exam',
            passScore: quiz.passscore,
            questionIds: [1, 2],
        }

        postQuiz(quizApi)
    }

    return (
        <form id="question-create-form">
            <>
                <label htmlFor="quiz-title">Enter quiz name: </label>
                <input type="text" id="quiz-title" ref={titleRef} />
            </>
            <br />
            <br />
            <>
                <label htmlFor="quiz-description">Enter quiz description: </label>
                <input ref={descriptionRef} type="text" id="quiz-description" />
            </>
            <br />
            <br />
            <>
                <label htmlFor="quiz-mode">Select quiz mode: </label>
                <input
                    type="radio"
                    id="quiz-mode-exam"
                    name="quiz-mode"
                    value="exam"
                    checked={mode === 'exam'}
                    onClick={() => setMode('exam')}
                />
                <label htmlFor="quiz-mode-exam">Exam</label>
                <input
                    type="radio"
                    id="quiz-mode-learning"
                    name="quiz-mode"
                    value="learning"
                    checked={mode === 'learning'}
                    onClick={() => setMode('learning')}
                />
                <label htmlFor="quiz-mode-learning">Learning</label>
            </>
            <br />
            <br />
            <>
                <label htmlFor="quiz-passscore">Enter quiz passscore: </label>
                <input ref={passScoreRef} type="number" id="quiz-passscore" />
            </>
            <div>
                <button
                    id="submit-quiz-button"
                    onClick={() => {
                        submitQuiz()
                    }}
                    type="submit"
                    className="submit-button"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
