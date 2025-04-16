import { Correctness, Explanation } from 'pages/question-take'
import { AnswerCorrectness } from './answer-correctness'
import { useState } from 'react'

interface AnswerFeedbackProps {
    readonly correct: boolean
    readonly explanation: string
    readonly isMultipleChoice: boolean
    readonly isUserSelected: boolean
}

export const AnswerFeedback = (props: AnswerFeedbackProps) => {

    return(
        <span>
        &nbsp;
        {props.isMultipleChoice ? (
            <AnswerCorrectness isCorrect={props.correct} isUserSelected={props.isUserSelected} />
        ) : (
            <Correctness isCorrect={props.correct} />
        )}
        &nbsp;
        {props.isUserSelected && props.correct && "You checked the answer correctly"}
        {props.isUserSelected && !props.correct && "You checked the answer incorrectly"}
        {!props.isUserSelected && !props.correct && "You should have checked the answer"}
        {!props.isUserSelected && props.correct && "You did not check the answer correctly"}
        <span className="explanation">{<Explanation text={props.explanation} />}</span>
    </span>
    )
}
