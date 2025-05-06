import type React from 'react'
import './answer.scss'
import successIcon from 'assets/icons/checkmark.svg'
import errorIcon from 'assets/icons/error.svg'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly isUserSelected: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
}

export const Answer = (props: AnswerProps) => {
    const answerId = `answer-row-${props.idx}`
    const checkType = props.isMultipleChoice ? 'checkbox' : 'radio'
    const checkName = props.isMultipleChoice ? answerId : 'answer'

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAnswerChange(props.idx, event.target.checked)
    }

    function getCustomStyle(): React.HTMLAttributes<HTMLLIElement> {
        return {
            style: {
                width: '100%',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: getBgColor(),
                color: props.showFeedback && props.isUserSelected ? 'white' : 'black',
                border: getBorder(),
            },
        }
    }

    function getBorder() {
        if (!props.showFeedback) {
            return ''
        }

        if (!props.isUserSelected && !props.isCorrect) {
            return '2px solid #F2A91E'
        }

        return ''
    }

    function getBgColor() {
        if (!props.showFeedback) {
            return ''
        }

        if (props.isUserSelected && props.isCorrect) {
            return '#087F19'
        }
        if (props.isUserSelected && !props.isCorrect) {
            return '#F35757'
        }
        return ''
    }

    return (
        <li data-testid={`answer-row-${props.answer}`} key={props.idx} {...getCustomStyle()}>
            <input type={checkType} name={checkName} id={answerId} value={props.answer} onChange={onChange} />
            <label htmlFor={answerId} className="answer-label">
                {props.answer}
                {!props.isUserSelected && !props.isCorrect && props.showFeedback && (
                    <span className="answer-should-been-checked">Měl(a) jsi označit</span>
                )}
                {props.isUserSelected && !props.isCorrect && props.showFeedback && (
                    <img src={errorIcon} alt="error" className="answer-incorrect-icon" />
                )}
                {props.isUserSelected && props.isCorrect && props.showFeedback && (
                    <img src={successIcon} alt="success" className="answer-correct-icon" />
                )}
            </label>
            <br />
            <br />
        </li>
    )
}
