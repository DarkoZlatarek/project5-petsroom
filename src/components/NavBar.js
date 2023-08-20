import React from "react"
import { Navbar, Container, Nav, NavDropdown, OverlayTrigger, Tooltip} from "react-bootstrap";
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser, } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      // console.log(err);
    }
  };

  const addSignOutIcon = (
    <NavLink
      className={styles.NavLink}
      to="/"
      onClick={handleSignOut}
      aria-label="signout"
    >
      
      <span className={styles.NavText}>Sign out</span>
    </NavLink>
  );

  const addProfileIcon = (
    <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
      aria-label="profile"
    >
    <span className={styles.NavText}>Profile</span>
    </NavLink>
  );

  const addLikedPostsIcon = (
    <NavLink
      className={styles.NavLink}
      to="/liked"
      aria-label="liked posts"
    >
    <span className={styles.NavText}>Liked posts</span>
    </NavLink>
  );

  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus"></i>
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
      <i className="fa-solid fa-file-circle-plus"></i>
      <span className={styles.NavText}>Add article</span>
    </NavLink>
  );

  const addDropDownIcons = (
    <>
      <NavDropdown
        className={styles.toggle}
        activeClassName={styles.Active}
        title={<i className="fa-solid fa-dog"></i>}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>{addPostIcon}</NavDropdown.Item>
        <NavDropdown.Item>{addEventIcon}</NavDropdown.Item>
        <NavDropdown.Item>{addArticleIcon}</NavDropdown.Item>
      </NavDropdown>
    </>
  );


  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={`${styles.NavLink} ${styles.NavLinkPosition}`}
        activeClassName={styles.Active}
        to="/"
      >
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Home</Tooltip>}>
          <i className="fa-solid fa-house"></i>
        </OverlayTrigger>
      </NavLink>

      <NavLink
        exact
        className={`${styles.NavLink} ${styles.NavLinkPosition}`}
        activeClassName={styles.Active}
        to="/feed"
      >
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Feed</Tooltip>}>
        <i className="fa-solid fa-hashtag"></i>
        </OverlayTrigger>
      </NavLink>

      {currentUser && addDropDownIcons}

      <NavLink
        className={`${styles.NavLink} ${styles.NavLinkPosition}`}
        activeClassName={styles.Active}
        to="/events"
      >
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Events</Tooltip>}>
        <i className="fa-regular fa-calendar-days"></i>
        </OverlayTrigger>
      </NavLink>
      <NavLink
        className={`${styles.NavLink} ${styles.NavLinkPosition}`}
        activeClassName={styles.Active}
        to="/articles"
      >
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Articles</Tooltip>}>
        <i className="fa-solid fa-file-lines"></i>
        </OverlayTrigger>
      </NavLink>
      <NavLink
        className={`${styles.NavLink} ${styles.NavLinkPosition}`}
        activeClassName={styles.Active}
        to="/followers"
      >
        <OverlayTrigger placement="bottom" overlay={<Tooltip>Followers</Tooltip>}>
        <i className="fa-solid fa-users"></i>
        </OverlayTrigger>
      </NavLink>
      <div className={styles.avatarDiv}>
        <NavDropdown
          className={styles.toggle}
          activeClassName={styles.Active}
          title={
            <Avatar
              src={currentUser?.profile_image}
              text={currentUser?.username}
              height={40}
            />
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item>{addProfileIcon}</NavDropdown.Item>
          <NavDropdown.Item>{addLikedPostsIcon}</NavDropdown.Item>
          <NavDropdown.Item>{addSignOutIcon}</NavDropdown.Item>
        </NavDropdown>
      </div>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
      >
        <i className="fa-solid fa-house"></i>
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
        <span className={styles.NavText}>sign up</span>
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
          <Nav className="ml-auto text-right">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar