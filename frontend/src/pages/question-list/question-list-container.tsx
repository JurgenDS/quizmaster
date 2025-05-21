import './question-list.scss'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { emptyQuestionListData } from '.'
import { questionListAData } from '.'
import { questionListBData } from '.'
import { questionListCData } from '.'
import { QuestionList } from './question-list'

export function QuestionListContainer() {
    const params = useParams()

    const [questionListData] = (() => {
        switch (params.id) {
            case 'a':
                return useState(questionListAData())
            case 'b':
                return useState(questionListBData())
            case 'c':
                return useState(questionListCData())
            default:
                return useState(emptyQuestionListData())
        }
    })()

    return <QuestionList questionListData={questionListData} />
}
