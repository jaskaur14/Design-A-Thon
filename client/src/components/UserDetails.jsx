import { useState, createContext, useMemo } from 'react';

const UserContext = createContext(); 

const UserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState(null)
    const value = useMemo(() => ({currentUser, setCurrentUser}),[currentUser])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}
export { UserContext, UserProvider }