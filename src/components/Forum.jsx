import { useMemo, useState } from "react";

import "../assets/styles/components.css";
import { ForumPost } from "./ForumPost";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "rpg", label: "RPG" },
  { id: "aventura", label: "Aventura" },
  { id: "mods", label: "Mods" },
];

export function Forum({ posts }) {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredPosts = useMemo(() => {
    if (selectedFilter === "all") {
      return posts;
    }

    return posts.filter((post) =>
      post.category.toLowerCase().includes(selectedFilter)
    );
  }, [posts, selectedFilter]);

  return (
    <section className="forum-section fade-in">
      <header className="forum-hero">
        <div>
          <h2>Foro de la comunidad</h2>
          <p>
            Comparte descubrimientos, resuelve dudas y revive los clásicos con
            otros fans de GoodOldGames.
          </p>
        </div>
        <button type="button" className="forum-new-topic-button">
          Crear nuevo tema
        </button>
      </header>

      <div className="forum-filters" role="toolbar" aria-label="Filtros del foro">
        {FILTERS.map(({ id, label }) => {
          const isActive = selectedFilter === id;
          return (
            <button
              key={id}
              type="button"
              className={`forum-filter-button${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              onClick={() => setSelectedFilter(id)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="forum-posts">
        {filteredPosts.length === 0 ? (
          <div className="forum-empty">
            <p>
              No hay publicaciones para este filtro todavía. ¡Sé el primero en
              iniciar la conversación!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => <ForumPost key={post.id} post={post} />)
        )}
      </div>
    </section>
  );
}
