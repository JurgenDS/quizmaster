import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QuestionTakePage } from 'pages/question-take'
import { HomePage } from 'pages/home'
import { QuizPage } from 'pages/quiz'

import { QuizCreatePage } from 'pages/create-quiz'

import QuizWelcomePage from 'pages/quiz-welcome.tsx'

import { CreateQuestionContainer } from 'pages/create-question/create-question-container'
import { EditQuestionContainer } from 'pages/create-question/edit-question-container'
import QuizOverview from './pages/quiz-overview.tsx'

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/question/new" element={<CreateQuestionContainer />} />
            <Route path="/quiz/" element={<QuizPage />} />
            <Route path="/quiz/create" element={<QuizCreatePage />} />
            <Route path="/quiz/:id/overview" element={<QuizOverview />} />
            <Route path="/quiz/:id" element={<QuizWelcomePage />} />
            <Route path="/quiz/:id/questions" element={<QuizPage />} />
            <Route path="/quiz/aftereach" element={<QuizPage />} />
            <Route path="/question/:id/edit" element={<EditQuestionContainer />} />
            <Route path="/question/:id" element={<QuestionTakePage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
)
