import {useParams} from "react-router-dom";
import FlagConfiguration from "./quiz-overview/flag-configuration.tsx";

export default function QuizOverview() {

    const { id } = useParams<{ id: string }>()

    return(
        <>
            <h1>Quiz overview</h1>
            <h2>{id}</h2>
            <FlagConfiguration>Show feedback after each question</FlagConfiguration>
        </>
    )
}
