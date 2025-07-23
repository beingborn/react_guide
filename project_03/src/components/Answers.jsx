import { useRef } from "react";

const Answers = ({answers, selectedAnswer, answerState, onSelect}) => {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                /**
                 * userAnswers === 유저 답변 목록 
                 * userAnswers.length === 현재 유저가 답변한 질문의 개수 
                 * userAnswers.length - 1 인 이유 === 유저가 첫번째 질문 답변 시 
                 * userAnswers[0]에 저장 질문의 개수는 1개가 되기 때문
                 */

                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected'
                } 

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                    return (
                        <li className="answer" key={answer}>
                            <button 
                            onClick={() => onSelect(answer)} 
                            className={cssClass}
                            disabled={answerState !== ''}
                                >{answer}</button>
                        </li>    
                    )
                })
            }
        </ul>
    )
}

export default Answers;