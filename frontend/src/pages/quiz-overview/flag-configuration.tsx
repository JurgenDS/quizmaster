import './quiz-overview.scss'

interface FlagConfigurationProps {
    children: string
}

export default function FlagConfiguration(props: FlagConfigurationProps) {
    return (
        <div className="flag-configuration">
            <input type="checkbox" />
            <p>{props.children}</p>
        </div>
    )
}
