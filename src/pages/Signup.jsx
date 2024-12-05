import axios from "axios";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginIllustration from '../assets/3.jpeg';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

// function handling submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
//check if password matches confirm password
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }
//check whether the password character is greater than 5 character long
    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters long.");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(`http://localhost:8080/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      if (res && res.data.success) {
        alert("Registered Successfully");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
      else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">


        <div className="hidden md:flex md:w-1/2 bg-pink-100 items-center justify-center">
          <img
            src={loginIllustration}
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>


        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">Sign Up</h2>
          <p className="text-gray-600 text-center mb-4 md:mb-6 text-sm md:text-base">
            By <span style={{ color: "#E7A3AC" }}>continuning</span>, you agree to our <span style={{ color: "#E7A3AC" }}>User Agreement</span> and <span style={{ color: "#E7A3AC" }}>Privacy Policy</span>.
          </p>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isLoading ? "bg-gray-400" : "bg-pcosPink hover:bg-pink-600"
                } text-white font-bold py-2 md:py-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
              style={{ backgroundColor: isLoading ? "#ccc" : "#E7A3AC" }}
            >
              {isLoading ? "Signing Up..." : "Continue"}
            </button>
          </form>

          {/* Log in link */}
          <p className="text-center mt-4 md:mt-6 text-gray-500 text-sm md:text-base">
            Already a member?{' '}
            <Link to="/login" className="text-pcosPink font-semibold ">
              <span style={{ color: "#E7A3AC" }}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
