import React, { useEffect, useState } from "react";
import Event from "./Event"
import Asset from "../../components/Asset"

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsEventsArticlesPage.module.css";
import paddingStyles from "../../styles/PostCreateForm.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function EventsPage({ message, filter = "" }) {
  const [events, setEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/events/?${filter}search=${query}`);
        setEvents(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchEvents();
    }, 1000);
    return () => {
        clearTimeout(timer)
    }

  }, [filter, query, pathname, currentUser]);

  return (
    <div className={paddingStyles.BottomPadding}>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <i
            className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}
          ></i>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search events"
            />
          </Form>
          {hasLoaded ? (
            <>
              {events.results.length ? (
                <InfiniteScroll
                  children={events.results.map((event) => (
                    <Event key={event.id} {...event} setEvents={setEvents} />
                  ))}
                  dataLength={events.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!events.next}
                  next={() => fetchMoreData(events, setEvents)}
                />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </div>
  );
}

export default EventsPage;
