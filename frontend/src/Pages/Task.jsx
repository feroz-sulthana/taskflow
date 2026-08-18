import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

import "../styles/Tasks.css";


function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "High",
    status: "Pending",
    dueDate: "",
  });

  // GET ALL TASKS

  useEffect(() => {
    fetch("https://taskflow-11.onrender.com/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);

  // INPUT CHANGE

  const handleChange = (e) => {
    setTask({
      ...task,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE + UPDATE

  const saveTask = async () => {
    let url = "https://taskflow-11.onrender.com/tasks";

    let method = "POST";

    if (editId) {
      url = `https://taskflow-11.onrender.com/tasks/${editId}`;

      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(task),
    });

    const data = await response.json();

    if (editId) {
      setTasks(tasks.map((item) => (item.id === editId ? data : item)));
    } else {
      setTasks([...tasks, data]);
    }

    closeModal();
  };

  // DELETE TASK

  const deleteTask = async (id) => {
    await fetch(
      `https://taskflow-11.onrender.com/tasks/${id}`,

      {
        method: "DELETE",
      },
    );

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // EDIT TASK

  const editTask = (item) => {
    setEditId(item.id);

    setTask({
      title: item.title,

      description: item.description,

      priority: item.priority,

      status: item.status,

      dueDate: item.dueDate,
    });

    setShowModal(true);
  };

  // CLOSE MODAL

  const closeModal = () => {
    setShowModal(false);

    setEditId(null);

    setTask({
      title: "",
      description: "",
      priority: "High",
      status: "Pending",
      dueDate: "",
    });
  };

  const filteredTasks = tasks.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FaArrowLeft />
            Back
          </button>

          <h1>Task Manager</h1>

          <p>Manage all your daily tasks efficiently.</p>
        </div>

        <button className="add-task-btn" onClick={() => setShowModal(true)}>
          <FaPlus />
          Add Task
        </button>
      </div>

      <div className="search-container">
        <FaSearch />

        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="task-list">
        {filteredTasks.map((item) => (
          <div className="task-card" key={item.id}>
            <div className="task-top">
              <div>
                <h2>{item.title}</h2>

                <p>{item.description}</p>
              </div>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => editTask(item)}>
                  <FaEdit />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="task-bottom">
              <span className={`priority ${item.priority.toLowerCase()}`}>
                {item.priority}
              </span>

              <span className="status">{item.status}</span>

              <span className="date">
                <FaCalendarAlt />

                {item.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="task-modal">
          <div className="modal-content">
            <h2>{editId ? "Update Task" : "Add New Task"}</h2>

            <div className="form-group">
              <label>Task Title</label>

              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                rows="4"
                value={task.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="form-group">
                <label>Priority</label>

                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option>High</option>

                  <option>Medium</option>

                  <option>Low</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <option>Pending</option>

                  <option>In Progress</option>

                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Due Date</label>

              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="modal-buttons">
              <button className="save-btn" onClick={saveTask}>
                {editId ? "Update" : "Save"}
              </button>

              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
