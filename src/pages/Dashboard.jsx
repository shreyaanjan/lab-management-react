import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router"

const Dashboard = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        await signOut(auth)
        navigate('/login')
    }
    return (
        <div className="p-10">
            <button className="border px-7 py-2" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard