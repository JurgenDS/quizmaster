import './question-list.scss'
import { Button, type WithOnClick } from 'pages/components/button'
import { useParams, useNavigate } from 'react-router-dom'
import type { QuestionListData } from '.'
import { QuestionItem } from './question-item'

type Props = {
    questionListData?: QuestionListData
}

export const CreateQuestionButton = ({ onClick }: WithOnClick) => (
    <Button id="create-question" onClick={onClick}>
        Create New Question
    </Button>
)

export function QuestionList({ questionListData }: Props) {
    const params = useParams()
    const navigate = useNavigate()

    const questionListId = params.id

    const onCreateNewQuestion = () => {
        navigate(`/question/new?listguid=${questionListId}`)
    }

    return questionListData ? (
        <div className="question-list-page">
            <h1 data-testid="question-list-title">{questionListData.title}</h1>
            <div className="create-button">
                <CreateQuestionButton onClick={() => onCreateNewQuestion()} />
            </div>
            <div className="question-holder">
                {questionListData.questions.map((q, index) => (
                    <QuestionItem key={q.id || index} question={q} index={index} />
                ))}
            </div>
        </div>
    ) : null
}
