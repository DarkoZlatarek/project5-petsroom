import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "../styles/NavBarMini.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import MainLogoContainer from "./MainLogoContainer";
import { MoreDropdownNavBar } from "./MoreDropdownNavBar";
import { MoreDropdownAddIcons } from "./MoreDropdownAddIcons";

const NavBarMini = () => {
  const currentUser = useCurrentUser();

  const addDropDownIcons = (
    <MoreDropdownAddIcons />
  );

  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={`${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/"
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>Home</Tooltip>}>
          <i className="fa-solid fa-house"></i>
        </OverlayTrigger>
      </NavLink>

      <NavLink
        exact
        className={`${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/feed"
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>Feed</Tooltip>}>
        <i className="fa-solid fa-hashtag"></i>
        </OverlayTrigger>
      </NavLink>

      {currentUser && <div className={styles.DropdownAddStyle}>{addDropDownIcons}</div>}

      <NavLink
        className={`${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/events"
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>Events</Tooltip>}>
        <i className="fa-regular fa-calendar-days"></i>
        </OverlayTrigger>
      </NavLink>
      <NavLink
        className={`${styles.NavLink}`}
        activeClassName={styles.Active}
        to="/articles"
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>Articles</Tooltip>}>
        <i className="fa-solid fa-file-lines"></i>
        </OverlayTrigger>
      </NavLink>
      <div className={`${styles.NavLink} ${styles.AvatarPosition}`}>
        <div className={styles.DropdownProfileStyle}><MoreDropdownNavBar /></div>
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
    <Navbar className={`${styles.NavBar} justify-content-center`}>
      <MainLogoContainer />
        <Container className={`${styles.navBarMiniPosition} justify-content-center`}>
          <Nav className=" text-right">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarMini