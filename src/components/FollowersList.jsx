import "../assets/styles/components.css";
import profileImage from "../assets/images/profile.jpg";

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
                <div className="follower-avatar">
                  <img
                    src={profileImage}
                    alt={`Foto de perfil de ${name}`}
                    className="avatar-image"
                  />
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
