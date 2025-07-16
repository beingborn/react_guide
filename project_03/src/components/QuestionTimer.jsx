import { useState, useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        setTimeout(() => {
            onTimeout()
        }, timeout)
    }, [timeout, setTimeout])

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => clearInterval(timer)
    }, [remainingTime])


    return <progress id="question-time" max={timeout} value={remainingTime}/>;
}

export default QuestionTimer;