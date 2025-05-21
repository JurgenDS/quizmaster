import type { AnswerIdxs, QuizQuestion } from 'model/quiz-question.ts'
import {
    Answer,
    useQuestionFeedbackState,
    useQuestionTakeState,
    QuestionCorrectness,
    QuestionExplanation,
} from 'pages/question-take'

export interface QuestionFormProps {
    readonly question: QuizQuestion
    readonly onSubmitted?: (selectedAnswerIdxs: AnswerIdxs) => void
    readonly afterEach: boolean
}

export const QuestionForm = (props: QuestionFormProps) => {
    const state = useQuestionTakeState(props)
    const feedback = useQuestionFeedbackState(state, props.question)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (state.selectedAnswerIdxs.length > 0) {
            state.submit()
            props.onSubmitted?.(state.selectedAnswerIdxs)
        }
    }

    const isAnswerChecked = state.selectedAnswerIdxs.length > 0

    return (
        <form onSubmit={handleSubmit} id="question-form">
            <h1>{props.question.question}</h1>

            <div className="question-form-legend">
                {state.isMultipleChoice ? 'this question is multi-čois' : 'this question is single choice'}
            </div>

            <ul>
                {props.question.answers.map((answer, idx) => (
                    <Answer
                        key={answer}
                        isMultipleChoice={state.isMultipleChoice}
                        idx={idx}
                        answer={answer}
                        isCorrect={feedback.isAnswerCorrect(idx)}
                        isUserSelected={feedback.isUserSelected(idx)}
                        explanation={props.question.explanations ? props.question.explanations[idx] : 'not defined'}
                        showFeedback={state.submitted && feedback.showFeedback(idx) && props.afterEach}
                        onAnswerChange={state.onSelectedAnswerChange}
                        isAnswerChecked={state.isAnswerChecked}
                    />
                ))}
            </ul>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                {!state.submitted && (
                    <input
                        type="submit"
                        value="Submit"
                        className={isAnswerChecked ? 'submit-btn' : 'submit-btn-disabled'}
                        disabled={!isAnswerChecked}
                    />
                )}
            </div>
            {state.submitted && props.afterEach && (
                <QuestionCorrectness
                    correctAnswers={props.question.answers.filter((_, idx) =>
                        props.question.correctAnswers.includes(idx),
                    )}
                    isCorrect={feedback.isQuestionCorrect}
                />
            )}

            {state.submitted && props.afterEach && <QuestionExplanation text={props.question.questionExplanation} />}
        </form>
    )
}
