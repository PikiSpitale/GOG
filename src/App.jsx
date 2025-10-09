import "./assets/styles/globals.css";
import "./assets/styles/components.css";
import "./assets/styles/animations.css";

import { Header } from "./components/Header";
import { ProfileBanner } from "./components/ProfileBanner";
import { GamesTable } from "./components/GamesTable";

export default function App() {
  const games = [
    { title: "Persona 5 Royal", genre: "JRPG", score: 9.6, timeplayed: 100 },
    {
      title: "The Legend of Zelda: Tears of the Kingdom",
      genre: "Aventura",
      score: 9.8,
      timeplayed: 50,
    },
    { title: "Elden Ring", genre: "Soulslike", score: 9.7, timeplayed: 120 },
    {
      title: "Stardew Valley",
      genre: "Simulación",
      score: 9.0,
      timeplayed: 85,
    },
  ];

  return (
    <div className="app">
      <Header />
      <main className="container">
        <ProfileBanner username="Usuario GOG" />
        <GamesTable data={games} />
      </main>
    </div>
  );
}
