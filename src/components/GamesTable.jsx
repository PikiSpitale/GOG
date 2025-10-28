import { useMemo, useState } from "react";

import "../assets/styles/components.css";
import { Modal } from "./Modal";

export function GamesTable({ games, onUpdateGame }) {
  const [selectedGameId, setSelectedGameId] = useState(null);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedGameId) ?? null,
    [games, selectedGameId]
  );

  const formatScore = (score) =>
    Number.isFinite(score) ? score.toFixed(1) : "N/A";

  const formatHours = (hours) => (Number.isFinite(hours) ? hours : 0);

  const handleSelectGame = (gameId) => {
    setSelectedGameId(gameId);
  };

  const handleCloseModal = () => {
    setSelectedGameId(null);
  };

  const handleSaveGame = (game) => {
    onUpdateGame(game);
    handleCloseModal();
  };

  return (
    <>
      <div className="games-card">
        <h3>Lista de juegos</h3>
        <div className="table-wrapper">
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
              {games.length === 0 ? (
                <tr>
                  <td className="empty-state" colSpan={4}>
                    No hay juegos disponibles.
                  </td>
                </tr>
              ) : (
                games.map((game) => (
                  <tr key={game.id}>
                    <td
                      className="clickable-title"
                      onClick={() => handleSelectGame(game.id)}
                    >
                      {game.title}
                    </td>
                    <td>{game.genre}</td>
                    <td>{formatScore(game.score)}</td>
                    <td>{formatHours(game.hoursPlayed)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedGame)}
        game={selectedGame}
        onClose={handleCloseModal}
        onSave={handleSaveGame}
      />
    </>
  );
}
