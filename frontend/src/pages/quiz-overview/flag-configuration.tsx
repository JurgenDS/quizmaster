import './quiz-overview.scss'
import { Quiz } from '../../model/quiz-question.ts'

interface FlagConfigurationProps {
    children: string
    updateQuiz: (updater: (prev: Quiz) => Quiz) => void
    value: boolean
}

export default function FlagConfiguration(props: FlagConfigurationProps) {
    function changeConfiguration(e: React.ChangeEvent<HTMLInputElement>) {
        props.updateQuiz(prevState => ({
            ...prevState,
            afterEach: e.target.checked,
        }))
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
