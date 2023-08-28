import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Image";
import Image from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import Upload from "../../assets/upload.PNG";

import styles from "../../styles/PostCreateForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
  useRedirect("loggedOut");

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    pet: "",
  });

  const { title, content, image, pet } = postData;

  const [errors, setErrors] = useState({});

  const imageInput = useRef(null);

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false); history.push("/");};
  const handleShow = () => setShow(true);

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("pet", pet);

    try {
      await axiosReq.post("/posts/", formData)
      .then(function(response) {
        if(response.status === 201) {
          handleShow();
      }});
    }
    catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="title">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          name="title"
          aria-label="post title"
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
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="content"
          aria-label="Post description"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert className="text-center" variant="dark" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="pet">
        <Form.Label>Pet type:</Form.Label>
        <Form.Control
          as="select"
          name="pet"
          aria-label="Pet"
          onChange={handleChange}
        >
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="rabbit">rabbit</option>
          <option value="hamster">hamster</option>
          <option value="bird">bird</option>
          <option value="ferret">ferret</option>
          <option value="reptile">reptile</option>
          <option value="fish">fish</option>
          <option value="horse">horse</option>
          <option value="spider">spider</option>
          <option value="frog">frog</option>
          <option value="gerbil">gerbil</option>
          <option value="chicken">chicken</option>
          <option value="cow">cow</option>
          <option value="pig">pig</option>
          <option value="guinea_pig">guinea pig</option>
        </Form.Control>
      </Form.Group>
      <div>
        <div>
          <Button
            className={`${btnStyles.Button} ${btnStyles.BlackCancelCreate}`}
            onClick={() => history.goBack()}
          >
            cancel
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.BlackCancelCreate}`}
            type="submit"
          >
            create
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Container>
      <Form className={styles.BottomPadding} onSubmit={handleSubmit}>
        <Row>
          <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure>
                      <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.BlackCancelCreate} btn`}
                        htmlFor="image-upload"
                      >
                        Change image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <div className={styles.AssetCursor}>
                      <Asset src={Upload} message="Click to upload an image" />
                    </div>
                  </Form.Label>
                )}
                <Form.File
                  id="image-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors?.image?.map((message, idx) => (
                <Alert className="text-center" variant="dark" key={idx}>
                  {message}
                </Alert>
              ))}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
          <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
        </Row>
      </Form>
      <Modal className={styles.modal} show={show} onHide={handleClose}>
        <Modal.Body variant="dark">
          Your post is successfully submitted!
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default PostCreateForm;
