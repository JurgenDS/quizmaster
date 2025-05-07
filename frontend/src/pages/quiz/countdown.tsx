import { useEffect, useState } from "react"

export const Countdown = ({ setTimeoutReached }: { setTimeoutReached: (value: boolean) => void }) => {
    const now = new Date()
    const endTime = new Date(now.getTime() + 2 * 60 * 1000) // 2 minutes from now
    const [time, setTime] = useState(new Date(endTime.getTime() - now.getTime()))
    useEffect(() => {
        const countdown = setInterval(() => {
            setTime((prev) => {
                const newDate = new Date(prev.getTime() - 1000)
                if (newDate.getTime() <= 0) {
                    clearInterval(countdown)
                    setTimeoutReached(true)
                    return new Date(0)
                }
                return newDate
            })
        }, 1000)
        return () => {
            clearInterval(countdown)
        }
    }, [])
    return <div data-testId="timerID">{`${time.getMinutes()}:${time.getSeconds().toString().padStart(2, "0")}`}</div>
}


