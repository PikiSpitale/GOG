import { useCallback, useEffect, useMemo, useState } from "react";

import "./assets/styles/globals.css";
import "./assets/styles/components.css";
import "./assets/styles/animations.css";

import { Header } from "./components/Header";
import { ProfileBanner } from "./components/ProfileBanner";
import { GamesTable } from "./components/GamesTable";
import { FollowersList } from "./components/FollowersList";
import { ProfileTabs } from "./components/ProfileTabs";
import { Forum } from "./components/Forum";
import { initialGames } from "./data/games";
import { initialFollowers } from "./data/followers";
import { initialForumPosts } from "./data/forumPosts";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [followers, setFollowers] = useState(initialFollowers);
  const [forumPosts] = useState(initialForumPosts);
  const [profileTab, setProfileTab] = useState("games");
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

  const handleToggleFollow = useCallback((followerId) => {
    setFollowers((previousFollowers) =>
      previousFollowers.map((follower) =>
        follower.id === followerId
          ? {
              ...follower,
              isFollowingBack: !follower.isFollowingBack,
            }
          : follower
      )
    );
  }, []);

  const profileTabs = useMemo(
    () => [
      { id: "games", label: "Biblioteca" },
      { id: "followers", label: `Seguidores (${followers.length})` },
    ],
    [followers.length]
  );

  let content;
  if (route === "/login") {
    content = <Login />;
  } else if (route === "/register") {
    content = <Register />;
  } else if (route === "/foro") {
    content = <Forum posts={forumPosts} />;
  } else {
    content = (
      <>
        <ProfileBanner username="Usuario GOG" />
        <ProfileTabs
          tabs={profileTabs}
          activeTab={profileTab}
          onTabChange={setProfileTab}
        />
        {profileTab === "followers" ? (
          <FollowersList
            followers={followers}
            onToggleFollow={handleToggleFollow}
          />
        ) : (
          <GamesTable games={games} onUpdateGame={handleUpdateGame} />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="container">{content}</main>
    </div>
  );
}
