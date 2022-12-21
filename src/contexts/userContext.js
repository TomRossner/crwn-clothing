import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser} from "../utils/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    const navigate = useNavigate();

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