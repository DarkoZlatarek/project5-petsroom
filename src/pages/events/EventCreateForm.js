import React, { useState } from "react";

import { Form, Button, Row, Col, Container, Alert, Modal } from "react-bootstrap";

import styles from "../../styles/PostCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function EventCreateForm() {
  useRedirect("loggedOut");
  
  const [eventData, setEventData] = useState({
    title: "",
    place: "",
    content: "",
    date: "",
    time: "",
  });

  const { title, place, content, date, time } = eventData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); history.push("/events/");};
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("place", place);
    formData.append("content", content);
    formData.append("date", date);
    formData.append("time", time);

    try {
      await axiosReq.post("/events/", formData)
      .then(function(response) {
        if(response.status === 201) {
          handleShow();
      }});
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          aria-label="event title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="place">
        <Form.Label>Place</Form.Label>
        <Form.Control
          type="text"
          name="place"
          aria-label="Place of the event"
          value={place}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.place?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          aria-label="Event description"
          value={content}
          onChange={handleChange}
          placeholder="Describe the meeting place and what pet you bringing with you."
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          aria-label="Date of the event"
          value={date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.date?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="time">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="time"
          aria-label="Time of the event"
          value={time}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.time?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create event
      </Button>
    </div>
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className={`${styles.Row} justify-content-md-center`}>
          <Col md={7} lg={8}>
            <Container className={`${appStyles.Content} ${styles.Container}`}>
              <div>{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
      <Modal className={styles.modal} show={show} onHide={handleClose}>
        <Modal.Body variant="dark">
          Your event is successfully submitted!
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default EventCreateForm;
