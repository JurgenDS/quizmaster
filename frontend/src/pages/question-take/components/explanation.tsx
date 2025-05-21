import './explanation.scss'

interface ExplanationProps {
    readonly text: string
    readonly styleClassName?: string
}

export const Explanation = (props: ExplanationProps) => (
    <span className={props.styleClassName ?? 'explanation'}>
        Explanation: <span className="explanationText">{props.text}</span>
    </span>
)

export const QuestionExplanation = (props: ExplanationProps) => <p className="question-explanation">{props.text}</p>
