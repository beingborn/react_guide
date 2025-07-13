import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";

const AddUser = props => {
    const [enteredUsername, setEnteredUsernname] = useState('')
    const [enteredAge, setEnteredAge] = useState('')

    const addUserHandler = (event) => {
        event.preventDefault();   

        setEnteredUsernname('')
        setEnteredAge('')
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsernname(event.target.value)
    }
    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value)
    }


    return(
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="">UserName</label>
                <input id="username" value={enteredUsername} type="text" onChange={usernameChangeHandler}/>
                <label htmlFor="">Age (Years)</label>
                <input id="age" value={enteredAge} onChange={ageChangeHandler} type="number"/>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
    )
};

export default AddUser;