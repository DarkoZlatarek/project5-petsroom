import React, { useState } from "react"
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import EventCommentEditForm from "./EventCommentEditForm";

const EventPostComment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    modified_on,
    content,
    id,
    setEventpost,
    setEventComments,
  } = props;
  
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/eventcomments/${id}`)
      setEventpost(prevEventpost => ({
        results: [{
          ...prevEventpost.results[0],
          eventcomments_count: prevEventpost.results[0].eventcomments_count - 1
        }]
      }))

      setEventComments(prevEventComments => ({
        ...prevEventComments,
        results: prevEventComments.results.filter((eventcomment) => eventcomment.id !== id)
      }))
      
    } catch(err) {

    }
  }

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{modified_on}</span>
          {showEditForm ? (
            <EventCommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setEventComments={setEventComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </>
  );
}

export default EventPostComment