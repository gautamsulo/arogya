import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from "../assets/3.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/login`, {
        email,
        password,
      });

      if (res?.data?.success) {
        // Save user details and token in localStorage
        localStorage.setItem("userEmail", res.data.email);
        localStorage.setItem("authToken", res.data.authToken);

        alert("Login successful!");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setErrorMessage(res?.data?.message || "Login failed. Try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Hey there you are not registered yet. Follow the signup link");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden">

        <div className="hidden md:flex md:w-1/2 bg-pink-100 items-center justify-center">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>


        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-bold py-3 px-4 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? "bg-gray-400" : "hover:bg-blue-600"
                }`}
              style={{ backgroundColor: isLoading ? "#ccc" : "#E7A3AC" }}
            >
              {isLoading ? "Logging In..." : "Continue"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center mt-6 text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold">
              <span style={{ color: "#E7A3AC" }}>Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
