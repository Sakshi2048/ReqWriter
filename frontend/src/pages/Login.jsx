import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ Declared before usage

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const BackendURL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BackendURL}/authenticate/login`, formData);
      alert(response.data.message);
      login(response.data.user);
      navigate("/");
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        if (message === "User not found. Please register first.") {
          alert("❌ User not registered. Please register first.");
        } else if (message === "Invalid password.") {
          alert("❌ Incorrect password. Please try again.");
        } else if (message === "All fields are required.") {
          alert("⚠️ All fields are required.");
        }
      } else {
        alert("❌ Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 text-gray-200">
      <div className="max-w-screen-xl w-full bg-slate-900 shadow-lg rounded-lg flex overflow-hidden mx-28">
        <div className="w-full lg:w-1/2 p-6 sm:p-12 flex flex-col items-center mt-20">
          <h1 className="text-3xl font-extrabold mt-2 text-white">Login</h1>
          <div className="w-full max-w-xs mt-8">
            {/* ✅ FORM START */}
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={formData.username}
              />
              <input
                className="mt-4 w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="submit"
                className="mt-5 w-24 mx-auto flex items-center justify-center py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>
            {/* ✅ FORM END */}

            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button
                className="cursor-pointer text-blue-500"
                onClick={handleRegister}
              >
                Signup
              </button>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-slate-800 items-center justify-center">
          <img
            src="https://th.bing.com/th/id/OIP.jT4nFGhhd1-OvANYz9NUgAHaE8?rs=1&pid=ImgDetMain"
            className="w-full h-full object-cover"
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
