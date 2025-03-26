import { Link } from 'react-router-dom'

interface NextQuestionButtonProps {
    readonly onClick: () => void
}

export const NextQuestionButton = ({ onClick }: NextQuestionButtonProps) => (
    <div>
        <button id="next-question" type="button" className="submit-btn" onClick={onClick}>
            Next Question
        </button>
    </div>
)

export const EvaluateButton = () => (
    <Link to="score" id="evaluate-button" className="submit-btn submit-btn-evaluate">
        Evaluate
    </Link>
)
