import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <header className="bg-[#212121] shadow shadow-[#e3e3e35b] relative z-20">
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#fffffe] hover:text-purple-300">
            NextGen Lab
          </Link>
          <nav className="hidden md:flex space-x-8 text-slate-300 font-medium">
            <Link to="/" className="hover:text-cyan-400 text-[#fffffe] transition-colors">
              Dashboard
            </Link>
            <Link to="/labs" className="hover:text-cyan-400 text-[#fffffe] transition-colors">
              Labs
            </Link>
            <Link to="/pcs" className="hover:text-cyan-400 text-[#fffffe] transition-colors">
              Computers
            </Link>
            <Link to="/students" className="hover:text-cyan-400 text-[#fffffe] font-semibold transition-colors">
              Students
            </Link>
          </nav>
          <div>
            {!user ? (
              <button onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-[#f9bc60] text-white font-semibold hover:bg-purple-600 transition">Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#f9bc60] text-white font-semibold hover:bg-cyan-600 transition">Logout
              </button>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
