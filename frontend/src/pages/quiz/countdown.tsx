import { useEffect, useState } from 'react'

export const Countdown = ({ setTimeoutReached }: { setTimeoutReached: (value: boolean) => void }) => {
    const durationMs = 2 * 60 * 1000 // 2 minuty
    const endTime = Date.now() + durationMs

    const [timeLeft, setTimeLeft] = useState(durationMs)

    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeLeft = endTime - Date.now()
            if (newTimeLeft <= 0) {
                clearInterval(interval)
                setTimeLeft(0)
            } else {
                setTimeLeft(newTimeLeft)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [endTime])

    useEffect(() => {
        if (timeLeft <= 0) {
            setTimeoutReached(true)
        }
    }, [timeLeft, setTimeoutReached])

    const minutes = Math.floor(timeLeft / 60000)
    const seconds = Math.floor((timeLeft % 60000) / 1000)

    return <div data-testId="timerID">{`${minutes}:${seconds.toString().padStart(2, '0')}`}</div>
}
