import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";

test("renders navbar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  //   screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for loged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Darko");
  expect(profileAvatar).toBeInTheDocument();
});
