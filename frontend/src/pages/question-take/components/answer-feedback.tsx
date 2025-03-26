import { Correctness, Explanation } from 'pages/question-take'
import { AnswerCorrectness } from './answer-correctness'

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
    readonly isMultipleChoice: boolean
    readonly isChecked: boolean
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => (
    <span>
        &nbsp;
        {props.isMultipleChoice ? (
            <AnswerCorrectness isCorrect={props.correct} />
        ) : (
            <Correctness isCorrect={props.correct} />
        )}
        &nbsp;
        <span className="explanation">
            {<Explanation text={props.explanation} />}
        </span>
    </span>
)
