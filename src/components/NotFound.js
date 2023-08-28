import NoResults from "../assets/not-found.png";
import React from "react";
import styles from "../styles/NotFound.module.css"
import Asset from "../components/Asset"

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <Asset src={NoResults} message="Sorry, the page you're looking for doesn't exist" />
    </div>
  );
};

export default NotFound;
