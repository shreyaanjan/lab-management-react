import { signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation()

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <header className="bg-[#fefefe] shadow-md relative z-20">
      <div className="container mx-auto">
        <div className="mx-auto py-4 px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-700">
            NextGen Lab
          </Link>
          <nav className="hidden md:flex space-x-8 text-slate-300 font-medium">
            <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Link to={"/"} className={`${pathname == '/' ? "text-[#ea5455]" : "text-gray-800"}`}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/labs"} className={`${pathname == '/labs' ? "text-[#ea5455]" : "text-gray-800"}`}>
                  Labs
                </Link>
              </li>
              <li>
                <Link to={"/pcs"} className={`${pathname == '/pcs' ? "text-[#ea5455]" : "text-gray-800"}`}>
                  Computers
                </Link>
              </li>
              <li>
                <Link to={"/students"} className={`${pathname == '/students' ? "text-[#ea5455]" : "text-gray-800"}`}>
                  Students
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            {!user ? (
              <button onClick={() => navigate("/login")}
                className="px-7 py-2 font-semibold main-btn">Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-1 font-semibold main-btn">Logout
              </button>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
