import type { QuizQuestion } from 'model/quiz-question'

export interface QuizScore {
    readonly correct: number
    readonly total: number
}

interface QuizScoreProps {
    readonly score: QuizScore
    readonly questions: QuizQuestion[]
}

export const QuizScore = ({ score, questions }: QuizScoreProps) => {
    const { correct, total } = score
    const percentage = (correct / total) * 100
    const result = percentage >= 85 ? 'passed' : 'failed'

    return (
        <>
            <h1>Výsledok testu</h1>
            <p>
                Správne odpovede: <span id="correct-answers">{correct}</span>
            </p>
            <p>
                Celkový počet otázok: <span id="total-questions">{total}</span>
            </p>
            <p>
                Úspešnosť(%): <span id="percentage-result">{percentage.toFixed(2)}</span>
            </p>
            <p>
                Stav: <span id="text-result">{result}</span>
            </p>
            <hr />
            <h2>Přehled odpovědí</h2>

            {questions.map(question => (
                <div key={question.id} id={`question-${question.id}`}>
                    <p id={`question-${question.id}-name`}>{question.question}</p>
                    <ul id={`question-${question.id}-answers`}>
                        {question.answers.map((answer, idx) => (
                            <>
                                <li id={`answer-${answer}-question-${question.id}`}>{answer}</li>
                                <li id={`explanation-${idx}-question-${question.id}`}>Vysvětlení: {question.explanations.at(idx)}</li>
                            </>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}
