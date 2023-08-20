import React, { useEffect, useState } from "react";

import { Container, Col, Row } from "react-bootstrap";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Event from "./Event";

function PostPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
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
        <Event {...event.results[0]} setEvents={setEvent} eventPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;
