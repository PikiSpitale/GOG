import { useState } from "react";
import "../assets/styles/components.css";
import { Modal } from "./Modal";

export function GamesTable({ data }) {
  const [games, setGames] = useState(data);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSave = (updatedGame) => {
    setGames((prev) =>
      prev.map((g) => (g.title === updatedGame.title ? updatedGame : g))
    );
  };

  return (
    <>
      <div className="games-card">
        <h3>Lista de juegos</h3>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>Puntuación</th>
              <th>Horas jugadas</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, i) => (
              <tr key={i}>
                <td
                  className="clickable-title"
                  onClick={() => setSelectedGame(game)}
                >
                  {game.title}
                </td>
                <td>{game.genre}</td>
                <td>{game.score}</td>
                <td>{game.hoursPlayed || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selectedGame}
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onSave={handleSave}
      />
    </>
  );
}
