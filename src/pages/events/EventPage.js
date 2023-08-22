import React, { useEffect, useState } from "react";

import { Container, Col, Row } from "react-bootstrap";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Event from "./Event";
import EventCommentCreateForm from "../comments/EventCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function EventPage() {
  const { id } = useParams();
  const [eventpost, setEventpost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [eventComments, setEventComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEventpost({ results: [event] });
        console.log(event);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Event {...eventpost.results[0]} setEvents={setEventpost} eventPage />
        <Container className={appStyles.Content}>
          {currentUser ? (
            <EventCommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              eventpost={id}
              setEventpost={setEventpost}
              setEventComments={setEventComments}
            />
          ) : eventComments.results.length ? (
            "Comments"
          ) : null}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default EventPage;
