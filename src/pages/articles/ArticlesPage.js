import React, { useEffect, useState } from "react";
import Article from "./Article"
import Asset from "../../components/Asset"

import { Form, Col, Row, Container } from "react-bootstrap";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsEventsArticlesPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function ArticlesPage({ message, filter = "" }) {
  const [articles, setArticles] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/?${filter}search=${query}`);
        setArticles(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchArticles();
    }, 1000);
    return () => {
        clearTimeout(timer)
    }

  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`}></i>
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search articles"
          />
        </Form>
        {hasLoaded ? (
          <>
            {articles.results.length ? (
              <InfiniteScroll
                children={articles.results.map((article) => (
                  <Article key={article.id} {...article} setArticles={setArticles} />
                ))}
                dataLength={articles.results.length}
                loader={<Asset spinner />}
                hasMore={!!articles.next}
                next={() => fetchMoreData(articles, setArticles)}
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
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default ArticlesPage;
