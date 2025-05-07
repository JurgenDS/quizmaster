import { SubmitButton } from 'pages/components/submit-button.tsx'
import { useState } from 'react'
import { QuestionsEdit } from './quiz/questions-edit'

export const QuizCreatePage = () => {
    // const setQuestions = (answers: readonly string[]) => setQuestionsData({ ...questions, answers })
    const [questions, setQuestions] = useState<string[]>([])

    const updateQuestions = (index: number, newValue: string) => {
        const newQuestions = [...questions]
        newQuestions[index] = newValue
        setQuestions(newQuestions)
    }

    console.log(questions)

    return (
        <>
            <h1>Create quiz</h1>

            <form>
                <div>
                    Název kvízu
                    <input id="quiz-title" type="text" />
                </div>

                {questions.map((question, idx) => (
                    <QuestionsEdit index={idx} question={question} updateQuestions={updateQuestions} />
                ))}

                <div>
                    <button id="add-question" type="button" onClick={() => setQuestions([...questions, ''])}>
                        Add question
                    </button>
                </div>
                <div>
                    <SubmitButton />
                </div>
            </form>
        </>
    )
}

export const AddQuestionButton = ({ addQuestion }: AddQuestionProps) => (
    <div>
        <button type="button" onClick={addQuestion}>
            Add Question
        </button>
    </div>
)

interface AddQuestionProps {
    readonly addQuestion: () => void
}
