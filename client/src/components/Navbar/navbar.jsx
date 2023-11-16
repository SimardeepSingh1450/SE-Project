import { NavLink } from "react-router-dom";

export default function ButtonAppBar() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'rgb(207, 207, 207)'
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <div className="navbar-brand fw-bold"><NavLink to="/" style={linkStyle}>MP Game</NavLink></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link "><NavLink to="profile/asgard_ian" style={linkStyle}>Profile</NavLink></div>
            </li>
            <li className="nav-item">
              <div className="nav-link " ><NavLink to="dashboard" style={linkStyle}>DashBoard</NavLink></div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}