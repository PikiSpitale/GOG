import "../assets/styles/components.css";

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function FollowersList({ followers, onToggleFollow }) {
  const hasFollowers = followers.length > 0;

  return (
    <section className="followers-card fade-in">
      <div className="followers-card-header">
        <h3>Seguidores</h3>
        <span className="followers-count">{followers.length}</span>
      </div>

      {hasFollowers ? (
        <ul className="followers-list">
          {followers.map((follower) => {
            const { id, name, username, favoriteGame, isFollowingBack } =
              follower;
            return (
              <li key={id} className="follower-item">
                <div className="follower-avatar" aria-hidden="true">
                  {getInitials(name)}
                </div>
                <div className="follower-details">
                  <p className="follower-name">{name}</p>
                  <p className="follower-username">@{username}</p>
                  <p className="follower-highlight">
                    Juego favorito: <span>{favoriteGame}</span>
                  </p>
                </div>
                <button
                  type="button"
                  className={`follow-button${
                    isFollowingBack ? " is-following" : ""
                  }`}
                  aria-pressed={isFollowingBack}
                  onClick={() => onToggleFollow(id)}
                >
                  {isFollowingBack ? "Siguiendo" : "Seguir"}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="followers-empty">
          Aún no tienes seguidores. Comparte tu perfil para que otros puedan
          encontrarte.
        </p>
      )}
    </section>
  );
}
