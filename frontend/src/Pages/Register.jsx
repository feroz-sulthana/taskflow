import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import Logo from "../Components/Logo";


function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Alert state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setMessage("");

    // Password validation
    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch(
        "https://taskflow-11.onrender.com/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: user.fullName,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const message = await response.text();

      if (response.ok) {
        // Success message
        setMessage(message || "Account created successfully!");
        setMessageType("success");

        // Clear form
        setUser({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Server error
        setMessage(message || "Registration failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.log(error);

      setMessage("Unable to connect to server");
      setMessageType("error");
    }
  };

  return (
    <div className="register-page">

      {/* NAVBAR */}

      <nav className="register-navbar">

        <Logo />

        <div className="register-nav-links">

          <Link to="/">Home</Link>

          <Link to="/">About</Link>

          <Link to="/">Services</Link>

          <Link to="/">Contact</Link>

          <Link
            to="/login"
            className="register-login-btn"
          >
            Login
          </Link>

        </div>

      </nav>


      {/* REGISTER CARD */}

      <div className="register-card">

        <h1>Register</h1>


        {/* CUSTOM ALERT */}

        {message && (
          <div className={`register-alert ${messageType}`}>

            <span className="alert-icon">
              {messageType === "success" ? "✓" : "!"}
            </span>

            <span className="alert-message">
              {message}
            </span>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="alert-close"
            >
              ×
            </button>

          </div>
        )}


        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}

          <div className="register-input-line">

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />

            <span>👤</span>

          </div>


          {/* EMAIL */}

          <div className="register-input-line">

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <span>✉</span>

          </div>


          {/* PASSWORD */}

          <div className="register-input-line">

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <span>🔒</span>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="register-input-line">

            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />

            <span>🔒</span>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="register-submit"
          >
            <span>Create Account</span>
          </button>

        </form>


        {/* LOGIN */}

        <p className="register-login-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;
