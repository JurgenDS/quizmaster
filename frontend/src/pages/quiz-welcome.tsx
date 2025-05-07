import { StartButton } from './quiz/buttons'
import { useNavigate, useParams } from 'react-router-dom'

const QuizWelcomePage = () => {
    const navigate = useNavigate()
    const params = useParams()

    const onStart = () => {
        console.log('Quiz started')
        navigate(`/quiz/${params.id}/questions`)
    }

    return (
        <>
            <h2>Welcome to the quiz</h2>
            <StartButton onClick={onStart} />
        </>
    )
}

export default QuizWelcomePage
