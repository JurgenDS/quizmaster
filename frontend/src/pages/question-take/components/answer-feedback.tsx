import { Explanation } from 'pages/question-take'
import './answer-feedback.scss'
import successIcon from 'assets/icons/checkmark.svg'
import errorIcon from 'assets/icons/error.svg'

interface AnswerFeedbackProps {
    readonly isCorrect: boolean
    readonly explanation: string
    readonly isMultipleChoice: boolean
    readonly isUserSelected?: boolean
    readonly showFeedback: boolean
    readonly answer: string
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => {
    console.log(props.isCorrect)

    const isCorrectAnswer = props.isCorrect && props.isUserSelected
    const isWrongAnswer = !props.isCorrect && props.isUserSelected
    const wasNotAnswerd = !props.isUserSelected && !props.isCorrect

    function getBorder() {
        if (!props.showFeedback) {
            return ''
        }

        if (wasNotAnswerd) {
            return '2px solid #F2A91E'
        }

        return ''
    }

    function getBgColor() {
        if (!props.showFeedback) {
            return ''
        }

        if (isCorrectAnswer) {
            return '#087F19'
        }

        if (isWrongAnswer) {
            return '#F35757'
        }
        return ''
    }

    return (
        <span
            data-testid={`answer-row-${props.answer}-color`}
            className="answer-feedback-wrapper"
            style={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                height: props.explanation ? '100%' : '95%',
                width: '100%',
                backgroundColor: getBgColor(),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '8px',
                color: props.showFeedback && props.isUserSelected ? 'white' : 'black',
                border: getBorder(),
                zIndex: -1,
            }}
        >
            <span />
            {props.explanation && (props.isUserSelected || wasNotAnswerd) && (
                <span data-testid={`answer-row-${props.answer}-explanation`} className="explanation">
                    {<Explanation text={props.explanation} />}
                </span>
            )}
            <div style={{ marginRight: '15px' }}>
                {isCorrectAnswer && (
                    <img data-testid={`answer-row-${props.answer}-icon-success`} src={successIcon} alt="success-icon" />
                )}
                {isWrongAnswer && (
                    <img data-testid={`answer-row-${props.answer}-icon-failure`} src={errorIcon} alt="error-icon" />
                )}
                {wasNotAnswerd && (
                    <span data-testid={`answer-row-${props.answer}-result`} className="answer-should-been-checked">
                        SHOULD BE CHECKED
                    </span>
                )}
            </div>
        </span>
    )
}
