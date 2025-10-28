import { useEffect, useMemo, useState } from "react";

import "./assets/styles/globals.css";
import "./assets/styles/components.css";
import "./assets/styles/animations.css";

import { Header } from "./components/Header";
import { ProfileBanner } from "./components/ProfileBanner";
import { GamesTable } from "./components/GamesTable";
import { initialGames } from "./data/games";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [route, setRoute] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleUpdateGame = (updatedGame) => {
    setGames((previousGames) =>
      previousGames.map((game) =>
        game.id === updatedGame.id ? { ...game, ...updatedGame } : game
      )
    );
  };

  const content = useMemo(() => {
    if (route === "/login") {
      return <Login />;
    }
    if (route === "/register") {
      return <Register />;
    }
    return (
      <>
        <ProfileBanner username="Usuario GOG" />
        <GamesTable games={games} onUpdateGame={handleUpdateGame} />
      </>
    );
  }, [route, games]);

  return (
    <div className="app">
      <Header />
      <main className="container">{content}</main>
    </div>
  );
}
