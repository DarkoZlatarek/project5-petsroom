import React from "react"
import { Navbar, Container, Nav} from "react-bootstrap";
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.logo} src={logo} alt="logo" height="50" />
            <span className={styles.title}>PetsRoom</span>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-solid fa-house"></i>
              <span className={styles.NavText}>Home</span>
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fa-solid fa-right-to-bracket"></i>
              <span className={styles.NavText}>Sign in</span>
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span className={styles.NavText}>Sign up</span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar