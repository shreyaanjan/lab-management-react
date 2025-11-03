import { signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <header className="bg-[#fefefe] shadow-md relative z-50">
      <div className="container mx-auto">
        <div className="py-4 px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-700 hover:text-[#ea5455] transition-colors">
            NextGen Lab
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800 text-2xl focus:outline-none">
            {menuOpen ? "✖" : "☰"}
          </button>
          <nav className={`${menuOpen
            ? "fixed inset-0 bg-white flex flex-col items-start justify-start px-8 pt-6 space-y-6"
            : "hidden"} md:static md:block md:bg-transparent md:shadow-none transition-all duration-300`}>
            <div className="flex w-full items-center justify-between md:hidden mb-4">
              <Link to="/" className="text-2xl font-bold text-gray-700 hover:text-[#ea5455]">
                NextGen Lab
              </Link>
              <button onClick={() => setMenuOpen(false)} className="text-gray-800 text-2xl focus:outline-none">
                ✖
              </button>
            </div>
            <ul className="flex flex-col md:flex-row md:space-x-8 font-semibold md:text-left text-lg w-full">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}
                  className={`block py-2 ${pathname === "/" ? "text-[#ea5455]" : "text-gray-800"
                    }`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/labs" onClick={() => setMenuOpen(false)}
                  className={`block py-2 ${pathname === "/labs" ? "text-[#ea5455]" : "text-gray-800"
                    }`}>
                  Labs
                </Link>
              </li>
              <li>
                <Link to="/pcs" onClick={() => setMenuOpen(false)}
                  className={`block py-2 ${pathname === "/pcs" ? "text-[#ea5455]" : "text-gray-800"
                    }`}>
                  Computers
                </Link>
              </li>
              <li>
                <Link to="/students" onClick={() => setMenuOpen(false)} className={`block py-2 ${pathname === "/students"
                  ? "text-[#ea5455]" : "text-gray-800"}`} >
                  Students
                </Link>
              </li>
              <li className="md:hidden mt-4">
                {!user ? (<button onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }} className="px-7 py-2 font-semibold main-btn">
                  Login
                </button>
                ) : (
                  <button onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }} className="px-4 py-2 font-semibold main-btn">
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            {!user ? (
              <button onClick={() => navigate("/login")}
                className="px-7 py-2 font-semibold main-btn" >
                Login
              </button>
            ) : (
              <button onClick={handleLogout} className="px-4 py-1 font-semibold main-btn">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;