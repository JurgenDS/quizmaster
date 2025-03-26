import './create-question.scss'

import { ErrorMessage, LoadedIndicator, QuestionEditLink, QuestionLink } from './components'
import { type QuestionFormData, QuestionEditForm } from './form'

type Props = {
    questionData: QuestionFormData
    setQuestionData: (data: QuestionFormData) => void
    handleSubmit: () => void
    errorMessage: string
    linkToQuestion: string
    linkToEditQuestion: string
    isLoaded: boolean
}

export function CreateQuestionForm({
    errorMessage,
    isLoaded,
    handleSubmit,
    linkToEditQuestion,
    linkToQuestion,
    questionData,
    setQuestionData,
}: Props) {
    return (
        <div className="question-page">
            <h1>Quiz Question Creation Page</h1>
            <h2>If you're happy and you know it create the question</h2>
            <QuestionEditForm questionData={questionData} setQuestionData={setQuestionData} onSubmit={handleSubmit} />
            <ErrorMessage errorMessage={errorMessage} />
            <h3>Link to see the question:</h3>
            <QuestionLink url={linkToQuestion} />
            <h3>Link to edit the question:</h3>
            <QuestionEditLink editUrl={linkToEditQuestion} />
            <LoadedIndicator isLoaded={isLoaded} />
        </div>
    )
}
