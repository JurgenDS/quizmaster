import { Button, type WithOnClick } from 'pages/components/button'

export const NextQuestionButton = ({ onClick }: WithOnClick) => (
    <Button id="next-question" onClick={onClick}>
        Next Question
    </Button>
)

export const EvaluateButton = ({ onClick }: WithOnClick) => (
    <Button id="evaluate-button" className="submit-btn-evaluate" onClick={onClick}>
        Evaluate
    </Button>
)
