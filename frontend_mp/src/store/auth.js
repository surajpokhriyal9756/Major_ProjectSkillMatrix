import {createContext, useContext,useState} from "react";

export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem("token"));

    let isLoggedIn = !!token;

    const storeTokenInLS =(serverToken) =>{
        return localStorage.setItem("token",serverToken);
    };
    const LogoutUser =() =>{
        setToken("");
        return localStorage.removeItem("token");
    };
    return <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    
    if(!authContextValue){
        console.log('error auth');
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}
