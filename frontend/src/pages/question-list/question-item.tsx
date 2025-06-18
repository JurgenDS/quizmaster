import type { QuizQuestion } from 'model/quiz-question'
import { EditQuestionButton } from './question-list.tsx'

interface Props {
    question: QuizQuestion
    index?: number
    onEditQuestion: () => void
}

export const QuestionItem: React.FC<Props> = ({ question, index, onEditQuestion }) => {
    return (
        <div className="question-item">
            {index !== undefined && <span className="question-index">Q{index + 1}. </span>}
            <span id="question-text">{question.question}</span>
            <div className="edit-button">
                <EditQuestionButton id={question.hash} hash={question.hash} onClick={onEditQuestion} />
            </div>
        </div>
    )
}
