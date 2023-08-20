import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    eventcomments_count,
    title,
    place,
    date,
    time,
    content,
    modified_on,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Event}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{modified_on}</span>
            {is_owner && eventPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`events/${id}`}>
        <div className={styles.EventBorder}>
          {place && <Card.Title className="text-center">{place}</Card.Title>}
          {date && <Card.Title className="text-center">{date}</Card.Title>}
          {time && <Card.Title className="text-center">{time}</Card.Title>}
        </div>
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text className="text-center">{content}</Card.Text>}
        <div className={styles.PostBar}>
          <Link to={`/events/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {eventcomments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;
