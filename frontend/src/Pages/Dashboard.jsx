import {
  FaBell,
  FaSearch,
  FaPlus,
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaFire,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/Dashboard.css";
import Logo from "../Components/Logo";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const firstLetter = user?.fullName?.charAt(0).toUpperCase();

  // ================= FETCH TASKS =================

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/tasks");

      const data = await response.json();

      setTasks(data);

      createNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE NOTIFICATIONS =================

  const createNotifications = (taskList) => {
    let notificationList = [];

    taskList.forEach((task) => {
      if (task.status === "Completed") {
        notificationList.push(`✅ ${task.title} completed`);
      }

      if (task.status === "In Progress") {
        notificationList.push(`🚀 ${task.title} is in progress`);
      }

      if (task.status === "Pending") {
        notificationList.push(`📝 ${task.title} is pending`);
      }

      const today = new Date().toISOString().split("T")[0];

      if (task.dueDate === today) {
        notificationList.push(`⏰ ${task.title} is due today`);
      }
    });

    setNotifications(notificationList);
  };

  useEffect(() => {
    getTasks();

    window.addEventListener("focus", getTasks);

    return () => {
      window.removeEventListener("focus", getTasks);
    };
  }, []);

  // ================= COUNTS =================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const dueToday = tasks.filter((task) => task.dueDate === today).length;

  // ================= PROGRESS =================

  const completedPercentage =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const progressPercentage =
    totalTasks === 0 ? 0 : (inProgressTasks / totalTasks) * 100;

  const pendingPercentage =
    totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;

  const progress = Math.round(completedPercentage);

  return (
    <div className="dashboard">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <Logo/>

        <div className="search-bar">
          <FaSearch className="search-icon" />

          <input type="text" placeholder="Search tasks..." />
        </div>

        <div className="nav-right">
         <button
    className="back-btn"
    onClick={() => navigate("/LandingPage")}>
    ← Back
  </button>
          <button className="add-btn" onClick={() => navigate("/Task")}>
            <FaPlus />
            New Task
          </button>

          {/* NOTIFICATION */}

          <div
            className="notification"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />

            {notifications.length > 0 && <span>{notifications.length}</span>}

            {showNotifications && (
              <div className="notification-box">
                <h3>Notifications</h3>

                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications
                    .slice(0, 5)
                    .map((note, index) => <p key={index}>{note}</p>)
                )}
              </div>
            )}
          </div>

          <div className="profile">
            <div className="avatar">{firstLetter}</div>

            <div>
              <h4>{user?.fullName}</h4>

              
            </div>
          </div>
        </div>
      </header>

      {/* ================= WELCOME ================= */}

      <section className="welcome">
        <h1>Welcome Back, {user?.fullName} 👋</h1>

        <p>Organize your work, track your progress and stay productive.</p>
      </section>

      {/* ================= STATS ================= */}

      <section className="stats">
        <div className="stat-card">
          <div className="icon blue">
            <FaTasks />
          </div>

          <div>
            <h2>{totalTasks}</h2>

            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon green">
            <FaCheckCircle />
          </div>

          <div>
            <h2>{completedTasks}</h2>

            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon orange">
            <FaClock />
          </div>

          <div>
            <h2>{pendingTasks}</h2>

            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="icon red">
            <FaFire />
          </div>

          <div>
            <h2>{dueToday}</h2>

            <p>Due Today</p>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section className="main-grid">
        <div className="left-section">
          <div className="section-header">
            <h2>Today's Tasks</h2>

            <button className="view-btn" onClick={() => navigate("/Task")}>
              View All
            </button>
          </div>

          {tasks.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            tasks.slice(0, 3).map((task) => (
              <div className="task-card" key={task.id}>
                <div className="task-info">
                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  <div className="task-footer">
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>

                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="right-section">
          <div className="progress-card">
            <h3>Task Progress</h3>

            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(

#22c55e 0% ${completedPercentage}%,

#3b82f6 ${completedPercentage}% ${completedPercentage + progressPercentage}%,

#f59e0b ${completedPercentage + progressPercentage}% 100%

)`,
              }}
            >
              <div className="circle">
                <h2>{progress}%</h2>

                <p>Completed</p>
              </div>
            </div>

            <div className="status-legend">
              <p>
                <span className="completed-dot"></span>
                Completed
              </p>

              <p>
                <span className="progress-dot"></span>
                In Progress
              </p>

              <p>
                <span className="pending-dot"></span>
                Pending
              </p>
            </div>
          </div>

          <div className="activity-card">
            <h3>Recent Activity</h3>

            <ul>
              {tasks.length === 0 ? (
                <li>No recent activity</li>
              ) : (
                tasks
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((task) => (
                    <li key={task.id}>
                      📝 {task.title}-{task.status}
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
