import React from "react"
import { Navbar, Container, Nav} from "react-bootstrap";
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-regular fa-square-plus"></i>
      <span className={styles.NavText}>Add post</span>
    </NavLink>
  );

  const addEventIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/events/create"
    >
      <i className="fa-regular fa-calendar-plus"></i>
      <span className={styles.NavText}>Add event</span>
    </NavLink>
  );

  const addArticleIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/articles/create"
    >
      <i className="fa-regular fa-file-circle-plus"></i>
      <span className={styles.NavText}>Add article</span>
    </NavLink>
  );


  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/events"
      >
        <i className="fa-regular fa-dog"></i>
        <span className={styles.NavText}>Events</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/articles"
      >
        <i className="fa-regular fa-file-lines"></i>
        <span className={styles.NavText}>Articles</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/followers"
      >
        <i className="fa-regular fa-users"></i>
        <span className={styles.NavText}>Followers</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={() => {}}
      >
        <i className="fa-regular fa-right-from-bracket"></i>
        <span className={styles.NavText}>Sign out</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <img src={currentUser?.profile_image} alt="profile"/>
        <span className={styles.NavText}>Sign out</span>
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
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
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img className={styles.logo} src={logo} alt="logo" height="50" />
            <span className={styles.title}>PetsRoom</span>
          </Navbar.Brand>
        </NavLink>
        {currentUser ?? addPostIcon}
        {currentUser ?? addEventIcon}
        {currentUser ?? addArticleIcon}
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
              {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar