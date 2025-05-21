import { Button, type WithOnClick } from 'pages/components/button'

export const NextButton = ({ onClick }: WithOnClick) => (
    <Button id="next" onClick={onClick}>
        Next Question
    </Button>
)

export const EvaluateButton = ({ onClick }: WithOnClick) => (
    <Button id="evaluate" className="submit-btn-evaluate" onClick={onClick}>
        Evaluate
    </Button>
)
export const BackButton = ({ onClick }: WithOnClick) => (
    <Button id="back" onClick={onClick}>
        Back
    </Button>
)

export const SkipButton = ({ onClick }: WithOnClick) => (
    <Button id="skip" onClick={onClick}>
        Skip
    </Button>
)

export const StartButton = ({ onClick }: WithOnClick) => (
    <Button id="start" onClick={onClick}>
        Start
    </Button>
)

export const BookmarkButton = ({ onClick }: WithOnClick) => (
    <Button id="add-question-to-bookmark" onClick={onClick}>
        Bookmark
    </Button>
)
