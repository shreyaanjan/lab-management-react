import { useContext } from "react"
import Login from "../pages/Login"
import { AuthContext } from "../context/AuthContextProvider"

const ProtectedRoutes = ({ Component }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
        return <Login />
    }

    return (
        <>
            <Component />
        </>
    )
}

export default ProtectedRoutes