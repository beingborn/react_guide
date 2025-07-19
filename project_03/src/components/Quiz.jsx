import { useState, useCallback, useRef } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx"

const Quiz = () => {
    const shuffledAnswers = useRef();
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([]); // 유저 답변 목록

    /** 
     * 활성화된 질문의 순서 1,2,3
     * 답변이 바로 넘어가지않게 하는 방법 => 유저 현재 CurrentState 값이 빈 값이라면
     * userAnswers.length - 1을 할당해 이전 질문을 유지하도록 한다.
     * */  
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1 ;
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback( function handleSelectAnswer(
        selectedAnswer
    ) {
            setAnswerState('answered')
            setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer] );

            setTimeout(() => {
                if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                    setAnswerState('correct')
                } else {
                    setAnswerState('wrong')
                }

                setTimeout(() => {
                    setAnswerState('') // 문자열 초기화
                }, 2000)
            }, 1000)
        }
        , [activeQuestionIndex]
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

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <div id="quiz">
            <div id="question">
                {/* 
                    재렌더링 
                    강제 시키기 

                    1. 리액트는 변경된 부분만 재렌더링하는 특성이 있다.
                    2. 또한 key 값을 통해 컴포넌트의 유효값을 판단한다
                */}
                <QuestionTimer 
                    key={activeQuestionIndex}
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.current.map((answer) => {
                        /**
                         * userAnswers === 유저 답변 목록 
                         * userAnswers.length === 현재 유저가 답변한 질문의 개수 
                         * userAnswers.length - 1 인 이유 === 유저가 첫번째 질문 답변 시 
                         * userAnswers[0]에 저장 질문의 개수는 1개가 되기 때문
                         */

                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected'
                        } 

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }

                            return (
                                <li className="answer" key={answer}>
                                    <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                                </li>    
                            )
                        })
                    }
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

/** 
 * useRef 사용 이유 
 * 각자 속하는 컴포넌트 라이프 사이클로부터 독립적인 값을 관리하고 참조하기 위해
 */
