import React from "react";
import logo from "../assets/logo.png";
import styles from "../styles/MainLogoContainer.module.css";
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const MainLogoContainer = () => {
  return (
    <Container className={`${styles.NavBar} justify-content-center`}>
      <NavLink to="/">
        <Navbar.Brand>
          <img className={styles.logo} src={logo} alt="logo" height="50" />
          <span className={styles.title}>PetsRoom</span>
        </Navbar.Brand>
      </NavLink>
    </Container>
  );
};

export default MainLogoContainer;
