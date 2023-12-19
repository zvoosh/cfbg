import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext({});

export default MyContext;

export const MyContextProvider = ({ children }) => {
    const initialState = 'inicijator';
    const passwordState = 'dukidule';
    const [myIkimasState, setMyIkimasState] = useState(initialState);
    const [myPasswordState, setMyPasswordState] = useState(passwordState);

    const updatePasswordState = (newState) => {
        setMyPasswordState(newState);
    }

    const updateIkimasState = (newState) => {
        setMyIkimasState(newState);
    }

    return (
        <MyContext.Provider value={{ myPasswordState, updatePasswordState, updateIkimasState, myIkimasState }}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    return useContext(MyContext);
};