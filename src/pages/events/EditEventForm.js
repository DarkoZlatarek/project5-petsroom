import React, {useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PostCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function EditEventForm() {
  
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
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        const { title, place, content, date, time, is_owner } = data;

        is_owner
          ? setEventData({ title, place, content, date, time })
          : history.push("/");
      } catch (err) {
        console.log(err);
      }
    }

    handleMount();
  }, [history, id])

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
      await axiosReq.put(`/events/${id}/`, formData);
      history.push(`/events/${id}/`);
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
        className={`${btnStyles.Button} ${btnStyles.BlackCancelCreate}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.BlackCancelCreate}`} type="submit">
        Save event
      </Button>
    </div>
  );

  return (
    <Form className={styles.BottomPaddingEventArticle} onSubmit={handleSubmit}>
      <Row className={`${styles.Row} justify-content-md-center`}>
        <Col md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container}`}
          >
            <div>{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EditEventForm;
