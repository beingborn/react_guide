import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [enteredUsername, setEnteredUsernname] = useState('')
    const [enteredAge, setEnteredAge] = useState('')
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();   

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'InvalidMessage',
                message: '값이 입력되지 않았습니다.'
            })

            return;
        } 

        if (enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: '유효한 입력값을 입력해주세요.'
            })

            return ;
        }

        props.onAddUser(enteredUsername, enteredAge)
        setEnteredUsernname('')
        setEnteredAge('')
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsernname(event.target.value)
    }
    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value)
    }

    const errorHandler = () => {
        setError(null);
    }

    return(
        <>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="">UserName</label>
                    <input id="username" value={enteredUsername} type="text" onChange={usernameChangeHandler}/>
                    <label htmlFor="">Age (Years)</label>
                    <input id="age" value={enteredAge} onChange={ageChangeHandler} type="number"/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </>
    )
};

export default AddUser;