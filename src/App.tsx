import "./App.css";
import Nav from "./components/Nav.tsx";
import GamesList from "./components/GamesList.tsx";
import SingleGame from "./components/SingleGame.tsx";
import UserPage from "./components/UserPage.tsx";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const dataUser = window.localStorage.getItem("set_the_user");
    const dataLoggedIn = window.localStorage.getItem("set_the_logged_in_value");
    setUser(JSON.parse(dataUser));
    setLoggedIn(JSON.parse(dataLoggedIn));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("set_the_user", JSON.stringify(user));
    window.localStorage.setItem(
      "set_the_logged_in_value",
      JSON.stringify(loggedIn)
    );
  }, [loggedIn, user]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<GamesList />} />
        <Route
          path="/reviews/:review_id"
          element={<SingleGame user={user} loggedIn={loggedIn} />}
        />
        <Route
          path="/users"
          element={
            <UserPage
              user={user}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
