import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🩸 AI Blood Donation</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/donor">Find Donor</Link>
        <Link to="/request">Blood Request</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/ai">AI Assistant</Link>
      </div>
    </nav>
  );
}

export default Navbar;