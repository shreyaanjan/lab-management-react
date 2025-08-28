import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../config/firebase";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data)
        })
        return () => unsubscribe()
    }, [])

    const handleLogin = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    
    let value = { user, handleLogin }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider