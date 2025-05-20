import './create-question-list.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { emptyQuestionListFormData } from './form'
import { CreateQuestionListForm } from './create-question-list'

export function CreateQuestionListContainer() {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()

    const [questionListData, setQuestionListData] = useState(emptyQuestionListFormData())

    const handleSubmit = () => {
        setErrorMessage('')

        if (questionListData.title.length === 0) {
            setErrorMessage('Title must be filled')
            return
        }

        navigate('/q-list/123456')
    }

    return (
        <CreateQuestionListForm
            errorMessage={errorMessage}
            handleSubmit={handleSubmit}
            questionListData={questionListData}
            setQuestionListData={setQuestionListData}
        />
    )
}
