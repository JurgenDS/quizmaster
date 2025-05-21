import type React from 'react'
import './answer.scss'
import { Explanation2 } from './explanation.tsx'
import successIcon from '../../../assets/icons/checkmark.svg'
import errorIcon from '../../../assets/icons/error.svg'

export type AnswerProps = {
    readonly isMultipleChoice: boolean
    readonly idx: number
    readonly answer: string
    readonly explanation: string
    readonly isCorrect: boolean
    readonly isUserSelected: boolean
    readonly showFeedback: boolean
    readonly onAnswerChange: (idx: number, selected: boolean) => void
    readonly isAnswerChecked: (idx: number) => boolean
}

export const Answer = (props: AnswerProps) => {
    const answerId = `answer-row-${props.idx}`
    const checkType = props.isMultipleChoice ? 'checkbox' : 'radio'
    const checkName = props.isMultipleChoice ? answerId : 'answer'

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAnswerChange(props.idx, event.target.checked)
    }

    const isChecked = props.isAnswerChecked(props.idx)

    const isCorrectAnswer = props.isCorrect && props.isUserSelected
    const isWrongAnswer = !props.isCorrect && props.isUserSelected
    const wasNotAnswerd = !props.isUserSelected && !props.isCorrect

    function getColor() {
        if (!props.showFeedback) {
            return ''
        }

        if (isWrongAnswer || wasNotAnswerd) {
            return '#5a1518'
        }
        if (isCorrectAnswer) {
            return '#0f3e0f'
        }
        return ''
    }

    function getBgColor() {
        if (!props.showFeedback) {
            return ''
        }

        if (isWrongAnswer || wasNotAnswerd) {
            return '#f4b6b8'
        }

        if (isCorrectAnswer) {
            return '#b2dfb2'
        }
        return ''
    }

    return (
        <li data-testid={`answer-row-${props.answer}`} key={props.idx} style={{ width: '100%' }}>
            <div
                data-testid={`answer-row-${props.answer}-color`}
                style={{
                    width: '100%',
                    backgroundColor: getBgColor(),
                    borderRadius: '8px',
                    padding: '8px',
                }}
            >
                <div className="answer-input-row">
                    <div className="answer-left-group">
                        <input
                            type={checkType}
                            name={checkName}
                            id={answerId}
                            value={props.answer}
                            onChange={onChange}
                            checked={isChecked}
                        />
                        <label htmlFor={answerId} className="">
                            {props.answer}
                        </label>
                    </div>
                    {props.showFeedback && (
                        <div>
                            {isCorrectAnswer && (
                                <img
                                    data-testid={`answer-row-${props.answer}-icon-success`}
                                    src={successIcon}
                                    alt="success-icon"
                                />
                            )}
                            {(isWrongAnswer || wasNotAnswerd) && (
                                <img
                                    data-testid={`answer-row-${props.answer}-icon-failure`}
                                    src={errorIcon}
                                    alt="error-icon"
                                />
                            )}
                        </div>
                    )}
                </div>
                {props.showFeedback && props.explanation && (
                    <div
                        data-testid={`answer-row-${props.answer}-explanation`}
                        style={{
                            color: getColor(),
                            marginTop: '8px',
                            marginLeft: '8px',
                        }}
                    >
                        {<Explanation2 text={props.explanation} />}
                    </div>
                )}
            </div>
        </li>
    )
}
