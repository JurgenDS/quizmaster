import { useState } from 'react'
import type { QuestionFormProps } from './question-form'

export interface QuestionTakeState {
    readonly isMultipleChoice: boolean
    readonly selectedAnswerIdxs: number[]
    readonly submitted: boolean
    readonly submit: () => void
    readonly onSelectedAnswerChange: (idx: number, selected: boolean) => void
}

export const useQuestionTakeState = (props: QuestionFormProps): QuestionTakeState => {
    const question = props.question
    const isMultipleChoice = question.correctAnswers.length > 1

    const [selectedAnswerIdxs, setSelectedAnswerIdxs] = useState<number[]>([])

    const setSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs([idx])
    const addSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => [...prev, idx])
    const removeSelectedAnswerIdx = (idx: number) => setSelectedAnswerIdxs(prev => prev.filter(i => i !== idx))

    const [submitted, setSubmitted] = useState(props.isSubmitted ?? false)

    const submit = () => setSubmitted(true)

    const onSelectedAnswerChange = (idx: number, selected: boolean) => {
        setSubmitted(false)
        if (!isMultipleChoice) setSelectedAnswerIdx(idx)
        else if (selected) addSelectedAnswerIdx(idx)
        else removeSelectedAnswerIdx(idx)
    }

    return {
        isMultipleChoice,
        selectedAnswerIdxs,
        submitted,
        submit,
        onSelectedAnswerChange,
    }
}
