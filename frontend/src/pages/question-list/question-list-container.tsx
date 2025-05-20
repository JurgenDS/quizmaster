import './question-list.scss'
import { useState } from 'react'

import { emptyQuestionListData } from './form'
import { QuestionList } from './question-list'

export function QuestionListContainer() {
    const [questionListData] = useState(emptyQuestionListData())

    return <QuestionList questionListData={questionListData} />
}
