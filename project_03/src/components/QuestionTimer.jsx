import { useState, useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // 주요 개념 : Clean 업을 통해 컴포넌트 언마운트 시 이전 타이머 삭제 후 재시작
    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout()
        }, timeout)

        return () => {clearTimeout(timer)}
    }, [timeout, setTimeout])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => clearInterval(interval);
    }, [remainingTime])


    return <progress id="question-time" max={timeout} value={remainingTime}/>;
}

export default QuestionTimer;

/**
 * 리액트는 자체적으로 컴포넌트 함수를 두번 출력한다. 
 * Effect 함수에도 적용이 되는데, interval이 두번 실행되면서 
 * 시간이 더 빠르게 소모될 수 있다.
 * 
 * 이때 클린업을 이용해 이를 방지할 수 있다.
 * 
 * 클린업이란
 * 
 */