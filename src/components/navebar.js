import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-dark bg-primary px-3"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to="/">
          Train Booking
        </Link>

        <ul className="navbar-nav d-flex flex-row ms-auto">
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/signup">
              Signup
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/login">
              Login
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/logout">
              Logout
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/home2">
              Home2
            </Link>
          </li>

          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="nav-link text-white" to="/mybooking">
              My Booking
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
