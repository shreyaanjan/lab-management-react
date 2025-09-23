import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const { user } = useContext(AuthContext);

  return (
    <header className="bg-[#0F172A] border-b border-slate-800 shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300">
          NextGen Lab
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-slate-300 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            Dashboard
          </Link>
          <Link to="/labs" className="hover:text-cyan-400 transition-colors">
            Labs
          </Link>
          <Link to="/pcs" className="hover:text-cyan-400 transition-colors">
            Computers
          </Link>
          <Link to="/students" className="hover:text-cyan-400 transition-colors">
            Students
          </Link>
        </nav>

        {/* Auth Button */}
        <div>
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
