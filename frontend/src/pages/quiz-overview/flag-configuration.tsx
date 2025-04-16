import './quiz-overview.scss'
import type { Quiz } from '../../model/quiz-question.ts'

interface FlagConfigurationProps {
    children: string
    updateQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>>
    value: boolean
}

export default function FlagConfiguration(props: FlagConfigurationProps) {
    function changeConfiguration(e: React.ChangeEvent<HTMLInputElement>) {
        props.updateQuiz(prevState => {
            if (!prevState) return prevState

            return {
                ...prevState,
                afterEach: e.target.checked,
            }
        })
    }

    return (
        <div className="flag-configuration">
            <input
                defaultChecked={props.value}
                id="configuration-checkbox"
                type="checkbox"
                onChange={e => changeConfiguration(e)}
            />
            <p>{props.children}</p>
        </div>
    )
}
