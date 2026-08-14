import logo from "../assets/image.png";
import "../styles/Logo.css";

function Logo() {
  return (
    <div className="tf-logo-container">
      <img
        src={logo}
        alt="TaskFlow Logo"
        className="tf-logo-img"
      />

      <div className="tf-logo-text">
        <h2>TaskFlow</h2>
        <p>Plan • Track • Complete</p>
      </div>
    </div>
  );
}

export default Logo;