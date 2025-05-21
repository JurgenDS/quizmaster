import './explanation.scss'

interface ExplanationProps {
    readonly text: string
}

export const Explanation = (props: ExplanationProps) => (
    <span className="explanation">
        Explanation: <span className="explanationText">{props.text}</span>
    </span>
)

export const Explanation2 = (props: ExplanationProps) => (
    <span className="explanation2">
        Explanation: <span className="explanationText">{props.text}</span>
    </span>
)

export const QuestionExplanation = (props: ExplanationProps) => <p className="question-explanation">{props.text}</p>
