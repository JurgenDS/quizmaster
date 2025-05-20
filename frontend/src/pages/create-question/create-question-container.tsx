import './create-question.scss'
import { useParams } from 'react-router-dom'
import { type QuestionApiData, saveQuestion, getQuestion } from 'api/quiz-question.ts'

import { CreateQuestionForm } from './create-question'
import { BaseQuestionContainer } from './BaseQuestionContainer'

export function CreateQuestionContainer() {
    const params = useParams()
    const questionId = params.id ? Number.parseInt(params.id) : undefined

    const fetchQuestionData = async () => {
        if (questionId) {
            return await getQuestion(questionId)
        }
        return undefined
    }

    const processData = async (formData: QuestionApiData) => {
        return saveQuestion(formData)
            .then(response => {
                return `${location.origin}/question/${response.id}`
            })
            .catch(error => error.message)
    }

    const { questionData, setQuestionData, isLoaded, linkToQuestion, errorMessage, handleSubmit } =
        BaseQuestionContainer({ fetchQuestionData, processData })

    const linkToEditQuestion = `${location.origin}/question/:hash/edit`

    return (
        <CreateQuestionForm
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            isLoaded={isLoaded}
            linkToEditQuestion={linkToEditQuestion}
            linkToQuestion={linkToQuestion}
            questionData={questionData}
            setQuestionData={setQuestionData}
        />
    )
}
