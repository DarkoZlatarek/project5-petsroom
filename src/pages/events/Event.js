import React from "react";
import styles from "../../styles/Event.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

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

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/events/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`)
      history.goBack()
    } catch(err) {
      // console.log(err)
    }
  }

  return (
    <Container>
      <Card className={styles.Event}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className="d-flex align-items-center">
              <span>{modified_on}</span>
              {is_owner && eventPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Media>
        </Card.Body>
        <Link className={styles.EventHover} to={`/events/${id}`}>
          {place && (
                <Card.Text className="text-center">Place: {place}</Card.Text>
              )}
          <Row className={styles.EventBorder}>
            
            <Col>
              {date && <Card.Text className="text-center">Date: {date}</Card.Text>}
            </Col>
            <Col>
              {time && <Card.Text className="text-center">Time: {time}</Card.Text>}
            </Col>
          </Row>
          {title && <Card.Text className="text-center"><div>Title:</div>{title}</Card.Text>}
          {content && <Card.Text className="text-center"><div>Description:</div>{content}</Card.Text>}
        </Link>
        <Card.Body>
          <div className={styles.PostBar}>
            <Link to={`/events/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {eventcomments_count}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Event;
