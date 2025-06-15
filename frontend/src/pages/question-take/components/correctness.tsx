import './correctness.css'

interface CorrectnessProps {
    readonly isCorrect: boolean
    readonly correctAnswers: string[]
}

export const Correctness = (props: CorrectnessProps) => {
    const label = props.isCorrect ? 'Correct!' : 'Incorrect!'

    const className = props.isCorrect ? 'correct' : 'incorrect'

    return <span className={`feedback ${className}`}>{label}</span>
}

export const QuestionCorrectness = (props: CorrectnessProps) => (
    <>
        <h2 style={{ color: '#0A285C', fontWeight: 'bolder', fontSize: '22px' }}>Vysvětlení:</h2>
        <p className="question-feedback" style={{ fontSize: '16px', fontWeight: 'normal' }}>
            The answer is:&nbsp;
            <Correctness {...props} />
        </p>
    </>
)
