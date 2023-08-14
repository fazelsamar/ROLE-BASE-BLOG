import { Link, NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ padding: "5px", marginBottom: "10px" }}
      >
        <a className="navbar-brand" href="#">
          Role Base Blog
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink exact="true" className="nav-item nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-item nav-link" to="/admin">
              Admin Panel
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
