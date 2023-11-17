import { NavLink } from "react-router-dom";
import './navbar.css';

export default function ButtonAppBar() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-custom temp">
      <div className="d-flex align-items-center pl-5">
        <div className="navbar-brand fw-bold"><NavLink to="/" style={linkStyle} id="heading">MP Game</NavLink></div>
        <div className="nav-link ml-1"><NavLink to="dashboard" style={linkStyle} id='dash' className='links'>DashBoard</NavLink></div>
        <div className="nav-link ml-5"><NavLink to="/profile" style={linkStyle} id='profile' className='links'>Profile</NavLink></div>
        <div className="nav-link ml-5"><NavLink to="/notificationsPage" style={linkStyle} id='notifications' className='links'>Notifications</NavLink></div>
        <div className="nav-link ml-5"><NavLink to="/friendsPageNew" style={linkStyle} id='friends' className='links'>Friends</NavLink></div>
        <div className="nav-link ml-5"><NavLink to="/leaderboard" style={linkStyle} id='leaderboard' className='links'>Leaderboard</NavLink></div>
      </div>
      <ul className="navbar-nav ml-auto mr-5">
        <div className="nav-link "><NavLink to="/logout" style={linkStyle} id='logout'>Log Out</NavLink></div>
      </ul>
      {/* <div className="container-fluid"> */}
        {/* <div className="navbar-brand fw-bold"><NavLink to="/" style={linkStyle}>MP Game</NavLink></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link "><NavLink to="/profile" style={linkStyle}>Profile</NavLink></div>
            </li>
            <li className="nav-item">
              <div className="nav-link " ><NavLink to="dashboard" style={linkStyle}>DashBoard</NavLink></div>
            </li>
          </ul> */}
        {/* <div className="" id="navbarNav"> */}
        {/* </div> */}
      {/* </div> */}
    </nav>
  );
}