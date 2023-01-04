import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser} from "../utils/firebase";
import { createAction } from "../utils/reducer";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const setCurrentUser = (user) => dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    const navigate = useNavigate();
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const signOut = async () => await signOutUser();
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });
        signOut();
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser !== null) return navigate("/CRWN-Clothing/");
    }, [currentUser])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}