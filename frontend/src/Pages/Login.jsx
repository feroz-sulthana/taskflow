import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Logo from "../Components/Logo";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    // Remove alert when user starts typing again
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous alert
    setMessage("");
    setMessageType("");

    // Basic validation
    if (!user.email || !user.password) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://taskflow-11.onrender.com/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      // Login successful
      if (response.ok) {
        setMessage(
          data.message || "Login successful!"
        );

        setMessageType("success");

        // Save logged-in user
        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        // Save complete response if needed
        localStorage.setItem(
          "loginResponse",
          JSON.stringify(data)
        );

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      } else {
        // Backend returned an error
        setMessage(
          data.message ||
          "Invalid email or password."
        );

        setMessageType("error");
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        "Unable to connect to server. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="login-navbar">

        <Logo />

        <div className="login-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/">
            About
          </Link>

          <Link to="/">
            Services
          </Link>

          <Link to="/">
            Contact
          </Link>

          <Link
            to="/register"
            className="login-nav-btn"
          >
            Register
          </Link>

        </div>

      </nav>


      {/* =========================
          LOGIN CARD
      ========================= */}

      <div className="login-card">

        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="close-btn"
          onClick={() => navigate("/")}
        >
          ×
        </button>


        {/* TITLE */}

        <h1>
          Login
        </h1>


        {/* =========================
            CUSTOM ALERT
        ========================= */}

        {message && (
          <div
            className={`login-alert ${messageType}`}
          >

            <span className="login-alert-icon">

              {messageType === "success"
                ? "✓"
                : "!"}

            </span>


            <span className="login-alert-message">

              {message}

            </span>


            <button
              type="button"
              className="login-alert-close"
              onClick={() => {
                setMessage("");
                setMessageType("");
              }}
            >
              ×
            </button>

          </div>
        )}


        {/* =========================
            LOGIN FORM
        ========================= */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="input-line">

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="email"
              required
            />

            <span>
              ✉
            </span>

          </div>


          {/* PASSWORD */}

          <div className="input-line">

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
              required
            />

            <span>
              🔒
            </span>

          </div>


          {/* OPTIONS */}

          <div className="options">

            <label>
              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>
            </label>


            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="submit"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* REGISTER */}

        <p className="register-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;
