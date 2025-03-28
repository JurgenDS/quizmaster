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

export const EvaluateButton = ({ onClick }: NextQuestionButtonProps) => (
    <button id="evaluate-button" type="button" className="submit-btn submit-btn-evaluate" onClick={onClick}>
        Evaluate
    </button>
)
