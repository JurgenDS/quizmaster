import { StartButton } from './quiz/buttons'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuiz } from '../api/quiz.ts'
import { useEffect, useState } from 'react'
import type { Quiz } from 'model/quiz-question'

const QuizWelcomePage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [quiz, setQuiz] = useState<Quiz>()

    const onStart = () => {
        console.log('Quiz started')
        navigate(`/quiz/${params.id}/questions`)
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            if (params.id) {
                setQuiz(await getQuiz(Number(params.id)))
            }
        }
        fetchQuiz()
    }, [params.id])

    if (quiz) {
        return (
            <>
                <h2>Welcome to the quiz</h2>
                <h3 id="quiz-name">{quiz.id}</h3>
                <p id="quiz-description">
                    Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper pellentesque leo
                    at porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    Nam eu massa a neque imperdiet convallis in vel erat.
                </p>
                <p>
                    Question count: <span id="question-count">{quiz.questions.length}</span>
                </p>
                <p id="pass-score">
                    Pass score: <span id="pass-score">{quiz.passScore}</span>%
                </p>
                <p id="question-feedback">{quiz.afterEach ? 'Continuous feedback' : 'Feedback at the end'}</p>
                <StartButton onClick={onStart} />
            </>
        )
    }
}

export default QuizWelcomePage
