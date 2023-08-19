import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import EventCreateForm from "./pages/events/EventCreateForm";
import ArticleCreateForm from "./pages/articles/ArticleCreateForm";
import PostPage from "./pages/posts/PostPage";
import EventPage from "./pages/events/EventPage";
import ArticlePage from "./pages/articles/ArticlePage";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route exact path="/events/create" render={() => <EventCreateForm />} />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route exact path="/articles/create" render={() => <ArticleCreateForm />} />
          <Route exact path="/articles/:id" render={() => <ArticlePage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
