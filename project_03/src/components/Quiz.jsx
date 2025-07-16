import { useState, useMemo, useCallback } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]); // 유저 답변 목록
    const activeQuestionIndex = userAnswers.length; // 활성화된 질문의 순서 1,2,3
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer] );
        }
        , []
    ) 

    const handleSkipAnswer = useCallback(() => 
        handleSelectAnswer(null), [handleSelectAnswer]
    )

    // 답변 완료 시
    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="퀴즈 종료 이미지" />
                <h2>퀴즈 종료!</h2>
            </div>
        )
    }

    const shuffledAnswers = useMemo(() => {
        const answers = [...QUESTIONS[activeQuestionIndex].answers];
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }, [activeQuestionIndex]);


    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li className="answer" key={answer}>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    
    )
}

export default Quiz

/**
 * 요구사항 :
 * 활성화된 질문 보여주기 
 * 답변 작성 시 다른 질문으로 교체
 * 
 * 리액트에서 상태관리를 최소한으로 유지하는 게 좋은 관습
 */

/**
 * 자바스크립트에서 함수는 곧 객체이기 때문에 
 * 메모리 어딘가에 저장되어 있다. 그리고 리액트의 
 * 컴포넌트가 재렌더링될 때, 같은 로직이더라도 그 전 객체와
 * 동일하지 않다
 */

/**
 * useCallback 사용 이유 
 * 주변 컴포넌트가 다시 실행되었다 해도 함수가 재생성 되지 않도록 함
 */
