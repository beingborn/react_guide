import React from 'react';
import { useState } from 'react';
import ErrorModal from './components/ErrorModal/ErrorModal';
import UserList from './components/UserList/UserList';
import AddUser from './components/AddUser/AddUser';


function App() {
  const [userList, setUserList] = useState([]);
  const [errorValid, setErrorValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    userName: '',
    age : '',
  })

  const handleFormValidate = (value) => {
    const patternKorean =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const patternNumber =  /[0-9]/;

    const [userName, age] = [value.userName, value.age];

    if (!patternKorean.test(userName)) {
      setErrorValid(true)
      setErrorMessage(prevError => ({
        ...prevError,
        userName: '한글만 입력하세요.'
      }))

      return; 
    } 

    if (!patternNumber.test(age)) {
      setErrorValid(true)
      setErrorMessage(prevError => ( {
        ...prevError,
        userName: '한글만 입력하세요.'
      }))

      return;
    } 

    handleUserUpdate(value)
  }

  const handleModalClose = () => {
    setErrorValid(false);
  }

  const handleUserUpdate = (user) => {
      setUserList((prevList) => [...prevList, user]);
  }

  return (
    <div>
        <AddUser onValidate={handleFormValidate}/>
        <UserList data={userList}/>
        <ErrorModal 
        onClose={handleModalClose}
        open={errorValid} 
        errorMessage={errorMessage}
        />
    </div>
  );
}

export default App;
