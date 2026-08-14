import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import Logo from "../Components/Logo";


function LandingPage() {
  const navigate = useNavigate();

  return (
    
    <div className="tf-landing">
      {/* NAVBAR */}

      <nav className="tf-navbar">
        <Logo/>
        

        <div className="tf-nav-menu">
          <a href="#tf-features">Features</a>

          <a href="#tf-about">About</a>

          <a href="#tf-contact">Contact</a>

          <button
            className="tf-login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}

      <section className="tf-hero">
        <div className="tf-hero-content">
          <h1>
            Manage Your Tasks
            <span>Smarter</span>
          </h1>

          <p>
            TaskFlow is a complete task management platform that helps users
            create tasks, track progress, manage deadlines and improve
            productivity.
          </p>

          <div className="tf-hero-buttons">
            <button
              className="tf-primary"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>

            
          </div>
        </div>

        <div className="tf-hero-image">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
            alt="Task Management"
          />
        </div>
      </section>

      {/* FEATURES */}

      <section className="tf-features" id="tf-features">
        <h2>TaskFlow Features</h2>

        <div className="tf-feature-grid">
          <div className="tf-card">
            <h3>User Authentication</h3>

            <p>
              Secure registration and login system to protect user accounts.
            </p>
          </div>

          <div className="tf-card">
            <h3>Task CRUD Operations</h3>

            <p>
              Create, view, update and delete tasks easily using a powerful
              backend API.
            </p>
          </div>

          <div className="tf-card">
            <h3>Smart Dashboard</h3>

            <p>
              View total tasks, completed tasks, pending tasks and due dates.
            </p>
          </div>

          <div className="tf-card">
            <h3>Task Progress</h3>

            <p>Track completion percentage and monitor productivity.</p>
          </div>

          <div className="tf-card">
            <h3>Priority Management</h3>

            <p>Organize tasks using High, Medium and Low priorities.</p>
          </div>

          <div className="tf-card">
            <h3>Database Integration</h3>

            <p>Store and manage data securely using Spring Boot and MySQL.</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}

      <section className="tf-about" id="tf-about">
        <h2>About TaskFlow</h2>

        <p>
          TaskFlow is a full-stack task management application developed using
          React, Spring Boot and MySQL.
          <br />
          <br />
          Users can register, login securely, create tasks, update task details,
          change task status, set priorities, manage deadlines and track their
          productivity through an interactive dashboard.
          <br />
          <br />
          This project demonstrates real-world software development concepts
          including frontend development, REST APIs, backend services, database
          connectivity, authentication and responsive design.
        </p>
      </section>

      {/* CONTACT */}

      <section className="tf-contact" id="tf-contact">
        <h2>Contact Us</h2>

        

        <div className="tf-contact-grid">
          <div>
            <h3>Email Support</h3>

            <p>support@taskflow.com</p>
          </div>

          <div>
            <h3>Customer Service</h3>

            <p>Monday - Friday 9 AM - 6 PM</p>
          </div>

          <div>
            <h3>Technology</h3>

            <p>React + Spring Boot + MySQL</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="tf-cta">
        <h2>Start Managing Your Work Today</h2>

        <button className="tf-primary" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </section>

      <footer className="tf-footer">
        © 2026 TaskFlow | React + Spring Boot + MySQL
      </footer>
    </div>
  );
}

export default LandingPage;
