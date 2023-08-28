import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import paddingStyles from "../../styles/PostCreateForm.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Event from "./Event";
import EventCommentCreateForm from "../comments/EventCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EventComment from "../comments/EventComment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset"
import PopularProfiles from "../profiles/PopularProfiles";

function EventPage() {
  const { id } = useParams();
  const [eventpost, setEventpost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [eventComments, setEventComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }, {data: eventcomments}] = await Promise.all([
          axiosReq.get(`/events/${id}`),
          axiosReq.get(`/eventcomments/?eventpost=${id}`)
        ]);
        setEventpost({ results: [event] });
        setEventComments(eventcomments)
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className={paddingStyles.BottomPadding}>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
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
            {eventComments.results.length ? (
              <InfiniteScroll
                children={eventComments.results.map((eventcomment) => (
                  <EventComment
                    key={eventcomment.id}
                    {...eventcomment}
                    setEventpost={setEventpost}
                    setEventComments={setEventComments}
                  />
                ))}
                dataLength={eventComments.results.length}
                loader={<Asset spinner />}
                hasMore={!!eventComments.next}
                next={() => fetchMoreData(eventComments, setEventComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first one to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
          </Container>
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </div>
  );
}

export default EventPage;
