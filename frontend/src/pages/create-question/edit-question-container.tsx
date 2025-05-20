import './create-question.scss'
import { useParams } from 'react-router-dom'
import { type QuestionApiData, getQuestionByHash, updateQuestion } from 'api/quiz-question.ts'

import { CreateQuestionForm } from './create-question'
import { BaseQuestionContainer } from './BaseQuestionContainer'

export function EditQuestionContainer() {
    const params = useParams()
    const questionHash = params.id

    const fetchQuestionData = async () => {
        if (questionHash) {
            return await getQuestionByHash(questionHash)
        }
        return undefined
    }

    const processData = async (formData: QuestionApiData) => {
        if (!questionHash) {
            throw new Error('Question hash is not defined')
        }

        return updateQuestion(formData, questionHash)
            .then(response => {
                return `${location.origin}/question/${response}`
            })
            .catch(error => error.message)
    }

    const { questionData, setQuestionData, isLoaded, linkToQuestion, errorMessage, handleSubmit } =
        BaseQuestionContainer({ fetchQuestionData, processData })

    return (
        <CreateQuestionForm
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            isLoaded={isLoaded}
            linkToEditQuestion=""
            linkToQuestion={linkToQuestion}
            questionData={questionData}
            setQuestionData={setQuestionData}
        />
    )
}
