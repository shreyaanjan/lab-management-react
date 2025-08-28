import { BrowserRouter, Route, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Header from "./components/Header"

const App = () => {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path={"/"} element={<ProtectedRoutes Component={Dashboard} />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App