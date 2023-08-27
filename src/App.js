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
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EventsPage from "./pages/events/EventsPage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import EditPostForm from "./pages/posts/EditPostForm";
import EditEventForm from "./pages/events/EditEventForm";
import EditArticleForm from "./pages/articles/EditArticleForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NavBarMini from "./components/NavBarMini";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <div className={styles.LgNavbar}>
        <NavBar />
      </div>
      <div className={styles.SmNavbar}>
        <NavBarMini />
      </div>

      <Container className={styles.main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <PostsPage message="No results found." />}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Follow someone to have their posts listed in here"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Like someone's post to have that post listed in here"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/events"
            render={() => <EventsPage message="No events to display!" />}
          />
          <Route
            exact
            path="/articles"
            render={() => <ArticlesPage message="No articles to display!" />}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <EditPostForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />
          <Route
            exact
            path="/events/create"
            render={() => <EventCreateForm />}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={() => <EditEventForm />}
          />
          <Route exact path="/events/:id" render={() => <EventPage />} />
          <Route
            exact
            path="/articles/create"
            render={() => <ArticleCreateForm />}
          />
          <Route
            exact
            path="/articles/:id/edit"
            render={() => <EditArticleForm />}
          />
          <Route exact path="/articles/:id" render={() => <ArticlePage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
