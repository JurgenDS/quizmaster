import type React from 'react'
import './answer.scss'
import { AnswerFeedback } from './answer-feedback'

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

    return (
        <li
            data-testid={`answer-row-${props.answer}`}
            key={props.idx}
            style={{ position: 'relative', height: '45px', width: '100%' }}
        >
            <input type={checkType} name={checkName} id={answerId} value={props.answer} onChange={onChange} />
            <label htmlFor={answerId} className="">
                {props.answer}
            </label>
            {props.showFeedback && (
                <AnswerFeedback
                    isCorrect={props.isCorrect}
                    explanation={props.explanation}
                    isMultipleChoice={props.isMultipleChoice}
                    isUserSelected={props.isUserSelected}
                    showFeedback={props.showFeedback}
                />
            )}
        </li>
    )
}
