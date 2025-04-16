import './correctness.css'

interface AnswerCorrectnessProps {
    readonly isCorrect: boolean
    readonly isUserSelected: boolean


}

export const AnswerCorrectness = (props: AnswerCorrectnessProps) => {
    const evaluation = props.isCorrect ? '\u2705' : '\u274C'
    const individualFeedback = props.isCorrect ? 'Correct' : 'Incorrect!'


    const className = props.isCorrect ? 'correct' : 'incorrect'

    return (
        <span>
            {evaluation} <span className={`feedback ${className}`}>{individualFeedback}</span>
        </span>
    )
}
