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
    <header className="bg-[#37353E] border-b relative z-20">
      <div className="container mx-auto">
        <div className="mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#fffffe] ">
            NextGen Lab
          </Link>
          <nav className="hidden md:flex space-x-8 text-slate-300 font-medium">
            <Link to="/" className="hover:text-white text-[#D3DAD9] font-semibold transition-colors">
              Dashboard
            </Link>
            <Link to="/labs" className="hover:text-white text-[#D3DAD9] font-semibold  transition-colors">
              Labs
            </Link>
            <Link to="/pcs" className="hover:text-white text-[#D3DAD9] font-semibold  transition-colors">
              Computers
            </Link>
            <Link to="/students" className="hover:text-white text-[#D3DAD9] font-semibold transition-colors">
              Students
            </Link>
          </nav>
          <div>
            {!user ? (
              <button onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-[#DED0B6] text-white font-semibold hover:bg-[#FAEED1] transition-colors">Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#DED0B6] text-[#0C0C0C] font-semibold hover:bg-[#FAEED1] transition-colors">Logout
              </button>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
