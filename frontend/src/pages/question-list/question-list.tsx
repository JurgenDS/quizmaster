import './question-list.scss'

import type { QuestionListData } from './form'

type Props = {
    questionListData: QuestionListData
}

export function QuestionList({ questionListData }: Props) {
    return (
        <div className="question-list-page">
            <h1 data-testid="question-list-title">{questionListData.title}</h1>
        </div>
    )
}
