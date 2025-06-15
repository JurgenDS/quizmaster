import type React from 'react'
import { Explanation } from './explanation.tsx'

export interface AnswerProps {
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

    const className = props.isCorrect
        ? props.isUserSelected
            ? 'correctly-selected'
            : 'correctly-not-selected'
        : 'incorrect'

    return (
        <li key={props.idx}>
            <div className={`answer-input-row ${props.showFeedback ? className : ''}`}>
                <input
                    type={checkType}
                    name={checkName}
                    id={answerId}
                    value={props.answer}
                    onChange={onChange}
                    checked={isChecked}
                />
                <label htmlFor={answerId}>{props.answer}</label>
                {props.showFeedback && <div className="answer-feedback">{props.isCorrect ? '✅' : '❌'}</div>}
            </div>
            {props.showFeedback && props.explanation && <Explanation text={props.explanation} />}
        </li>
    )
}
