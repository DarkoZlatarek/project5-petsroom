import React from "react";
import styles from "../../styles/Article.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media} from "react-bootstrap";
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
    title,
    content,
    article_link,
    modified_on,
    articlePage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/articles/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/articles/${id}/`)
      history.goBack()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Card className={styles.Article}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{modified_on}</span>
            {is_owner && articlePage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/articles/${id}`}>
        <div className={styles.ArticleBorder}>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && <Card.Title className="text-center">{content}</Card.Title>}
          {article_link && <Card.Title className="text-center">{article_link}</Card.Title>}
        </div>
      </Link>
    </Card>
  );
};

export default Event;
