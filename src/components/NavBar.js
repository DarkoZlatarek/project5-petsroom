import React from "react"
import { Navbar, Container, Nav} from "react-bootstrap";
import logo from "../assets/logo.png"
import styles from "../styles/NavBar.module.css"

const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <Navbar.Brand>
          <Nav.Link>
            <img className={styles.logo} src={logo} alt="logo" height="50" />
            <spam className={styles.title}>Petshome</spam>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <Nav.Link>
              <i className="fa-solid fa-house"></i>
              <spam className={styles.NavText}>Home</spam>
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-right-to-bracket"></i>
              <spam className={styles.NavText}>Sign in</spam>
            </Nav.Link>
            <Nav.Link>
              <i className="fa-solid fa-user-plus"></i>
              <spam className={styles.NavText}>Sign up</spam>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar