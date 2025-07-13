import { useState } from "react";

const initialUser = {
    userName: '',
    age : 0,
}

const AddUser = ({onValidate}) => {
    const [userInput, setUserInput] = useState(initialUser);

    const handleInputChange = (input, value) => {
        setUserInput((prevInput) => {
            return {
                ...prevInput,
                [input] : value,
            }
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onValidate(userInput);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">유저명</label>
            <input type="text" id="username" onChange={(event) => handleInputChange('userName', event.target.value )}/>
            <label htmlFor="age">나이</label>
            <input type="text" id="age" onChange={(event) => handleInputChange('age', event.target.value )}/>
            <button type="submit">유저 추가</button>
        </form>
    )
}

export default AddUser;