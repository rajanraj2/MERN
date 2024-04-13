import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => { 

    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLS = (servertoken) => {
        return localStorage.setItem("token", servertoken);
    };

    let isLoggedIn = !!token;
    console.log("is logged in",isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token"); 

    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return authContextValue;
}