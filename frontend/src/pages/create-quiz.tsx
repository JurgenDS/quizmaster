import { SubmitButton } from 'pages/components/submit-button.tsx'

export const QuizCreatePage = () => (
    <>
        <h1>Create quiz</h1>

        <form>
            Název kvízu
            <input id="quiz-title" type="text" />
            <div>
                <SubmitButton />
            </div>
        </form>
    </>
)
