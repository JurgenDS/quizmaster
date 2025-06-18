import './create-quiz.scss'

import { QuizEditForm } from './form'
import { ErrorMessage, LoadedIndicator, QuestionLink } from '../create-question/components.tsx'

type Props = {
    errorMessage: string
    linkToQuiz: string
    isLoaded: boolean
}

export function CreateQuestionForm({ errorMessage, isLoaded, linkToQuiz }: Props) {
    return (
        <div className="quiz-page">
            <h1>Quiz Creation Page</h1>
            <QuizEditForm />
            <ErrorMessage errorMessage={errorMessage} />
            <QuestionLink url={linkToQuiz} />
            <LoadedIndicator isLoaded={isLoaded} />
            <br />
        </div>
    )
}
