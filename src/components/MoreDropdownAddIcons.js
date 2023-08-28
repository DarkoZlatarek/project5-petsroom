import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdownAddIcon.module.css";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu


export function MoreDropdownAddIcons() {
  
  const history = useHistory();
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <div className={styles.DogPadding} ref={ref}
  onClick={(e) => {
    e.preventDefault();
    onClick(e);
  }}>
    <i className="fa-solid fa-dog"></i>
  </div>
));
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`}>
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={styles.DropdownMenu} >
        <Dropdown.Item
          onClick={() => history.push("/posts/create")}
          aria-label="Add post"
        >
           <i className="fa-solid fa-circle-plus"></i>Profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push("/events/create")}
          aria-label="Add event"
        >
          <i className="fa-regular fa-calendar-plus"></i>Add event
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push("/articles/create")}
          aria-label="Add article"
        >
          <i className="fa-solid fa-file-circle-plus"></i>Add article
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
