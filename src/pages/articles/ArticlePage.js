import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router-dom/cjs/react-router-dom";
import {axiosReq} from "../../api/axiosDefaults"
import Article from "./Article";
import PopularProfiles from "../profiles/PopularProfiles";
import paddingStyles from "../../styles/PostCreateForm.module.css";

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
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className={paddingStyles.BottomPadding}>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
          <PopularProfiles mobile />
          <Article
            {...article.results[0]}
            setArticles={setArticle}
            articlePage
          />
        </Col>
        <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
          <PopularProfiles />
        </Col>
      </Row>
    </div>
  );
}

export default PostPage;
