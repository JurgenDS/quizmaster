import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { HomePage } from 'pages/home'
import { Quiz } from 'pages/quiz'
import { QuizScore } from 'pages/quiz-score'
import { CreateQuestionContainer } from 'pages/create-question/create-question-container'
import { EditQuestionContainer } from 'pages/create-question/edit-question-container'
import type { QuizResult } from 'model/quiz-question'

const quizResult: QuizResult = {
    questions: [
        {
            question: 1,
            answer: [0],
            result: true,
        },
        {
            question: 2,
            answer: [2],
            result: true,
        },
    ],
}

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionContainer />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/question/:id/edit" element={<EditQuestionContainer />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz-score" element={<QuizScore quizResult={quizResult} />} />
        </Routes>
    </BrowserRouter>
)
