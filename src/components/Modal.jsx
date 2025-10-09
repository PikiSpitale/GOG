import { useState, useEffect, useRef } from "react";
import "../assets/styles/components.css";

export function Modal({ isOpen, onClose, game, onSave }) {
  const [editedGame, setEditedGame] = useState(null);
  const modalRef = useRef(null);
  const mouseDownInside = useRef(false);

  useEffect(() => {
    if (game) {
      setEditedGame({
        ...game,
        hoursPlayed: game.hoursPlayed || 0,
        score: game.score || 1,
      });
    }
  }, [game]);

  if (!isOpen || !editedGame) return null;

  const handleChange = (field, value) => {
    if (field === "score") {
      if (value < 1) value = 1;
      if (value > 10) value = 10;
    } else if (field === "hoursPlayed") {
      if (value < 0) value = 0;
    }
    setEditedGame({ ...editedGame, [field]: value });
  };

  const handleArrowClick = (field, direction) => {
    setEditedGame((prev) => {
      const step = field === "score" ? 0.1 : 1;
      let newValue =
        direction === "up" ? prev[field] + step : prev[field] - step;
      if (field === "score") {
        newValue = Math.min(10, Math.max(1, newValue));
      } else if (field === "hoursPlayed") {
        newValue = Math.max(0, newValue);
      }
      return { ...prev, [field]: parseFloat(newValue.toFixed(1)) };
    });
  };

  const handleSave = () => {
    onSave(editedGame);
    onClose();
  };

  // 🔒 Evita que un mouseup fuera cierre el modal si el click empezó dentro
  const handleMouseDown = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      mouseDownInside.current = true;
    } else {
      mouseDownInside.current = false;
    }
  };

  const handleMouseUp = (e) => {
    if (
      !mouseDownInside.current &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
    mouseDownInside.current = false;
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div ref={modalRef} className="modal-content fade-in">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>{editedGame.title}</h2>
        <p className="genre">{editedGame.genre}</p>

        <div className="modal-fields">
          <label>
            Puntuación
            <div className="input-wrapper">
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={editedGame.score}
                onChange={(e) =>
                  handleChange("score", parseFloat(e.target.value))
                }
              />
              <span
                className="arrow up"
                onClick={() => handleArrowClick("score", "up")}
              >
                ▲
              </span>
              <span
                className="arrow down"
                onClick={() => handleArrowClick("score", "down")}
              >
                ▼
              </span>
            </div>
          </label>

          <label>
            Horas jugadas
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                step="1"
                value={editedGame.hoursPlayed}
                onChange={(e) =>
                  handleChange("hoursPlayed", parseInt(e.target.value))
                }
              />
              <span
                className="arrow up"
                onClick={() => handleArrowClick("hoursPlayed", "up")}
              >
                ▲
              </span>
              <span
                className="arrow down"
                onClick={() => handleArrowClick("hoursPlayed", "down")}
              >
                ▼
              </span>
            </div>
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
