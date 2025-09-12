import { BrowserRouter, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Header from "./components/Header"
import ErrorPage from "./pages/ErrorPage"
import Labs from "./pages/Labs"
import AddLab from "./pages/AddLab"
import { ToastContainer } from "react-toastify"

const App = () => {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<ProtectedRoutes Component={Dashboard} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/add-lab" element={<AddLab />} />
                <Route path="/edit-lab/:labId" element={<AddLab />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App