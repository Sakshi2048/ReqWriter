import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    token: "",
    baseurl: "",
  });

  const BackendURL = "http://localhost:5000"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BackendURL}/authenticate/register`, formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Network error. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 text-gray-200">
      <div className="max-w-screen-xl w-full bg-slate-900 shadow-lg rounded-lg flex overflow-hidden mx-28">
        <div className="w-full lg:w-1/2 p-6 sm:p-12 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold mt-2 text-white">Sign up</h1>
          <div className="w-full max-w-xs mt-8">
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
              />
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-4 w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
              />
              <input
                name="token"
                type="text"
                placeholder="Enter API Token"
                value={formData.token}
                onChange={handleChange}
                className="mt-4 w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
              />
              <input
                name="baseurl"
                type="text"
                placeholder="Enter Base URL"
                value={formData.baseurl}
                onChange={handleChange}
                className="mt-4 w-full px-4 py-3 rounded-lg bg-slate-800 border border-gray-600 placeholder-gray-400 text-sm focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-5 w-24 mx-auto flex items-center justify-center py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Signup
              </button>
            </form>

            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button
                className="cursor-pointer text-blue-500"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 bg-slate-800 items-center justify-center">
          <img
            src="https://i1.wp.com/articleusa.com/wp-content/uploads/2021/02/software_development-blog-banner.png?resize=1536%2C922&ssl=1"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
