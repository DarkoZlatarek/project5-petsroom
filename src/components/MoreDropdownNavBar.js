import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

export function MoreDropdownNavBar({ id }) {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const ProfileIcon = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <Avatar src={currentUser?.profile_image} height={30} />
    </div>
  ));
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`}>
      <Dropdown.Toggle as={ProfileIcon} />
      <Dropdown.Menu className={styles.DropdownMenu}>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${currentUser?.profile_id}`)}
          aria-label="profile"
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push("/liked")}
          aria-label="Liked posts"
        >
          Liked posts
        </Dropdown.Item>
        <Dropdown.Item
          onClick={async () => {
            try {
              await axios.post("dj-rest-auth/logout/");
              setCurrentUser(null);
              removeTokenTimestamp();
              history.push("/");
            } catch (err) {
              // console.log(err);
            }
          }}
          aria-label="sign out"
        >
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
