import { useEffect, useState } from "react";

import "../assets/styles/components.css";

const FIELD_CONFIG = {
  score: {
    min: 1,
    max: 10,
    step: 0.1,
    format: (value) => Number(value.toFixed(1)),
  },
  hoursPlayed: {
    min: 0,
    max: Number.POSITIVE_INFINITY,
    step: 1,
    format: (value) => Math.round(value),
  },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const normalizeValue = (value, config) => {
  const clampedValue = clamp(value, config.min, config.max);
  return config.format(clampedValue);
};

export function Modal({ isOpen, onClose, game, onSave }) {
  const [editedGame, setEditedGame] = useState(null);

  useEffect(() => {
    if (isOpen && game) {
      setEditedGame({
        ...game,
        hoursPlayed: game.hoursPlayed ?? 0,
        score: game.score ?? FIELD_CONFIG.score.min,
      });
    } else {
      setEditedGame(null);
    }
  }, [game, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !editedGame) {
    return null;
  }

  const titleId = `${editedGame.id}-modal-title`;

  const handleNumericChange = (field, rawValue) => {
    const config = FIELD_CONFIG[field];
    if (!config) {
      return;
    }

    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue)) {
      return;
    }

    setEditedGame((previous) => ({
      ...previous,
      [field]: normalizeValue(numericValue, config),
    }));
  };

  const handleArrowClick = (field, direction) => {
    const config = FIELD_CONFIG[field];
    if (!config) {
      return;
    }

    setEditedGame((previous) => {
      const currentValue = Number(previous[field]);
      const delta = direction === "up" ? config.step : -config.step;
      const candidate = currentValue + delta;

      return {
        ...previous,
        [field]: normalizeValue(candidate, config),
      };
    });
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(editedGame);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          X
        </button>

        <h2 id={titleId}>{editedGame.title}</h2>
        <p className="genre">{editedGame.genre}</p>

        <div className="modal-fields">
          <label>
            Puntuación
            <div className="input-wrapper">
              <input
                type="number"
                min={FIELD_CONFIG.score.min}
                max={FIELD_CONFIG.score.max}
                step={FIELD_CONFIG.score.step}
                value={editedGame.score}
                onChange={(event) =>
                  handleNumericChange("score", event.target.value)
                }
              />
              <div className="arrow-controls">
                <button
                  type="button"
                  className="arrow up"
                  onClick={() => handleArrowClick("score", "up")}
                  aria-label="Incrementar puntuación"
                >
                  ^
                </button>
                <button
                  type="button"
                  className="arrow down"
                  onClick={() => handleArrowClick("score", "down")}
                  aria-label="Reducir puntuación"
                >
                  v
                </button>
              </div>
            </div>
          </label>

          <label>
            Horas jugadas
            <div className="input-wrapper">
              <input
                type="number"
                min={FIELD_CONFIG.hoursPlayed.min}
                step={FIELD_CONFIG.hoursPlayed.step}
                value={editedGame.hoursPlayed}
                onChange={(event) =>
                  handleNumericChange("hoursPlayed", event.target.value)
                }
              />
              <div className="arrow-controls">
                <button
                  type="button"
                  className="arrow up"
                  onClick={() => handleArrowClick("hoursPlayed", "up")}
                  aria-label="Incrementar horas jugadas"
                >
                  ^
                </button>
                <button
                  type="button"
                  className="arrow down"
                  onClick={() => handleArrowClick("hoursPlayed", "down")}
                  aria-label="Reducir horas jugadas"
                >
                  v
                </button>
              </div>
            </div>
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn-primary" type="button" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
