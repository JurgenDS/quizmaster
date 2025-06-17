import { SubmitButton } from 'pages/components/submit-button.tsx'
import { preventDefault } from 'helpers.ts'
import {
    type AnswerData,
    AnswersEdit,
    MultipleChoiceEdit,
    QuestionEdit,
    QuestionExplanationEdit,
    EasyModeChoiceEdit,
    type QuestionFormData,
} from 'pages/create-question/form'

interface QuestionEditProps {
    readonly questionData: QuestionFormData
    readonly setQuestionData: (questionData: QuestionFormData) => void
    readonly onSubmit: () => void
}

function setMultipleChoiceInQuestionData(isMultipleChoice: boolean, questionData: QuestionFormData): QuestionFormData {
    const numberOfCorrectAnswers = questionData.answers.filter(answer => answer.isCorrect).length

    return {
        ...questionData,
        isMultipleChoice,
        answers:
            !isMultipleChoice && numberOfCorrectAnswers > 1
                ? questionData.answers.map(answer => ({ ...answer, isCorrect: false }))
                : questionData.answers,
    }
}

function setEasyModeChoiceInQuestionData(isEasyModeChoice: boolean, questionData: QuestionFormData): QuestionFormData {
    return {
        ...questionData,
        isEasyModeChoice,
    }
}

export const QuestionEditForm = ({ questionData, setQuestionData, onSubmit }: QuestionEditProps) => {
    const setQuestion = (question: string) => setQuestionData({ ...questionData, question })
    const setIsMultipleChoice = (isMultipleChoice: boolean) =>
        setQuestionData(setMultipleChoiceInQuestionData(isMultipleChoice, questionData))
    const setIsEasyModeChoice = (isEasyModeChoice: boolean) =>
        setQuestionData(setEasyModeChoiceInQuestionData(isEasyModeChoice, questionData))
    const setAnswers = (answers: readonly AnswerData[]) => setQuestionData({ ...questionData, answers })
    const setQuestionExplanation = (questionExplanation: string) =>
        setQuestionData({ ...questionData, questionExplanation })

    return (
        <form id="question-create-form" onSubmit={preventDefault(onSubmit)}>
            <QuestionEdit question={questionData.question} setQuestion={setQuestion} />
            <MultipleChoiceEdit
                isMultipleChoice={questionData.isMultipleChoice}
                setIsMultipleChoice={setIsMultipleChoice}
            />
            <EasyModeChoiceEdit
                isEasyModeChoice={questionData.isEasyModeChoice}
                setIsEasyModeChoice={setIsEasyModeChoice}
            />
            <AnswersEdit
                answers={questionData.answers}
                setAnswers={setAnswers}
                isMultichoiceQuestion={questionData.isMultipleChoice}
            />
            <QuestionExplanationEdit
                questionExplanation={questionData.questionExplanation}
                setQuestionExplanation={setQuestionExplanation}
            />
            <div>
                <SubmitButton />
            </div>
        </form>
    )
}
