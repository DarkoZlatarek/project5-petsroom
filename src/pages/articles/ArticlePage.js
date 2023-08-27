import React, { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";

import { useParams } from "react-router-dom/cjs/react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Article from "./Article";
import PopularProfiles from "../profiles/PopularProfiles";

function PostPage() {
  const { id } = useParams();
  const [article, setArticle] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: article }] = await Promise.all([
          axiosReq.get(`/articles/${id}`),
        ]);
        setArticle({ results: [article] });
        console.log(article);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularProfiles mobile />
        <Article {...article.results[0]} setArticles={setArticle} articlePage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;
