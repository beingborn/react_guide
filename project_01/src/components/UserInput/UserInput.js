import { useState } from 'react';

const initialUserInput = {
  'current-savings': 10000,
  'yearly-contribution': 1200,
  'expected-return': 7,
  duration: 10,
};

const UserInput = (props) => {
  const [userInput, setUserInput] = useState(initialUserInput);

  const submitHandler = (event) => {
    event.preventDefault();

    props.onCalculate(userInput);
  };

  const resetHandler = () => {
    setUserInput(initialUserInput);
  };

  // 제네릭 이벤트 핸들러 : Input의 onChangeHandler를 하나의 함수로 처리
  const inputChangeHandler = (input, value) => {
    // 이전 값 상태 업데이트, prevInput (이전 값)
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        // [] 이용해 식별자로써 프로퍼티의 접근 가능
        [input]: value,
      };
    });
  };

  return (
    <form onSubmit={submitHandler} className='form'>
      <div className='input-group'>
        <p>
          <label htmlFor='current-savings'>Current Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('current-savings', event.target.value)
            }
            type='number'
            value={userInput['current-savings']}
            id='current-savings'
          />
        </p>
        <p>
          <label htmlFor='yearly-contribution'>Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('yearly-contribution', event.target.value)
            }
            value={userInput['yearly-contribution']}
            type='number'
            id='yearly-contribution'
          />
        </p>
      </div>
      <div className='input-group'>
        <p>
          <label htmlFor='expected-return'>
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(event) =>
              inputChangeHandler('expected-return', event.target.value)
            }
            value={userInput['expected-return']}
            type='number'
            id='expected-return'
          />
        </p>
        <p>
          <label htmlFor='duration'>Investment Duration (years)</label>
          <input
            value={userInput['duration']}
            type='number'
            onChange={(event) =>
              inputChangeHandler('duration', event.target.value)
            }
            id='duration'
          />
        </p>
      </div>
      <p className='actions'>
        <button type='reset' onClick={resetHandler} className='buttonAlt'>
          Reset
        </button>
        <button type='submit' className='button'>
          Calculate
        </button>
      </p>
    </form>
  );
};

export default UserInput;
