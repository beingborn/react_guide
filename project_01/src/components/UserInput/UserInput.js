const UserInput = () => {
  const submitHandler = (event) => {
    event.preventDefault();

    console.log('Submit');
  };

  const resetHandler = () => {
    console.log('Reset');
  };

  // 제네릭 이벤트 핸들러 : Input의 onChangeHandler를 하나의 함수로 처리
  const inputChangeHandler = (input, value) => {
    console.log(input, value);
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
            id='current-savings'
          />
        </p>
        <p>
          <label htmlFor='yearly-contribution'>Yearly Savings ($)</label>
          <input
            onChange={(event) =>
              inputChangeHandler('yearly-contribution', event.target.value)
            }
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
            type='number'
            id='expected-return'
          />
        </p>
        <p>
          <label htmlFor='duration'>Investment Duration (years)</label>
          <input
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
