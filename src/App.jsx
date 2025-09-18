import { BrowserRouter, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Header from "./components/Header"
import ErrorPage from "./pages/ErrorPage"
import ManageLab from "./pages/labs/ManageLab"
import Labs from "./pages/labs/Labs"
import Pcs from "./pages/pcs/Pcs"
import ManagePcs from "./pages/pcs/ManagePcs"
import Students from "./pages/students/Students"
import ManageStudents from "./pages/students/ManageStudents"
import { ToastContainer } from "react-toastify"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<ProtectedRoutes Component={Dashboard} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/labs" element={<ProtectedRoutes Component={Labs} />} />
                <Route path="/add-lab" element={<ProtectedRoutes Component={ManageLab} />} />
                <Route path="/edit-lab/:labId" element={<ProtectedRoutes Component={ManageLab} />} />
                <Route path="/pcs" element={<ProtectedRoutes Component={Pcs} />} />
                <Route path="/add-pc" element={<ProtectedRoutes Component={ManagePcs} />} />
                <Route path="/edit-pc/:pcId" element={<ProtectedRoutes Component={ManagePcs} />} />
                <Route path="/students" element={<ProtectedRoutes Component={Students} />} />
                <Route path="/add-student" element={<ProtectedRoutes Component={ManageStudents} />} />
                <Route path="/edit-student/:studentId" element={<ProtectedRoutes Component={ManageStudents} />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App