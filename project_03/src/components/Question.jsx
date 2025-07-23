import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"
import { useState } from "react"
import QUESTIONS from "../questions"

const Question = ({
    index,
    onSelectAnswer, 
    onSkipAnswer
}) => {
    const [answer, setAnswer] = useState({
        selectedAnswer : '',
        isCorrect : null
    })

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer : answer,
            isCorrect : null
        })

        setTimeout(() => {
            setAnswer( {
                selectedAnswer : answer,
                isCorrect : QUESTIONS[index].answers[0] === answer
            }) 

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000)
        }, 1000)
    }

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }


    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    } else if (answer.selectedAnswer) {
        answerState = 'selected'
    }   

    return(
        <div id="question">
            {/* 
                재렌더링 
                강제 시키기 

                1. 리액트는 변경된 부분만 재렌더링하는 특성이 있다.
                2. 또한 index 값을 통해 컴포넌트의 유효값을 판단한다
            */}
            <QuestionTimer 
                key={timer}
                timeout={timer} 
                onTimeout={
                    answer.selectedAnswer === '' ? 
                    onSkipAnswer : null
                }
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers 
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
        
}

export default Question