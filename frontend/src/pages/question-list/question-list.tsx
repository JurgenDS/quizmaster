import './question-list.scss'
import { Button, type WithOnClick } from 'pages/components/button'
import { useParams, useNavigate } from 'react-router-dom'
import type { QuestionListData } from '.'
import { QuestionItem } from './question-item'

type Props = {
    questionListData?: QuestionListData
}

type EditQuestionButtonProps = WithOnClick & { id: string }

export const CreateQuestionButton = ({ onClick }: WithOnClick) => (
    <Button id="create-question" onClick={onClick}>
        Create New Question
    </Button>
)

export const EditQuestionButton = ({ onClick, id }: EditQuestionButtonProps) => (
    <Button id={id} className="edit-question" onClick={onClick}>
        Edit
    </Button>
)

export const onEditQuestion = (questionId: string) => {
    console.log(questionId)
    const navigate = useNavigate()
    navigate(`/question/${questionId}/edit`)
}

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
