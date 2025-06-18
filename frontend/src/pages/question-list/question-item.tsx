import type { QuizQuestion } from 'model/quiz-question'
import { EditQuestionButton, onEditQuestion } from "./question-list.tsx";

interface Props {
    question: QuizQuestion
    index?: number
}

export const QuestionItem: React.FC<Props> = ({ question, index }) => {
    return (
        <div className="question-item">
            {index !== undefined && <span className="question-index">Q{index + 1}. </span>}
            <span id="question-text">{question.question}</span>
            <div className="edit-button">
                <EditQuestionButton id={question.question} onClick={() => onEditQuestion(question.question)} />
            </div>
        </div>

    )
}
