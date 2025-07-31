import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full z-50 shadow-md px-4 py-3" style={{ backgroundColor: '#0b111e' }}>
      <header className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left: Logo */}
        <button
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ReqWriter
        </button>

        {/* Right: Links + Auth Buttons */}
        <div className="flex items-center gap-x-6 text-md ">
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-x-6 text-gray-300 ">
            <button onClick={() => navigate("/flow")} className="hover:text-white transition cursor-pointer">About</button>
            <button onClick={() => navigate("/contact")} className="hover:text-white transition cursor-pointer">Contact</button>
            {user && (
              <button onClick={() => navigate("/projects")} className="hover:text-white transition cursor-pointer">
                Projects
              </button>
            )}
          </nav>

          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-300 font-medium">
                Hello {user.username} 👋
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
