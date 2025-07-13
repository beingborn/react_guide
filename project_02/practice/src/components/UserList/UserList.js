const UserList = ({data}) => {
    return (
        <ul>
            {data.length > 0 && 
                data.map((user) => (
                    <li key={user.userName}>
                        <b>{user.userName}</b>
                        <span>{user.age}</span>
                    </li>
                ))
            }
        </ul>
    )
}

export default UserList;