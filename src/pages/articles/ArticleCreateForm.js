import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import styles from "../../styles/PostCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function ArticleCreateForm() {
  useRedirect("loggedOut");
  
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    article_link: "",
  });

  const { title, content, article_link } = articleData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); history.push("/articles/");};
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("article_link", article_link);

    try {
      await axiosReq.post("/articles/", formData)
      .then(function(response) {
        if(response.status === 201) {
          handleShow();
      }});
    } catch (err) {
      // console.log(err);
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
          aria-label="Article title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
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
          aria-label="Article description"
          value={content}
          onChange={handleChange}
          placeholder="Brief description of the article"
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="article_link">
        <Form.Label>Article Link</Form.Label>
        <Form.Control
          type="url"
          name="article_link"
          aria-label="Article link"
          value={article_link}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.article_link?.map((message, idx) => (
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
        Create
      </Button>
    </div>
  );

  return (
    <Container>
      <Form
        className={styles.BottomPaddingEventArticle}
        onSubmit={handleSubmit}
      >
        <Row className={`${styles.Row} justify-content-md-center`}>
          <Col md={7} lg={8}>
            <Container className={`${appStyles.Content} ${styles.Container}`}>
              <div className={styles.AddTitle}>Add article!</div>
              <div>{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
      <Modal className={styles.modal} show={show} onHide={handleClose}>
        <Modal.Body variant="dark">
          Your article is successfully submitted!
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ArticleCreateForm;
