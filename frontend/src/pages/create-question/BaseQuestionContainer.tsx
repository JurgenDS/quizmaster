import { useState, useEffect } from 'react'
import type { QuestionApiData } from 'api/quiz-question.ts'
import { emptyQuestionFormData, toQuestionApiData, toQuestionFormData } from './form'

interface BaseQuestionContainerProps {
    fetchQuestionData: () => Promise<QuestionApiData | undefined>
    processData: (formData: QuestionApiData) => Promise<string | undefined>
}

export function BaseQuestionContainer({ fetchQuestionData, processData }: BaseQuestionContainerProps) {
    const [questionData, setQuestionData] = useState(emptyQuestionFormData())
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [linkToQuestion, setLinkToQuestion] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        const fetchAndSetQuestion = async () => {
            const fetchedData = await fetchQuestionData()
            if (fetchedData) {
                const formData = toQuestionFormData(fetchedData)
                setQuestionData(formData)
                setIsLoaded(true)
            }
        }

        fetchAndSetQuestion()
    }, [fetchQuestionData])

    const handleSubmit = async () => {
        setErrorMessage('')
        const apiData = toQuestionApiData(questionData)

        if (apiData.correctAnswers.length === 0) {
            setErrorMessage('At least one correct answer must be selected')
            return
        }

        const answersCount = apiData.answers.length
        for (let i = 0; i < answersCount; i++) {
            if (apiData.answers[i] === '') {
                setErrorMessage('All answers must be filled in')
                return
            }
        }

        let explanationNotEmptyCounter = 0
        const explanationCount = apiData.explanations.length

        for (let i = 0; i < explanationCount; i++) {
            if (apiData.explanations[i] !== '') {
                explanationNotEmptyCounter++
            }
        }

        if (explanationNotEmptyCounter !== 0 && explanationNotEmptyCounter !== explanationCount) {
            setErrorMessage('All or none explanation must be filled in.')
            return
        }

        if (apiData.question === '') {
            setErrorMessage('Question must not be empty.')
            return
        }

        const link = await processData(apiData)
        if (link) {
            setLinkToQuestion(link)
        } else {
            setLinkToQuestion('')
        }
    }

    return {
        questionData,
        setQuestionData,
        isLoaded,
        linkToQuestion,
        errorMessage,
        handleSubmit,
    }
}
