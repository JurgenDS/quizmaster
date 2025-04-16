import { useParams } from 'react-router-dom'

export const QuestionListPage = () => {
    const { id } = useParams()

    const questionsA = [
        { id: 11, name: 'What countries are in Europe?' },
        { id: 20, name: 'What is capital of Czech Republic?' },
    ]

    const questionsB = [
        { id: 21, name: 'What is the standard colour of sky?' },
        { id: 18, name: 'What is capital of France?' },
    ]

    const questions =
        id === 'a3f5b4e8c12e4a8e9f3b5f84d3a7b8d4f9c1e2a6b7d9f8e2c5a1b9e3d7c6f2a9'
            ? questionsA
            : id === 'e9c3a7b1d5f2e4c9a8b6f1d3c7e2a4b5f6d9c1e7b3a5d8c2f4a6b1e9d7c3f8a1'
              ? questionsB
              : []

    return (
        <div>
            <h2>Question list</h2>
            {questions.map(question => (
                <p key={question.id}>
                    <a href={`/question/${question.id}?source=questionList`}>{question.name}</a>
                </p>
            ))}
        </div>
    )
}
