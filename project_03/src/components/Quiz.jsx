import { useState } from "react"
import QUESTIONS from '../questions.js'

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]); // 유저 답변 목록
    const activeQuestionIndex = userAnswers.length; // 활성화된 질문의 순서 1,2,3
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort()

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer] );

        if (activeQuestionIndex + 1 === QUESTIONS.length) {
            console.log("다했음")
        }
    }

    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
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
