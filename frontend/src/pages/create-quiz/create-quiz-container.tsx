import './create-quiz.scss'
import { useState } from 'react'

import { CreateQuestionForm } from './create-quiz.tsx'

export function CreateQuizContainer() {
    const [isLoaded] = useState<boolean>(false)
    const [linkToQuestion] = useState<string>('')
    const [errorMessage] = useState<string>('')

    return <CreateQuestionForm errorMessage={errorMessage} isLoaded={isLoaded} linkToQuiz={linkToQuestion} />
}
