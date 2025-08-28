import { useContext, useEffect } from "react"
import Login from "../pages/Login"
import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router"

const ProtectedRoutes = ({ Component }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
            return
        }
    }, [user])

    return (
        <>
            <Component />
        </>
    )
}

export default ProtectedRoutes